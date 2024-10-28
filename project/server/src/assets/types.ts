/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

export interface LangCell {
    zh: string;
    en: string;
}

/** @interface IUser
 * @description 用户信息接口
 * @property {string} name - 用户名
 * @property {string} imgUrl - 头像地址
 * */
export interface IUser {
    // 用户名
    name: string;
    // 头像地址
    imgUrl: string;
}

export interface IProj {
    // 项目名称
    name: LangCell;
    // 项目描述
    desc: LangCell;
    // 项目地址
    url: string;
    docUrl: string;
    intro: string;
}
