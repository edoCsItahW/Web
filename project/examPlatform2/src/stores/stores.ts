/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { request } from "jsorigin/src";
import { API_URL } from "@/assets/global";
import { API, Theme } from "@/assets/typeSup";
import { defineStore } from "pinia";

export function updateKey(dstObj: object, value: any, keys: string[]): object {
    if (!keys.length) return dstObj;

    const key = keys.shift();

    if (keys.length) {
        if (!dstObj[key]) dstObj[key] = {};
        updateKey(dstObj[key], value, keys);
    } else dstObj[key] = value;
}

export const Store_ = defineStore("store", {
    state() {
        return {
            // 支持多语言的文本内容
            content: null as API.Content | null,
            // 当前语言
            lang: "en",
            // 当前主题
            theme: Theme.LIGHT,
            // 用户hash,默认为0
            userHash: "0",
            // 用户信息
            user: {} as API.User,
            // 试卷信息
            paper: {} as API.Papers,
        };
    },
    getters: {},
    actions: {
        // 更新指定字段
        updateUser(...args: string[]) {
            request(API_URL, "user", args).then((res: API.Resp.Std<any>) => {
                if (res.code === 200) updateKey(this.user, res.data, args);
                else console.error(`${res.code} - Failed to get field <${args.join(".")}>: ${res.msg}!`);
            });
        },
        // 更新试卷信息
        updatePaper(...args: string[]) {
            request(API_URL, "paper", args).then((res: API.Resp.Std<any>) => {
                if (res.code === 200) {
                    if (args.length) updateKey(this.paper, res.data, args);
                    else this.paper = res.data;
                } else console.error(`${res.code} - Failed to get field <${args.join(".")}>: ${res.msg}!`);
            });
        },
        // 获取多语言支持文本
        getContent() {
            request(API_URL, "content", null).then((res: API.Resp.Std<any>) => {
                if (res.code === 200) this.content = res.data;
                else console.error(`${res.code} - Failed to get content: ${res.msg}!`);
            });
        },
        init() {
            this.getContent();
        },
    },
});
