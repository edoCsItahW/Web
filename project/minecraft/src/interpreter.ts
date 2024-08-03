/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot } from "mineflayer";
import { Command, BuiltInCommand, ListCommand, StopCommand } from "./commond";


export type FuncType = ((...args: string[]) => void) | Command


export class Interpreter {
    private commands: Map<string, FuncType> = new Map();
    private builtInCmd: Map<string, Command> = new Map();

    constructor(private bot: Bot, ...command: FuncType[]) {
        this.register(new ListCommand(this.bot, this.commands));
        this.register(new StopCommand())

        for (const cmd of command)
            this.commands.set(cmd.name, cmd);
    }

    static stringToArgs(msg: string) {
        return msg.split(' ').filter(s => s.length);
    }

    register(cmd: FuncType) {
        if (cmd instanceof BuiltInCommand)
            this.builtInCmd.set(cmd.name, cmd);
        else
            this.commands.set(cmd.name, cmd);
    }

    execute(command: string) {
        const args = Interpreter.stringToArgs(command);

        if (args.length) {
            const cmd = this.commands.get(args[0]) || (args.length > 1
                ? args[0] === 'cmd' && this.builtInCmd.get(args[1])
                : undefined);

            if (cmd) {
                if (((_cmd): _cmd is Command => _cmd instanceof Command)(cmd))
                    cmd.execute(...(cmd instanceof BuiltInCommand ? args.slice(2) : args.slice(1)));
                else
                    cmd(...args.slice(1));
            }

            else
                console.log(`Command not found: ${args[0]}`)
        }
    }

}
