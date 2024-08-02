/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import ts from 'typescript'
import fs from 'fs'
import path from 'path'

export function ast2json(filePath) {
    const sourceFile = ts.createSourceFile(filePath, ts.sys.readFile(filePath), ts.ScriptTarget.Latest, true)

    const res = []

    function visit(log) {
        function func(node) {
            const key = ts.SyntaxKind[node.kind].toString()


            const obj = {[key]: node.getChildCount() === 0 ? node.getText() : []}

            log.push(obj)

            ts.forEachChild(node, visit(obj[key]))
        }
        return func
    }

    ts.forEachChild(sourceFile, visit(res))

    try {
        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        fs.writeFileSync(path.join(__dirname, 'AST.json').substring(1), JSON.stringify(res, null, 2), 'utf8')
    }
    catch (e) {
        console.error(e)
    }
}