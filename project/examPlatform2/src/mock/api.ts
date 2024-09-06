/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {API} from "@/assets/typeSup";


const CONTENT = {
    pageHeader: {
        title: {en: 'Exam Platform', zh: '考试平台'}
    },
    home: {
        header: {
            rest: {zh: '考试倒计时', en: 'Exam Countdown'},
            restDef: {zh: '未设置', en: 'Not Set'}
        },
        sbj: [
            {zh: '数学', en: 'Math'},
            {zh: '英语', en: 'English'},
            {zh: '政治', en: 'Politics'},
            {zh: '计算机基础与程序设计', en: 'Computer Science'}
        ],
        total: [
            {zh: '总分', en: 'Total Score'},
            {zh: '总正确率', en: 'Total Accuracy'},
            {zh: '坚持天数', en: 'Persist Days'}
        ],
        module: [
            {zh: "模块1", en: "Module1"},
            {zh: "模块2", en: "Module2"},
            {zh: "模块3", en: "Module3"},
            {zh: "模块4", en: "Module4"}
        ],
        paper: {
            title: {zh: '套卷', en: 'Papers'},
            author: {zh: '作者', en: 'Author'},
            sbj: {zh: '科目', en: 'Subject'},
            num: {zh: '题目数量', en: 'Number of Questions'},
        }
    }

}

const USER_TABLE = {
    "0":
        {
            name: "customer",
            passwd: null,
            role: 1,
            data: {
                countdown: null,  // 考试倒计时
                sbj: [0, 1],  // 选择的科目
                persistDays: 0,  // 坚持的天数
                oar: 0,  // 总正确率
                score: 0  // 总分
            }
        },
    "4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2":
        {
            name: "root",
            passwd: "89fbaf3afefba8b017c97ffd9278f135ff4816a459fda4ce5f24c6aadb3354fe",
            role: 0,
            data: {
                countdown: null,
                sbj: [],
                persistDays: 0,
                oar: 0,
                score: 0
            }
        }
}

const SERVER_TABLE = [
    {
        name: "TestPaper1",
        sbj: 1,
        num: 10,
        author: "root"
    }
]

function stdResp(data: any, code: number = 200, msg: string = 'ok') {
    return {code, msg, data}
}


function get(table: object) {
    return function getArgs(...args: string[]) {
        if (!args.length) return table;

        let _LAST: object = JSON.parse(JSON.stringify(table));

        for (let key of args)
            _LAST = _LAST[key];
        return _LAST;
    }
}

export default [
    {
        url: '/api',
        method: 'POST',
        response: () => stdResp(1)
    },
    {
        url: '/api/content',
        method: 'POST',
        response: () => stdResp(CONTENT)
    },
    {
        url: '/api/user',
        method: 'POST',
        response: (req: API.Requ.Std<string[]>) => stdResp(get(USER_TABLE)(...req.body))
    },
    {
        url: '/api/paper',
        method: 'POST',
        response: (req: API.Requ.Std<string[]>) => stdResp(get(SERVER_TABLE)(...req.body))
    }
]
