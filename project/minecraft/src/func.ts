/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot } from "mineflayer";
import {Entity} from "prismarine-entity";
import {goals, Movements} from "mineflayer-pathfinder";
import { BEHAVIORS } from "./support";


class Ref<T> {
    constructor(private _value: T) {}
    get value() { return this._value; }
    set value(v: T) { this._value = v; }
}

export const SPEAKER = new Ref<string>("");

export enum WarnLevel {
    NONE,
    INFO,
    WARN,
    DEBUG,
    ERROR,
    CRITICAL
}

export let CONTINUER: boolean = true;

console.warn = (level: WarnLevel = WarnLevel.INFO, ...args: any[]): void =>  {
    switch (level) {
        case WarnLevel.NONE: break;
        case WarnLevel.INFO:
            console.log("\x1b[36m[INFO]: ", ...args, "\x1b[0m");
            break;
        case WarnLevel.WARN:
            console.log("\x1b[33m[WARN]: ", ...args, "\x1b[0m");
            break;
        case WarnLevel.DEBUG:
            console.log("\x1b[34m[DEBUG]: ", ...args, "\x1b[0m");
            break;
        case WarnLevel.ERROR:
            console.log("\x1b[31m[ERROR]: ", ...args, "\x1b[0m");
            break;
        case WarnLevel.CRITICAL:
            console.log("\x1b[31m[CRITICAL]: ", ...args, "\x1b[0m");
            break;
    }
}

console.error = (...args: any[]) =>  { console.warn(WarnLevel.ERROR, ...args); }


export namespace Scaffold {
    export namespace ErrHandle {
        interface IError {func: string, file: string, line: string}

        export function regexStack(stack: string): {msg: string, stack: Array<IError>} {
            /* 解析错误栈
             *
             * @param {string} stack - 错误栈字符串
             * @returns {object} - 包含错误信息和错误栈的对象
             * */

            const stackRegex: RegExp = /at\s+(?:([^\s(]+)\s+)?\((file:.*?):(\d+):\d+\)|at\s+(file:.*?):(\d+):\d+|at\s+(?:([^\s(]+)\s+)?\((node:.*?):(\d+):\d+\)|at\s+(?:([^\s(]+)\s+)?\(([CDEFG]:.*?):(\d+):\d+\)/g;

            const matches: Array<IError> = [];
            let match: RegExpExecArray | null;

            while ((match = stackRegex.exec(stack)) !== null) {
                matches.push({
                    func: match[1] || match[6] || match[9] || 'main',
                    file: match[2] || match[4] || match[7] || match[10] || 'unknown',
                    line: match[3] || match[5] || match[8] || match[11] || '-1',
                });
            }

            return {msg: stack.match(/^(.*?)(?=\n)/)?.[1] || "", stack: matches}
        }

        export function pyStyleError(stack: string): void {
            /* 输出Python风格的错误栈
             *
             * @param {string} stack - 错误栈字符串
             * */
            const infoObj = regexStack(stack);

            console.error("Traceback (most recent call last):");
            infoObj.stack.forEach(item => console.error(`    File "${item.file}", line ${item.line}, in <${item.func}>`))
            console.error(infoObj.msg)
        }

        export function debug(level: WarnLevel = WarnLevel.INFO, bot: Bot | null = null, ...args: any[]): Function {
            function func(fn: Function) {
                return function warp(..._args: any[]) {
                    console.warn(level, ...args);
                    if (bot)
                        bot.chat("[DEBUG]: " + args.join(" "));
                    // @ts-expect-error
                    return fn.apply(this, _args);
                }
            }
            return func;
        }
    }

    export async function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}


export namespace FuncKit {
    export function str2Target(bot: Bot, name: string, type?: string) {
        switch (name) {
            case '@s':
                return bot.entity;
            case '@p':
                return type ? bot.nearestEntity(ent => ent.type === type) : bot.nearestEntity();
            case '@h':
                return bot.nearestEntity(entity => entity.name === SPEAKER.value);
            default:
                return bot.nearestEntity(entity => entity.name === name);
        }
    }
}


export namespace Beahvior {
    export function look(bot: Bot, target: Entity) {
        const bhv = setInterval(() => {
            if (!target) return;
            bot.lookAt(target.position.offset(0, target.height, 0));
        }, 50);
        BEHAVIORS.set("look", bhv);
    }

    export function move(bot: Bot, target: Entity, movement?: Movements) {
        if (!target) {
            target = bot.nearestEntity() as Entity;
            Scaffold.ErrHandle.debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!")
        }

        const {x, y, z} = target.position;

        if (!movement)
            movement = new Movements(bot);

        bot.pathfinder.setMovements(movement);
        bot.pathfinder.setGoal(new goals.GoalNear(x, y, z, 1))
    }

    export function attack(bot: Bot, target: Entity) {
        target = target || bot.nearestEntity();

        if (target)
            bot.pvp.attack(target);
        else
            Scaffold.ErrHandle.debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!");
    }

    export function hunt(bot: Bot, target: Entity | string, movement?: Movements) {
        // @ts-ignore
        target ||= bot.nearestEntity();

        if (typeof target === "string")
            // @ts-ignore
            target = funcKit.findTargetWithName(bot, target);

        if (typeof target === "object") {
            look(bot, target);
            move(bot, target, movement);
            attack(bot, target);
        }
        else
            Scaffold.ErrHandle.debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!");
    }

    export function find(bot: Bot, target: Entity | string, type: string) {
        switch (type) {
            case "block":
                const ids = [bot.registry.blocksByName[target].id];
                const blocks = bot.findBlocks({ matching: ids, maxDistance: 128, count: 10 });
                break;
        }
    }

    export function guard(bot: Bot, pos: number[], radius: number, movement?: Movements) {
        if (!bot.pvp.target) {
            // @ts-ignore
            bot.pathfinder.setGoal(new goals.GoalBlock(pos[0], pos[1], pos[2], 1));
        }

        bot.on('physicsTick', () => {
            const entity = bot.nearestEntity(e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < radius && e.displayName !== 'Armor Stand');

            if (entity)
                bot.pvp.attack(entity);
            else
                bot.pvp.stop();
        })

        // @ts-ignore
        bot.on('stoppedAttacking', () => {
            // @ts-ignore
            bot.pathfinder.setGoal(new goals.GoalNear(pos[0], pos[1], pos[2], 1))
        })

    }
}
