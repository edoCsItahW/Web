/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
export abstract class Command {
    abstract execute(...args: string[]): void;
}

export type FuncType<T> = (...args: T[]) => void

export class Interpreter<FuncTypeCmd = FuncType<any>> {
    private commands: Map<string, (FuncTypeCmd | Command)> = new Map();

    constructor(...command: (FuncTypeCmd | Command)[]) {
        for (const cmd of command)
            this.commands.set((cmd as Function).name, cmd);
    }

    visit(cmd: Command | FuncTypeCmd, fn: (cmd: Command | FuncTypeCmd, flag: boolean) => void) {
        fn(cmd, cmd instanceof Command);
    }

    static stringToArgs(msg: string) {
        return msg.split(' ').filter(s => s.length);
    }

    execute(...args: string[]) {
        if (args.length) {
            const cmd = this.commands.get(args[0]);

            if (cmd)
                this.visit(cmd, (cmd, isCommand) => {
                    if (isCommand) (cmd as Command).execute(...args.slice(1));
                    else (cmd as Function)(...args.slice(1));
                });
            else
                console.log(`Command not found: ${args[0]}`)
        }
    }

}
