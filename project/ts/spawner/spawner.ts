/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */


namespace Exception {
    export class ParseError extends Error {
        constructor(public msg: string) {
            super(msg);
        }
    }
}

namespace Tools {
    export function findall(pattern: RegExp, str: string) {
        const matches: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(str)) !== null) {
            matches.push(match[0]);
        }
        return matches;
    }
}

export namespace Parser {
    const fieldTypes: string[] = ['Attributes:', 'Methods:', ':param', ':return', 'Example:', 'example:', ':raises', ":type"]
    const attrs = {param: {}, keyword: {}, raises: {}};

    export function desc(comment: string): string {
        comment = comment
            .replace(/(?<=\S)\s(?=\S)/g, '(#s#)')  // 先将全部独自单个的空格替换为特殊字符
            .replace(" ", "")  // 再将所有空格替换为空
            .substring(0, comment.indexOf("\n\n"))  // 截取到第一个换行符之前的部分
            .replace("(#s#)", " ");  // 还原特殊字符

        if (fieldTypes.some(f => comment.includes(f)))
            throw new Exception.ParseError("描述中含有应当被解析的字段类型.")

        return comment;
    }
    export function example(comment: string): string[] | string | undefined {
        if (comment.toLowerCase().includes("example:")) {
            const pattern = /(?<=Example:|example:)(?::).*?(?=$|Attributes|Methods)/gs;

            const res =  Tools.findall(pattern, comment);

            return res ? res[0] : res;
        }

    }
    export namespace Class {

    }
    export namespace Func {
        export function params(comment: string) {
            let matchs: string[];
            let result = "";
            if (comment.includes(":param")) {
                matchs = Tools.findall(/(?<=:param\s)(.*?)(?=$|\n\n)/g, comment);
                if (matchs) {
                    result = ":" + matchs.join(matchs[0])
                    Object.keys(attrs).forEach(key => )
                }
            }
        }
    }
}
