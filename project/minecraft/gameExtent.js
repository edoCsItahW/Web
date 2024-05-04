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
'use strict'
const mineflayer = require('mineflayer')
const pathfinder = require('mineflayer-pathfinder').pathfinder
const collectBlock = require('mineflayer-collectblock').plugin

const bot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: 'bot1'
})

const bot2 = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: 'bot2'
})

bot.on('message', (message) => {
    /*
    * 重定向聊天信息到控制台
    * */
    console.log(message.toAnsi())
})

bot2.on('whisper', (username, message) => {
    console.log(`I received a whisper from ${username}: ${message}`)
})

bot.on('error', console.log)
