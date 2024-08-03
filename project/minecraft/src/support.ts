/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot, createBot  } from "mineflayer";
import { mineflayer as viewer } from "prismarine-viewer";
import { ChatMessage } from "prismarine-chat";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder"
import { plugin as pvp } from "mineflayer-pvp"
import { Entity } from "prismarine-entity"
import { Interpreter, FuncType } from "./interpreter";
import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { ErrHandle, debug, WarnLevel, sleep } from "./func";


let SPEAKER: string;
export const BEHAVIORS: Map<string, NodeJS.Timeout> = new Map();


export namespace funcKit {
    export function findTargetWithName(bot: Bot, name: string, type?: string) {
        switch (name) {
            case '@s':
                return bot.entity;
            case '@p':
                return type ? bot.nearestEntity() : bot.nearestEntity(ent => ent.type === type);
            case '@h':
                return bot.nearestEntity(entity => entity.name === SPEAKER);
            default:
                return bot.nearestEntity(entity => entity.name === name);
        }
    }

    export function view(bot: Bot, port: number = 3007) {
        bot.once("spawn", () => {
            viewer(bot, { port: port, firstPerson: true });
        });
        debug(WarnLevel.INFO, bot, "机器人视角功能已开启,端口为 " + port)
    }

    export function msgListen(
        bot: Bot,
        fn: ((msg: ChatMessage) => void) | null = null
    ) {
        fn ||= (msg) => { console.log(msg.toAnsi()) };
        bot.on('message', fn)
    }

    export function lookAt(bot: Bot, target: Entity) {
        const bhv = setInterval(() => {
            if (!target) return;
            bot.lookAt(target.position.offset(0, target.height, 0));
        }, 50);
        BEHAVIORS.set("lookAt", bhv);
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

    export function hunt(bot: Bot, target: Entity | string, movement?: Movements) {
        // @ts-expect-error
        target ||= bot.nearestEntity();

        if (typeof target === "string")
            // @ts-expect-error
            target = funcKit.findTargetWithName(bot, target);

        if (typeof target === "object") {
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
    private  _movements: Movements | null = null;

    constructor(
        public name: string,
        flags: {msg: boolean | ((...args: any[]) => void), view: boolean} = {msg: false, view: false},
        private _interpreter?: Interpreter,
        client?: any
    ) {
        this._bot = createBot({
            host: "localhost",
            port: 25565,
            username: this.name
        });

        this._bot.loadPlugin(pathfinder);
        this._bot.loadPlugin(pvp);

        if (flags.view)
            funcKit.view(this._bot);
        if (flags.msg)
            funcKit.msgListen(this._bot, flags.msg instanceof Function ? flags.msg : null);

    }

    get bot() { return this._bot; }

    get movements() {
        this._movements ||= new Movements(this._bot);
        return this._movements;
    }

    get interpreter() { return this._interpreter; }

    set interpreter(value) { this._interpreter = value; }

    parsing() {
        this._bot.on("chat", (name, msg) => {
            SPEAKER = name;
            if (name === this._bot.username) return;

            if (this._interpreter && name !== this._bot.username && msg.startsWith("\\"))
                this._interpreter.execute(msg.slice(1))
        })
    }

    startLoop() {
        if (isMainThread) {
            const worker = new Worker(__filename);

            worker.on("message", (msg) => {
                console.warn(WarnLevel.DEBUG, "Received message from worker: ", msg);
            })

            sleep(1000).then(() => {
                worker.postMessage('Hello Worker!');
            })

        }
        else {
            parentPort?.on('message', (msg) => {
                console.warn(WarnLevel.DEBUG, "Received message from parent: ", msg);

                sleep(1000).then(() => {
                    parentPort?.postMessage("Hello Parent!");
                })
            })
        }
    }

    stdWrap(func: (...args: any[]) => any[]) {
        function f(fn: Function) {
            function warp(..._args: any[]) {
                try {
                    fn(...func(..._args))
                }
                catch (e: any) {
                    ErrHandle.pyStyleError(e.stack);
                }
            }
            Object.defineProperty(warp, "name", { value: fn.name })
            return warp;
        }
        return f;
    }
}
