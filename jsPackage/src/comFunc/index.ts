/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import * as exp from "constants"
import * as CryptoJS from "crypto-js"


export namespace $ {
    export function id(elementId: string): HTMLElement {
        /* 根据元素id获取元素对象
         *
         * @param {string} elementId - 元素id
         * @returns {HTMLElement} - 元素对象
         * */

        return document.getElementById(elementId)
    }

    export function class_(classNames: string, index: number = 0): Element | HTMLCollectionOf<Element> {
        /* 根据类名获取元素对象
         *
         * @param {string} classNames - 类名
         * @param {number} index - 索引(默认为0)
         * @returns {Element | HTMLCollectionOf<Element>} - 元素对象或元素集合
         * */

        return (typeof index === "number" ? document.getElementsByClassName(classNames)[index] : document.getElementsByClassName(classNames))
    }

    export function toHash(str: string) {
        /* 生成字符串的哈希值
         *
         * @param {string} str - 字符串
         * @returns {string} - 哈希值
         * */

        // return crypto.createHash('sha256').update(string).digest('hex')
        return CryptoJS.SHA256(str).toString()
    }

    export function getComplement(bigArray: any[], smallArray: any[]): any[] {
        /* 获取数组bigArray对smallArray的补集(bigArray包含smallArray)(bigArray中存在但smallArray中不存在的元素)
        *
        * @param {Array} bigArray - 包含smallArray中所有元素的数组
        * @param {Array} smallArray - 该数组中的所有元素都可以在数组bigArray中被找到
        * @returns {Array} - 补集数组
        * */

        return bigArray.filter(element => !smallArray.includes(element))
    }
}


export namespace ErrHandle {
    interface IError {func: string, file: string, line: string}

    export function regexStack(stack: string): {msg: string, stack: Array<IError>} {
        /* 解析错误栈
         *
         * @param {string} stack - 错误栈字符串
         * @returns {object} - 包含错误信息和错误栈的对象
         * */

        const stackRegex: RegExp = /at\s+(?:([^\s(]+)\s+)?\((file:.*?):(\d+):\d+\)|at\s+(file:.*?):(\d+):\d+|at\s+(?:([^\s(]+)\s+)?\((node:.*?):(\d+):\d+\)/g;

        const matches: Array<IError> = [];
        let match: RegExpExecArray | null;

        while ((match = stackRegex.exec(stack)) !== null) {
            matches.push({
                func: match[1] || match[6] || 'main',
                file: match[2] || match[4] || match[7] || 'unknown',
                line: match[3] || match[5] || match[8]
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


export namespace ElemOption {
    export function removeAllChild(elem: HTMLElement) {
        /* 移除所有子元素 */
        if (elem.children?.length)
            Array.from(elem.children).forEach(e => elem.removeChild(e))
    }
}


export namespace extent {
    function isArray(value: any): value is any[] {
        return Array.isArray(value);
    }
    function isClass(value: any): value is Function {
        if (value && typeof value === "function")
            return /^class\s/.test(Object.prototype.toString.call(value));
        return false;
    }
    function isFunction(value: any): value is Function {
        return typeof value === 'function' && !isClass(value);
    }
    function isInstance(value: any): value is object {
        if (value && typeof value === 'object')
            return /^class\s/.test(value.constructor.toString())
        return false;
    }
    function isObject(value: any): value is object {
        return typeof value === "object" && !isArray(value) && !isInstance(value);
    }
    function dir(obj: any) {
        const properties = new Set<string>();

        let currentObj = obj;
        do {
            for (const key of Object.getOwnPropertyNames(currentObj)) {
                properties.add(key);
            }
            currentObj = Object.getPrototypeOf(currentObj);
        } while (currentObj);

        return Array.from(properties);
    }

    export namespace array {
        export function shuffle<T>(arr: T[]): T[] {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
    }
    export namespace object {
        export function shuffleValue(obj: {[key: string]: any}) {
            for (const key in obj)
                if (obj.hasOwnProperty(key) && isArray(obj[key]))
                    obj[key] = array.shuffle(obj[key]);
        }

        export enum DiffMode {
            CHANGE = 0,
            COMPARE = 1
        }

        export function findDiff(obj1: object, obj2: object, mode: DiffMode = DiffMode.COMPARE, diff: object = {}): object {
            if (!obj1 || !obj2)  // 如果有任何一个对象为空
                return mode ? {type: 'assign', obj1: obj1, obj2: obj2} : {type: 'assign', from: obj1, to: obj2}


            for (let key in obj1) {  // 遍历obj1
                if (!obj2.hasOwnProperty(key))  // obj2中没有该属性
                    diff[key] = {type: mode ? 'obj1 only' : 'deleted', value: obj1[key]}

                else {  // obj2中有该属性
                    if (obj1[key] && typeof obj1[key] === "object") {  // 该属性是对象
                        diff[key] = findDiff(obj1[key], obj2[key], mode, diff[key])
                        if (!Object.keys(diff[key]).length)
                            delete diff[key]
                    }  // 递归比较

                    else if (obj1[key] !== obj2[key]) {  // 该属性值不同
                        console.log("value", diff, key)
                        diff[key] = mode ? {type: 'changed', obj1: obj1[key], obj2: obj2[key]} : {
                            type: 'changed',
                            from: obj1[key],
                            to: obj2[key]
                        }
                    }
                }
            }

            for (let key in obj2) {  // 遍历obj2
                if (!obj1.hasOwnProperty(key))  // obj1中没有该属性
                    diff[key] = {type: mode ? 'obj2 only' : 'added', value: obj2[key]}
            }

            return diff;
        }
    }
}


export async function request(url: string, reqHead: string, data: any, method: string = "POST", contentType: string = "application/json"): Promise<{code: number, msg: string, data: any}> {
    /* 发送请求

    @param {string} url - 目标路径
    @param {string} reqHead - 用于描述请求部分和目的的字段
    @param {object} data 请求内容
    @return {object} 返回的json数据,包括code,msg,body
    */

    const response = await fetch(route.join(url, reqHead), {
        method: method,
        headers: {"Content-Type": contentType},
        body: contentType === "application/json" ? JSON.stringify(data) : data
    })

    if (!response.ok)
        console.warn(`${response.status} - ${response.statusText}: ${location.href} => ${response.url}!`)

    return await response.json()
}


export namespace route {
    function removePos(str: string, pos: "S" | "E" | "A" = "E", char: string = "/"): string {
        /* 移除字符串开头或结尾的指定字符
         *
         * @param {string} str - 要处理的字符串
         * @param {string} pos - 要移除的位置(S:开头, E:结尾, A:开头和结尾)
         * @param {string} char - 要移除的字符(默认: "/")
         * @returns {string} - 处理后的字符串
         * */

        switch (pos) {
            case "S":
                return str.replace(new RegExp(`^${char}+`), "");
            case "E":
                return str.replace(new RegExp(`${char}+$`), "");
            case "A":
                return str.replace(new RegExp(`^${char}+|${char}+$`), "");
            default:
                return str;
        }
    }

    export function join(...args: string[]): string {
        /* 连接路径
         *
         * @param {...string} args - 路径片段
         * @returns {string} - 连接后的路径
         * */

        return args.map((v, i) => removePos(v, i === 0 ? "E" : i === args.length - 1 ? "S" : "A")).join("/")
    }
}


export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


