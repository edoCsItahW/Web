/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Bot } from "mineflayer";


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

    export function tryExec(func: Function, error?: (msg: string, code: number) => void ): Function {
        /* 一个装饰器，尝试执行函数并捕获错误
         *
         * @param {Function} func - 要执行的函数
         * @param {Function} error - 错误处理函数(可选)
         * @returns {Function} - 包装后的函数
         * */
        return function(): any {
            try {
                return func(...arguments);
            }
            catch (e: any) {
                if (error)
                    error(e.message, 400)
                else {
                    pyStyleError(e.stack);
                }
            }
        }
    }
}

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

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
