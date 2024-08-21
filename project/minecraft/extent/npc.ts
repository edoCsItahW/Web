/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {createBot, Bot, EquipmentDestination} from "mineflayer";
import {pathfinder, Movements, goals} from "mineflayer-pathfinder";
import { plugin as pvp } from "mineflayer-pvp";
import { mineflayer as viewer } from "prismarine-viewer";
import { ChatMessage } from "prismarine-chat";
import { Socket } from "node:net";


export enum WarnLevel {
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
        case WarnLevel.INFO: console.log("\x1b[36m[INFO]: ", ...args, "\x1b[0m"); break;
        case WarnLevel.WARN: console.log("\x1b[33m[WARN]: ", ...args, "\x1b[0m"); break;
        case WarnLevel.DEBUG: console.log("\x1b[34m[DEBUG]: ", ...args, "\x1b[0m"); break;
        case WarnLevel.ERROR: console.log("\x1b[31m[ERROR]: ", ...args, "\x1b[0m"); break;
        case WarnLevel.CRITICAL: console.log("\x1b[31m[CRITICAL]: ", ...args, "\x1b[0m"); break;
    }
}

export namespace ToolKit {
    export function view(bot: Bot, port: number = 3007) {
        bot.once("spawn", () => { viewer(bot, { port: port, firstPerson: true }); });
        console.warn(WarnLevel.INFO, bot, "机器人视角功能已开启,端口为 " + port)
    }

    export function msgListen( bot: Bot, fn: ((msg: ChatMessage) => void) | null = null) {
        fn ||= msg => {};
        bot.on('message', fn)
    }

    export function formatMsg(msg: string, dst: 'in' | 'out' | 'no' = 'no', type: string | null = null) {
        type = type ? `<${type}> ` : '';

        const _dst = dst === 'in' ? '<-' : dst === 'out' ? '->' : '--';

        const now = new Date();

        return `[${now.getDate().toString().padStart(2, '0')}/${now.toLocaleString('default', {month: 'short'})}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}] ${type}${_dst} ${msg}`
    }

    export function procCmd(rawMsg: string, sender: string) {
        return `<${sender}> \\${rawMsg}|`
    }
}


type Pos = [number, number, number];

interface Option {
    host?: string,
    port?: number,
    view?: boolean,
    msg?: ((...args: any[]) => void) | boolean,
    client?: Socket
}

abstract class NPC {
    readonly #position: Pos;
    readonly #bot: Bot;
    readonly #client: Socket | undefined;

    protected constructor(public name: string, pos: Pos, opt?: Option) {
        this.#position = pos;
        this.#bot = createBot({
            username: name,
            host: opt?.host || "localhost",
            port: opt?.port || 25565
        })

        this.#bot.loadPlugin(pathfinder);
        this.#bot.loadPlugin(pvp);

        if (opt?.view) ToolKit.view(this.#bot);
        if (opt?.msg) ToolKit.msgListen(this.#bot, opt?.msg instanceof Function ? opt?.msg : null);

        this.#client = opt?.client
    }

    get bot() { return this.#bot; }
    get client() { return this.#client; }
    get position() { return this.#position; }

    init() {
        if (this.#position && this.#client) {
            this.#client.write(ToolKit.procCmd(`tp @s ${this.#position.join(' ')}`, this.name));
            this.#client.write(ToolKit.procCmd(`tag @s add npc`, this.name));
        }
    }

    run() {
        this.#bot.on("spawn", () => {
            this._run();
        })
    }

    abstract _run(): void;
}

export class CMD extends NPC {

    constructor(pos: Pos, opt: Option = {msg: true}) {
        super("CMD", pos, opt);
    }

    _run() {
        this.init();
        this.client?.write(ToolKit.procCmd("effect give @s invisibility infinite 255 true", this.name))
    }
}

export class Patrol extends NPC {

    constructor(name: string, pos: Pos) {
        super(name, pos);
    }

    _run() {}
}

export class Guardian extends NPC {
    constructor(public name: string, pos: Pos, opt?: Option, private face: Pos = [1, 0, 0]) {
        super(name, pos, opt);
    }

    toPos(pos: Pos) {
        if (!this.bot.pvp.target) {
            this.bot.pathfinder.setMovements(new Movements(this.bot));
            this.bot.pathfinder.setGoal(new goals.GoalBlock(...pos));
        }
    }

    facePos() {
        this.bot.lookAt(this.bot.entity.position.offset(0, 1.6, 0).offset(...this.face))
    }

    armSelf() {
        const equipments: { [key: string]: EquipmentDestination } = {
            helmet: 'head',
            chestplate: 'torso',
            leggings: 'legs',
            boots: 'feet',
            sword: 'hand'
        }

        Object.entries(equipments).forEach(([key, slot]) => {
            if (this.bot.inventory.slots[this.bot.getEquipmentDestSlot(slot)]?.name.includes(key)) return;

            const item = this.bot.inventory.items().find(i => i.name.includes(key));

            if (item)
                this.bot.equip(item, slot);
            else
                this.bot.chat(`报告, 我没有 ${key} 这件装备`)
        })
    }

    guard() {
        this.bot.on("physicsTick", () => {
            const entity = this.bot.nearestEntity(e =>
                e.type === 'hostile'
             && e.position.distanceTo(this.bot.entity.position) < 16
             && e.position.y > this.bot.entity.position.y
             && e.displayName !== 'Armor Stand')

            if (entity) {
                this.bot.pvp.attack(entity);
            }
        })

        // @ts-ignore
        this.bot.on("stoppedAttacking", () => {
            this.armSelf();
            this.toPos(this.position);
        })

        this.bot.on('goal_reached', () => {
            this.facePos();
        })
    }

    _run() {
        this.init();
        this.toPos(this.position);
        this.facePos();
        this.armSelf();
        this.guard();
    }
}

export class Archer extends NPC {
    constructor(public name: string, pos: Pos, opt?: Option) {
        super(name, pos, opt);
    }

    _run(): void {
    }
}

export class Merchant extends NPC {
    constructor(public name: string, pos: Pos, opt?: Option) {
        super(name, pos, opt);
    }

    trade() {}

    watch() {
        this.bot.on('whisper', (username, message) => {
            console.log(username, message)
            this.bot.whisper(username, `你好, 我是 ${this.name}, 请问有什么可以帮到您?`)
        })
    }

    _run(): void {
        this.init();
        this.watch();
    }

}
