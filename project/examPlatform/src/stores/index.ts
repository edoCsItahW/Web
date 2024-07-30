/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import { defineStore } from 'pinia'
import { request } from '../../../../jsPackage/src/comFunc'
import {logo, stdType, Field, objToClass, appUrl, rsp, field, CusType} from "@/assets/common";
import router from "@/router";


interface obj {
    [key: string]: any
}


export const Store_ = defineStore('main', {
    state: () => {
        return {
            user: null as rsp.User,
            window_: {title: "Exam Platform", leftIcon: false, bgColor: "#3289ff", logo: logo.home, scroll: false},
            idSet: {
                uid: parseInt(localStorage.getItem("uid") as string),
                TP: 0
            },
            exam: {
                global: {submit: false, type: 0, ques: 0},
                quesPool: null,
                msg: null,
                addonType: null,
                log: ([] as {input: string | string[], answer: string | string[], right: number, type: string, content: string, id: number}[])
            }
        }
    },
    getters: {
        frame(state): CusType.obj {  // 总模块信息
            const keys = Object.keys(state.user.customType);

            if (state.user?.customType && keys.length)
                if (!(state.user.customType[keys[0]].value[0] instanceof field))
                    objToClass(state.user.customType)

            return {...(state.user.customType as CusType.obj), ...stdType}
        },
        quesPool(state): {[key: string]: any[]} {  // 当前考试题库
            return state.exam.quesPool || state.user.TPs[state.idSet.TP].quesPool
        },
        nowType(state): string {  // 当前题目类型
            return Object.keys(this.quesPool)[state.exam.global.type]
        },
        nowQP(): {display: string, value: any}[] {  // 当前题目类型题池: [{display: string, value: nowQues}]
            return this.quesPool[this.nowType]
        },
        nowQues(state): {[key: string]: any} {  // 当前题目显示内容: {Content: string, Answer: string, ...}
            return this.nowQP[state.exam.global.ques].value
        },
        frameObj(): field[] {  // 当前题目类型模块(已排序)
            return this.frame[this.nowType].value.sort((a, b) => a.order - b.order)
        }
    },
    actions: {
        updateUser(): void {
            request(appUrl, "user", { uid: Number.parseInt(localStorage.getItem("uid") as string) }, "POST")
                .then((res: rsp.Std<rsp.User>) => {
                    if (res.code === 200) {
                        this.user = res.data;
                        localStorage.setItem("uid", res.data.id.toString());

                        if (res.data?.customType && Object.keys(res.data.customType).length)
                            if (typeof res.data.customType[Object.keys(res.data.customType)[0]][0] === 'object')
                                this.user.customType = objToClass(res.data.customType);

                    }
                    else
                        console.error(`${res.code} - Failed to get user info: ${res.msg}`)
                })
        },
        updateWindow(key: string, value: any) {
            (this.window_ as obj)[key] = value;
        },
        updateUserId(uid: number) {
            localStorage.setItem("uid", uid.toString());
            this.idSet.uid = uid;
        },
        updateQP(qp: any) {
            this.exam.quesPool = qp;
        },
        nextQues() {
            if (!this.exam.msg)
                return;

            this.exam.msg = {dst: this.exam.msg.dst, type: 'next', data: null}

            if (this.exam.global.ques >= this.nowQP.length - 1) {
                if (this.exam.global.type >= Object.keys(this.quesPool).length - 1) {
                    router.push('/examEnd');
                    return;
                }

                this.exam.global.ques = 0;
                this.exam.global.type++;
            }
            else
                this.exam.global.ques++;

            this.exam.global.submit = false
        }
    }
})
