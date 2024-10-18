/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { defineStore } from "pinia";
import { request, API_URL } from "jspackage/src";
import { Theme, Svg, _Svg, type ISvg, Lang } from "@/assets/global";
import { type IProj, type IUser, LangCell } from "@/assets/types";


export const Store_ = defineStore("store", {
    state() {
        return {
            user: null as IUser | null,
            proj: null as IProj[] | null,
            color: Theme.Color(Theme.Mode.LIGHT),
            _svg: null as _Svg | ISvg,
            lang: Lang.EN,
            _trans: undefined as { recver: string, data: any }
        };
    },
    getters: {
        svg(state) {
            if (state._svg) return state._svg;
            return state._svg = Svg(state.color)
        },
        trans(state) {
            const t = localStorage.getItem("trans");
            return t ? JSON.parse(t) : state._trans;
        }
    },
    actions: {
        /**
         * @desc 在程序一开始运行时,初始化一些数据
         * */
        init() {
            this.updateUser();
            this.updateProj();
        },
        send(recver: string, data: any) {
            localStorage.setItem("trans", JSON.stringify({ recver, data }))
            this._trans = { recver, data };
        },
        format(key: LangCell) {
            return key[this.lang];
        },
        /**
         * @desc 获取用户信息
         * */
        updateUser() {
            request(API_URL, "user", { type: "info" }).success(res => { this.user = res.data; })
        },
        updateProj() {
            request(API_URL, "proj", { type: "info" }).success(res => { this.proj = res.data; });
        },
        changeColor() {
            this.color.mode = this.color.mode === Theme.Mode.LIGHT ? Theme.Mode.DARK : Theme.Mode.LIGHT;
        }
    }
});