/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import { ALLOW, AST_INFO } from "./general";
import ts from 'typescript'
import { sourceFile } from "./func";
// @ts-ignore
import * as util from "util"
// @ts-ignore
import fs from "fs"
// @ts-ignore
import path from "path"
import { ast2json, setToJson } from "./func";
// @ts-ignore
import addon from "build/Release/obj/addon"


const filePath = "C:\\Users\\Lenovo\\Desktop\\core\\packages\\reactivity\\src\\ref.ts";

const source = sourceFile(filePath);

ts.forEachChild(source, function _(node: ts.Node) {
    for (const key in ALLOW)
        if (ts.SyntaxKind[node.kind].toString() === key)
            // @ts-ignore
            ALLOW[key](node);
//        else
//            ts.forEachChild(node, _);
})

console.log(util.inspect(AST_INFO, { depth: null, colors: true }));
//ast2json(filePath)
// @ts-ignore
fs.writeFileSync(path.join(__dirname, "AST_Reference.json"), JSON.stringify(addon.setToJson(AST_INFO), null, 2), "utf-8")

function* view(view: any) {
    yield view.add()
}
