/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

// import { world, system } from "@minecraft/server";
//
//
// function mainTick() {
//     if (system.currentTick % 100 === 0) {
//         world.sendMessage("Hello starter! Tick: " + system.currentTick)
//     }
//
//     system.run(mainTick);
// }
//
// system.run(mainTick);
const mineflayer = require('mineflayer')
const collectBlock = require('mineflayer-collectblock').plugin
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const { base } = require("./base")


// const net = require('net')


// const client = new net.Socket()

// client.connect(9999, "localhost", () => {
//     console.log('连接成功')

const bs = new base("baseBot", true, false)  // , client)

// })



// function getCurrentCallerInfo() {
//     const originalPrepareStackTrace = Error.prepareStackTrace;
//     let callerInfo = null;
//     try {
//         const err = new Error();
//         Error.prepareStackTrace = (err, stack) => stack;
//         Error.captureStackTrace(err, getCurrentCallerInfo);
//         const stack = err.stack;
//         callerInfo = stack[1];
//     } finally {
//         Error.prepareStackTrace = originalPrepareStackTrace;
//     }
//     return callerInfo;
// }
//
// const callerInfo = getCurrentCallerInfo();
// if (callerInfo) {
//     console.log('调用者函数名:', callerInfo.getFunctionName());
//     console.log('调用者文件路径:', callerInfo.getFileName());
//     console.log('调用者行号:', callerInfo.getLineNumber());
// } else {
//     console.log('无法获取调用者信息');
// }

//
// bs.bot.on('heldItemChanged', heldItem => {
//     console.log(heldItem)
// })

// 主要文件: minecraft-protocol/
// client.js, setProtocol.js, ping.js, tcp_dns.js
