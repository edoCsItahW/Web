/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot } from "mineflayer";
import { FuncType } from "./interpreter";
import { BEHAVIORS } from "./support"
import {Beahvior, FuncKit, WarnLevel} from "./func";
import {Movements} from "mineflayer-pathfinder";



export abstract class Command {
    abstract name: string;
    abstract execute(...args: string[]): void;
}

export abstract class BuiltInCommand extends Command {
    abstract name: string;
    abstract execute(...args: string[]): void;

}

export abstract class CustomCommand extends Command {
    abstract name: string;
    abstract _execute(...args: string[]): void;
    abstract doc: string;

    execute(...args: string[]): void {
        if (args.length)
            this._execute(...args);
        else
            if (this.hasOwnProperty('bot'))
                (this as any).bot.chat(this.doc);
    }
}

export class ListCommand extends BuiltInCommand {
    name = 'list'
    constructor(private bot: Bot, private fnMap: Map<string, FuncType>) {
        super();
    }
    execute(...args: string[]) {
        this.bot.chat(`Available commands: ${Array.from(this.fnMap.keys()).join(', ')}`);
    }
}

export class StopCommand extends BuiltInCommand {
    name = 'stop';

    execute(...args: string[]): void {
        if (args.length) {
            const value = BEHAVIORS.get(args[0]);

            if (value) {
                clearInterval(value);
                BEHAVIORS.delete(args[0]);
            }
        }
        else
            BEHAVIORS.clear();
    }
}

export class MoveCommand extends CustomCommand {
    name: string = 'move'
    doc: string = 'move [target] <type>'

    constructor(private bot: Bot, private movement?: () => Movements) {
        super();
    }

    _execute(...args: string[]): void {
        switch (args[0]) {
            case '-h': this.bot.chat(this.doc); break;
            default: Beahvior.move(this.bot, FuncKit.str2Target(this.bot, args[0], args[1]?.toLowerCase())!, this.movement!()); break;
        }
    }
}

export class LookCommand extends CustomCommand {
    name = 'look';
    doc = 'look [target] <type>';

    constructor(private bot: Bot) {
        super();
    }

    _execute(...args: string[]): void {
        switch (args[0]) {
            case '-h':
                this.bot.chat(this.doc); break;
            default:
                Beahvior.look(this.bot, FuncKit.str2Target(this.bot, args[0], args[1]?.toLowerCase())!);
                break;
        }
    }
}

export class FindCommand extends CustomCommand {
    name: string = 'find'
    doc: string = 'find [type] [target]'

    _execute(...args: string[]): void {

    }

}

export class AttackCommand extends CustomCommand {
    name: string = 'attack';
    doc: string = 'attack [target] <type>';

    constructor(private bot: Bot) {
        super();}

    _execute(...args: string[]): void {
        switch (args[0]) {
            case '-h':
                this.bot.chat(this.doc); break;
            default:
                Beahvior.attack(this.bot, FuncKit.str2Target(this.bot, args[0], args[1]?.toLowerCase())!); break;
        }
    }
}

export class HuntCommand extends CustomCommand {
    name: string = 'hunt';
    doc: string = 'hunt [target] <type>';

    constructor(private bot: Bot, private movement?: () => Movements) {
        super();
    }

    _execute(...args: string[]): void {
        switch (args[0]) {
            case '-h':
                this.bot.chat(this.doc); break;
            default:
                Beahvior.hunt(this.bot, FuncKit.str2Target(this.bot, args[0], args[1]?.toLowerCase())!, this.movement!()); break;
        }
    }

}

export class GuardCommand extends CustomCommand {
    doc: string = 'guard [target] | [pos] <type>';
    name: string = 'guard';

    constructor(private bot: Bot, private movement?: () => Movements) {
        super();
    }

    _execute(...args: string[]): void {
        switch (args[0]) {
            case '-h':
                this.bot.chat(this.doc); break;
            default:
                const isNum = /^(?:[+-]?)(?:\d+(?:\.\d+)?|\.\d+)$/.test(args[0]);

                const target = FuncKit.str2Target(this.bot, args[0])?.position;

                if (target) {
                    const pos = isNum ? [Number(args[0]), Number(args[1]),Number(args[2])] : [target?.x, target?.y, target?.z];

                    Beahvior.guard(
                        this.bot,
                        pos,
                        16,
                        this.movement!()
                    )
                }
                else
                    this.bot.chat('Invalid target or position!')
        }
    }

}
