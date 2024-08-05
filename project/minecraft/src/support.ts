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
import { pathfinder, Movements } from "mineflayer-pathfinder"
import { plugin as pvp } from "mineflayer-pvp"
import { Interpreter } from "./interpreter";
import { Worker, isMainThread, parentPort } from "node:worker_threads";
import { WarnLevel, Scaffold, SPEAKER } from "./func";


export const BEHAVIORS: Map<string, NodeJS.Timeout> = new Map();


namespace ToolKit {
    export function view(bot: Bot, port: number = 3007) {
        bot.once("spawn", () => {
            viewer(bot, { port: port, firstPerson: true });
        });
        Scaffold.ErrHandle.debug(WarnLevel.INFO, bot, "机器人视角功能已开启,端口为 " + port)
    }

    export function msgListen(
        bot: Bot,
        fn: ((msg: ChatMessage) => void) | null = null
    ) {
        fn ||= (msg) => { console.log(msg.toAnsi()) };
        bot.on('message', fn)
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
            ToolKit.view(this._bot);
        if (flags.msg)
            ToolKit.msgListen(this._bot, flags.msg instanceof Function ? flags.msg : null);

    }

    get bot() { return this._bot; }

    movements() {  // 由于需要惰性求值,所以不为取值器,使用时应传该函子
        this._movements ||= new Movements(this._bot);
        return this._movements;
    }

    get interpreter() { return this._interpreter; }

    set interpreter(value) { this._interpreter = value; }

    parsing() {
        this._bot.on("chat", (name, msg) => {
            SPEAKER.value = name;
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

            Scaffold.sleep(1000).then(() => {
                worker.postMessage('Hello Worker!');
            })

        }
        else {
            parentPort?.on('message', (msg) => {
                console.warn(WarnLevel.DEBUG, "Received message from parent: ", msg);

                Scaffold.sleep(1000).then(() => {
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
                    Scaffold.ErrHandle.pyStyleError(e.stack);
                }
            }
            Object.defineProperty(warp, "name", { value: fn.name })
            return warp;
        }
        return f;
    }
}
