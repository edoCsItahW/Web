/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot, createBot,  } from "mineflayer";
import { mineflayer as viewer } from "prismarine-viewer";
import { ChatMessage } from "prismarine-chat";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder"
import pvp from "mineflayer-pvp"
import { Entity } from "prismarine-entity"
import { Interpreter, FuncType } from "./interpreter";
import { Worker, isMainThread, parentPort } from 'worker_threads'


enum WarnLevel {
    NONE,
    INFO,
    WARN,
    DEBUG,
    ERROR,
    CRITICAL
}

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

function debug(level: WarnLevel = WarnLevel.INFO, bot: Bot | null = null, ...args: any[]): Function {
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

namespace funcKit {
    export function view(bot: Bot, port: number = 3007) {
        bot.once("spawn", () => {
            viewer(bot, { port: port, firstPerson: true });
        });
        debug(WarnLevel.INFO, bot, "机器人视角功能已开启,端口为 " + port)
    }

    export function msgListen(
        bot: Bot,
        fn: (msg: ChatMessage) => void = (msg) => { console.log(msg.toAnsi())}
    ) {
        bot.on('message', fn)
    }

    export function lookAt(bot: Bot, target: Entity) {
        bot.once("spawn", () => {
            setInterval(() => {
                if (!target) return;
                bot.lookAt(target.position.offset(0, target.height, 0));
            }, 50)
        })
    }

    export function moveTo(bot: Bot, target: Entity, movement?: Movements) {
        if (!target) {
            target = bot.nearestEntity() as Entity;
            debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!")
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
            debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!");
    }

    export function hunt<T extends Entity | string>(bot: Bot, target: T, movement?: Movements) {
        // @ts-expect-error
        target ||= bot.nearestEntity();

        if (typeof target === "string")
            // @ts-expect-error
            target = bot.nearestEntity(entity => entity?.name === target);
        else if (target instanceof Entity) {
            lookAt(bot, target);
            moveTo(bot, target, movement);
            attack(bot, target);
        }
        else
            debug(WarnLevel.WARN, bot, "未指定目标或获取目标失败,自动选择最近的实体!");
    }

}


export class Base {
    private readonly _bot: Bot;
    private readonly _movements: Movements;

    constructor(
        public name: string,
        flags: {msg: boolean | FuncType<any>, view: boolean} = {msg: false, view: false},
        private interpreter?: Interpreter,
        client?: any
    ) {
        this._bot = createBot({
            host: "localhost",
            port: 25565,
            username: this.name
        });

        if (flags.view)
            funcKit.view(this._bot);
        if (flags.msg)
            funcKit.msgListen(this._bot, flags.msg instanceof Function ? flags.msg : (msg) => {});

        this._movements = new Movements(this._bot);

    }

    get bot() { return this._bot; }

    get movements() { return this._movements; }

    async start() {}

    eventLoop() {
        this._bot.on("chat", (name, msg) => {
            if (this.interpreter && name !== this._bot.username && msg.startsWith("\\"))
                // @ts-expect-error
                this.interpreter.execute(Interpreter.stringToArgs(msg.slice(1)))
        })
    }

    stdWrap(func: (...args: any[]) => any[]) {
        function f(fn: FuncType<any>) {
            return function warp(..._args: any[]) {
                fn.apply(fn, func(..._args));
            }
        }
        return f;
    }
}
