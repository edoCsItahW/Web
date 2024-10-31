/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/**
 * @file types.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/25 下午8:18
 * @desc
 * */

export interface LangCell {
    en: string;
    zh: string;
}

export interface Cmt {
    user: { name: string; img: string | null, id: number };
    content: string;
    time: string;
    date: string;
}

export interface Content {
    header: {
        options: LangCell[];
        search: LangCell;
    },
    home: {
        block: {
            teacher: LangCell;
            score: LangCell;
            comment: {
                num: LangCell;
                ph: LangCell;
                submit: LangCell;
                success: LangCell;
            }
        },
        statistics: {
            title: LangCell;
        },
        confirm: LangCell
    },
    login: {
        title: {
            login: LangCell;
            register: LangCell;
        },
        username: LangCell;
        password: LangCell;
        confirm: LangCell;
        submit: {
            login: LangCell;
            register: LangCell;
        }
    },
    profile: {
        leaveword: LangCell;
        logout: LangCell;
    }
}

export interface Course {
    id: number;
    imgUrl: string;
    title: string;
    text: string;
    teacher: string;
    stars: number;
    comment: Cmt[];
}

export type Courses = Course[];
