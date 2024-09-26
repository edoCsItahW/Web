/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

export namespace API {
    export type ConType = { [key: string]: any };
    
    
    export interface Data {
        countdown: number | null;
        sbj: number[];
        persistDays: number;
        oar: number;
        score: number;
    }
    
    
    export interface LangCell {
        zh: string;
        en: string;
    }
    
    
    export interface Field {
        label: LangCell;
        desc: LangCell;
        type: LangCell;
    }
    
    
    export interface Content {
        pageHeader: {
            title: LangCell;
            footer: LangCell[];
        };
        home: {
            header: {
                rest: LangCell;
                restDef: LangCell;
            };
            sbj: LangCell[];
            total: LangCell[];
            module: LangCell[];
            paper: {
                title: LangCell;
                author: LangCell;
                sbj: LangCell;
                num: LangCell;
            };
        };
        paper: {
            left: {
                title: LangCell;
            };
            right: {
                title: LangCell;
                desc: LangCell;
                fields: Field[];
                submit: LangCell;
            };
        };
        settings: {
            menu: LangCell[];
        };
        ques: {
            nothing: LangCell;
        },
        custom: {
            menu: LangCell[];
            title: LangCell;
            paragraph: LangCell;
            list: LangCell;
        }
    }
    
    
    export interface User {
        [key: string]: {
            name: string;
            passwd: string;
            role: number;
            data: Data;
        };
    }
    
    
    export interface Paper {
        name: string;
        sbj: number;
        num: number;
        author: string;
        limit: number;
        desc: string;
    }
    
    
    export type Papers = Paper[];
    
    export namespace Resp {
        export interface Std<T> {
            data: T;
            msg: string;
            code: number;
        }
    }
    export namespace Requ {
        export interface Std<T> {
            url: string;
            body: T;
            query: object;
            headers: object;
        }
        export interface Create {
            content: {
                name: string;
                sbj: number;
                desc: string;
                limit: number;
            },
            type: number;
        }
    }
}


export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}


export enum Subject {
    MATH,
    ENGLISH,
    POLITICS,
    COMPUTER_SCIENCE,
}
