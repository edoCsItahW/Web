/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import ts from 'typescript'
import { extent } from 'jsPackage/src/comFunc'


function func(fn, ...args) {
    function wrapper(node) {
        fn(node, ...args);
        ts.forEachChild(node, func(fn, ...args));
    }
    return wrapper;
}


export const AST_INFO = {
    imports: {},
    classes: [],
    interfaces: [],
    enums: [],
    functions: [],
    variables: [],
    typeAliases: [],
    exports: [],
    call: []
}

export const ALLOW = {
    'ImportDeclaration': importDeclaration,
}

function importDeclaration(node) {
    const key = node.moduleSpecifier.getText()

    AST_INFO.imports[key] = []

    ts.forEachChild(node, func((node) => {
        console.log(ts.SyntaxKind[node.kind])
        console.log(extent.dir(node))
        if (ts.isImportSpecifier(node)) {
            AST_INFO.imports[key].push(node.getText())
        }
    }))
}

function classDeclaration(node) {
    const key = node.moduleSpecifier.getText()

    AST_INFO.classes.push(key)
}
