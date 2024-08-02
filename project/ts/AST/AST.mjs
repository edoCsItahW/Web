/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import { ALLOW, AST_INFO } from "./general.mjs";
import ts from "typescript";


// const filePath = "C:\\Users\\Lenovo\\Desktop\\core\\packages\\reactivity\\src\\ref.ts"
const filePath = "E:\\codeSpace\\codeSet\\web\\project\\ts\\ast\\parseAim.ts"

const sourceFile = ts.createSourceFile(
    filePath,
    ts.sys.readFile(filePath),
    ts.ScriptTarget.Latest,
    true
    );

ts.forEachChild(sourceFile, function visit(node) {
    for (const key in ALLOW)
        if (ts.SyntaxKind[node.kind].toString() === key)
            ALLOW[key](node);
});

console.log(AST_INFO);
// import { ast2json } from "./func.mjs";
// ast2json(filePath)
