/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import ts from 'typescript'


let addAble = false;

function func(fn: (node: ts.Node, ...args: any[]) => void, ...args: any[]) {
    function wrapper(node: ts.Node) {
        fn(node, ...args);
        ts.forEachChild(node, func(fn, ...args));
    }
    return wrapper;
}

export const AST_INFO: {[key: string]: Record<string, any>} = {
    imports: {},
    classes: {},
    interfaces: {},
    enums: {},
    functions: {},
    variables: {},
    exports: {},
}

export const ALLOW: {[key: string]: (node: any) => void} = {
    ImportDeclaration: importDeclaration,
    ClassDeclaration: classDeclaration,
    FunctionDeclaration: functionDeclaration,
    VariableDeclaration: variableDeclaration,
    ExportDeclaration: exportDeclaration,
    EnumDeclaration: onlyExport,
    InterfaceDeclaration: onlyExport,
    TypeAliasDeclaration: onlyExport,
    ModuleDeclaration: onlyExport,
    FirstStatement: debug(false)(onlyExport),
}

function importDeclaration(node: ts.ImportDeclaration) {
    const key = node.moduleSpecifier.getText()

    AST_INFO.imports[key] = []

    ts.forEachChild(node, func((node: ts.Node) => {
        if (ts.isIdentifier(node))
            if (ts.isImportSpecifier(node.parent))
                AST_INFO.imports[key].push({'name': node.getText()})

            else if (ts.isNamespaceImport(node.parent))
                AST_INFO.imports[key].push({'namespace': node.getText()})

            else
                AST_INFO.imports[key].push({'default': node.getText()})

    }))
}

function classDeclaration(node: ts.ClassDeclaration) {
    const key = node.name!.getText()

    AST_INFO.classes[key] = {heritage: new Set(), quote: {func: new Set(), type: new Set()}}

    ts.forEachChild(node, func((node: ts.Node) => {
        if (ts.isHeritageClause(node))
            AST_INFO.classes[key].heritage.add(
                {
                    heritage: node.types.map(type => type.getText()),
                    type: ts.SyntaxKind[node.token] === 'ExtendsKeyword' ? 'extends' : 'implements'
                }
            );

        else if (ts.isCallExpression(node) && !node.expression.getText().includes('this.'))
            AST_INFO.classes[key].quote.func.add(node.expression.getText())

        else if (ts.isTypeReferenceNode(node) && node.typeName.getText() !== 'T')
            AST_INFO.classes[key].quote.type.add(node.typeName.getText())

        findExport(node)
    }))

}

function functionDeclaration(node: ts.FunctionDeclaration) {
    const key = node.name!.getText()

    AST_INFO.functions[key] = {quote: {func: new Set(), type: new Set()}}

    ts.forEachChild(node, func((node: ts.Node) => {
        if (ts.isTypeReferenceNode(node) && node.typeName.getText() !== 'T')
            AST_INFO.functions[key].quote.type.add(node.typeName.getText())

        else if (ts.isCallExpression(node))
            AST_INFO.functions[key].quote.func.add(node.expression.getText())

        findExport(node)
    }))
}

function variableDeclaration(node: ts.VariableDeclaration) {
    const key = node.name!.getText()

    AST_INFO.variables[key] = {quote: {func: new Set(), type: new Set()}}

    ts.forEachChild(node, func((node: ts.Node) => {
        if (ts.isTypeReferenceNode(node))
            AST_INFO.variables[key].quote.type.add(node.typeName.getText())

        else if (ts.isCallExpression(node))
            AST_INFO.variables[key].quote.func.add(node.expression.getText())
    }))
}

function exportDeclaration(node: ts.ExportDeclaration) {
    ts.forEachChild(node, func((node: ts.Node) => {
        if (ts.isIdentifier(node)) {
            if (!('block' in AST_INFO.exports))
                AST_INFO.exports['block'] = []

            AST_INFO.exports['block'].push(node.getText())
        }
    }))
}

function findExport(node: ts.Node, debug: boolean = false) {
    if (debug)
        console.log(ts.SyntaxKind[node.kind])

    if (ts.SyntaxKind[node.kind] === 'ExportKeyword')
        addAble = true

    else if (ts.isIdentifier(node) && addAble) {
        if (!('single' in AST_INFO.exports))
            AST_INFO.exports['single'] = new Set()
        AST_INFO.exports['single'].add(node.getText())
    }
}

function onlyExport(node: ts.Node, debug: boolean = false) {
    // @ts-ignore
    ts.forEachChild(node, func(findExport, debug))
}

function debug(debug: boolean) {
    function _func(fn: Function) {
        function wrapper(node: ts.Node, ...args: any[]) {
            try {
                fn(node, debug, ...args);
            }
            catch (e) {
                console.error(e);
            }
        }
        return wrapper;
    }
    return _func;
}

