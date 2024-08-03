/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot } from "mineflayer";
import { FuncType } from "./interpreter";
import { BEHAVIORS } from "./support"
import { WarnLevel } from "./func";


export abstract class Command {
    abstract name: string;
    abstract execute(...args: string[]): void;
}

export abstract class BuiltInCommand extends Command {
    abstract name: string;
    abstract execute(...args: string[]): void;
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
