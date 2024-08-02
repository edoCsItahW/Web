/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import ts from 'typescript'
// @ts-ignore
import fs from 'fs'
// @ts-ignore
import path from 'path'


export function sourceFile(filePath: string) {
    const content = ts.sys.readFile(filePath);

    if (content === undefined)
        throw new Error(`File "${filePath}" not found!`)

    return ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true)
}

export function ast2json(filePath: string) {

    const source = sourceFile(filePath)

    const res: any[] = []

    function visit(log: any[]) {
        function func(node: ts.Node) {
            const key = ts.SyntaxKind[node.kind].toString()

            const obj = {[key]: node.getChildCount() === 0 ? node.getText() : []}

            log.push(obj)

            ts.forEachChild(node, visit(obj[key] as any))
        }
        return func
    }

    ts.forEachChild(source, visit(res))

    try {
        // @ts-ignore
        fs.writeFileSync(path.join(__dirname, 'AST.json'), JSON.stringify(res, null, 2), 'utf8')
    }
    catch (e) {
        console.error(e)
    }
}

export function setToJson(data: any): any;
export function setToJson(key: string, value: any): any
export function setToJson(arg1: any, arg2?: any) {
    if (arg2 === undefined) {
        const stack = [arg1];

        while (stack.length) {
            const current = stack.pop();

            if (Array.isArray(current)) {
                current.reverse();

                while (current.length) {
                    let item = current.pop();

                    if (item instanceof Set)
                        item = Array.from(item);

                    else if (typeof item === 'object' && item !== null)
                        stack.push(item);

                    else
                        if (!current.length)
                            current.reverse();

                    if (Array.isArray(current))
                        stack.push(item);

                }
            }

            else if (typeof current === 'object' && current !== null) {
                Object.entries(current).forEach(([k, v]) => {
                    if (v instanceof Set)
                        current[k] = Array.from(v);

                    else if (typeof v === 'object' && v !== null)
                        stack.push(v);

                    else
                        current[k] = v;
                })
            }

        }
        return arg1;
    }
    else {
        if (arg2 instanceof Set)
            return Array.from(arg2)
        else if (typeof arg2 === 'object' && arg2 !== null)
            return Object.entries(arg2).map(([k, v]) => [k, setToJson(k, v)]);
        return arg2;
    }

}


