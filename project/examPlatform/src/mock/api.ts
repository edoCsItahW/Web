/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { req } from "@/assets/common";
import { ErrHandle, extent } from "../../../../jsPackage/src/comFunc/index";


const DEBUGINFO = {
    user: false,
    data: true
}


let user = [
    {
        id: 0,
        name: "admin",
        password: "eastasdf64asdfa32fw3aw3fa3wasf224f",
        ip: "127.0.0.1",
        customType: {},
        TPs: []
    }
]


enum dstEnum {
    IN = 0,
    OUT = 1
}


function debug(data: any, dst?: dstEnum = dstEnum.OUT, name?: string = '') {
    if (DEBUGINFO.user)
        console.log("\nUser: ", JSON.stringify(user));
    if (DEBUGINFO.data) {
        const now = new Date();
        console.log(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} [vite:mock] ${name} ${dst ? 'Data Out' : 'Data In'} ${dst ? '->' : '<-'} ${JSON.stringify(data)}`);
    }
}


function infoDec(func: Function, dataPos: number = 0) {
    return function () {
        debug(arguments[dataPos], dstEnum.IN, func.name)
        return func.apply(this, arguments)
    }
}


function stdRsq(data: any, code: number = 200, msg: string = "ok") {
    debug(data, dstEnum.OUT)
    return {code: code, msg: msg, data: data};
}


function userInfo(uid: number) {
    const result = user.find(item => {
        return item.id === uid
    })

    if (result)
        return stdRsq(result)
    else
        return stdRsq(null, 404, `User with id ${uid} not found!`)
}


function nomarl(data: req.Normal<any>) {
    switch (data.type) {
        case "captcha":
            return stdRsq(Array.from({length: 4}, () => Math.floor(Math.random() * 10)).join(''));
        case "shuffle":
            extent.object.shuffleValue(data.data);
            return stdRsq(data.data);
        default:
            return stdRsq(null, 400, "Invalid request type!")
    }
}


function register(data: req.RegAndLog) {
    if (user.some(item => item.name === data.name))
        return stdRsq(null, 400, '用户名已存在!');

    if (user.some(item => item.ip === data.ip))
        return stdRsq(null, 400, 'IP地址已存在!');

    user.push({id: user.length, name: data.name, password: data.password, ip: data.ip, TPs: []})

    return stdRsq(null);
}


function login(data: req.RegAndLog) {
    if (user.some(item => item.name === data.name && item.password === data.password))
        return stdRsq(user.findIndex(item => item.name === data.name && item.password === data.password))

    else
        return stdRsq(null, 400, '用户名或密码错误!')

}


function createTP(data: req.TP) {

    if (user.some(item => item.id === data.uid)) {

        if (!user[data.uid])
            return stdRsq(null, 400, `uid 为 ${data.uid} 的用户不存在!`)

        if (user[data.uid].TPs.some(item => item.name === data.name))
            return stdRsq(null, 400, '试卷重复!')

        user[Number.parseInt(data.uid)].TPs.push({
            id: user[Number.parseInt(data.uid)].TPs.length,
            name: data.name,
            desc: data.desc,
            duration: data.duration,
            quesPool: {}
        })

        return stdRsq(null)
    }

    else
        return stdRsq(null, 400, '用户不存在!')
}


function delQues(data: req.DelQues) {
    const qp = user[data.uid].TPs[data.TP]?.quesPool

    if (!qp) return stdRsq(null, 400, "试卷不存在!")

    user[data.uid].TPs[data.TP].quesPool[data.type].splice(data.id, 1)

    if (user[data.uid].TPs[data.TP].quesPool[data.type].length === 0)
        delete user[data.uid].TPs[data.TP].quesPool[data.type]

    return stdRsq(null)
}


function addQues(data: req.Ques) {
    const qp = user[data.uid].TPs[data.tpId]?.quesPool

    if (!qp) return stdRsq(null, 400, "试卷不存在!")

    if (data.type in qp)
        user[data.uid].TPs[data.tpId].quesPool[data.type].push({...data.content, id: qp[data.type].length})
    else
        user[data.uid].TPs[data.tpId].quesPool[data.type] = [{...data.content, id: 0}]

    return stdRsq(null)
}


function customType(data: req.CustomType) {
    if (user.some(item => item.id === data.uid)) {
        user[data.uid].customType[data.name] = data.modules
        return stdRsq(null)
    }
    return stdRsq(null, 400, "User not found!")
}


export default [
    {
        url: "/api",
        method: "POST",
        response: (data: req.Std<req.Normal<any>>) => infoDec(nomarl)(data.body)
    },
    {
        url: "/api/user",
        method: "POST",
        response: (data: req.Std<req.User>) => infoDec(userInfo)(data.body.uid)
    },
    {
        url: "/api/register",
        method: "POST",
        response: (data: req.Std<req.RegAndLog>) => infoDec(register)(data.body)
    },
    {
        url: "/api/login",
        method: "POST",
        response: (data: req.Std<req.RegAndLog>) => infoDec(login)(data.body)
    },
    {
        url: "/api/createTP",
        method: "POST",
        response: (data: req.Std<req.TP>) => infoDec(createTP)(data.body)
    },
    {
        url: "/api/addQues",
        method: "POST",
        response: (data: req.Std<req.Ques>) => ErrHandle.tryExec(infoDec(addQues))(data.body)
    },
    {
        url: "/api/delQues",
        method: "POST",
        response: (data: req.Std<req.DelQues>) => infoDec(delQues)(data.body)
    },
    {
        url: "/api/customType",
        method: "POST",
        response: (data: req.Std<req.CustomType>) => infoDec(customType)(data.body)
    }
]
