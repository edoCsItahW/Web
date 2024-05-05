/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
// const { worker, isMainThread, parentPort } = require('worker_threads')


function cached(target, key, descriptor) {
    if (typeof descriptor.value !== 'function') {
        throw new Error('@cached can only be used on methods');
    }

    const originalMethod = descriptor.value;

    descriptor.value = function() {
        if (!this.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                value: originalMethod.apply(this, arguments),
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
        return this[key];
    };

    return descriptor;
}

class argsParser {
    constructor() {
        this._argsObj = {}
    }

    get argsObj() {
        return this._argsObj
    }

    set argsObj(obj) {
        this._argsObj = obj
    }

    register(command, description, argsDict) {
        const args = command.split(' ')

        if (args.length) {
            const token = args[0]
            let subCommand = null

            if (args.length > 1) {
                subCommand = args.slice(1)
            }

            if (subCommand) {

                Object.entries(argsDict).forEach(([k, v]) => {
                    if (!subCommand.includes(k)) {
                        throw new Error(`参数描述'${k}'和实际指令不匹配!`)
                    }
                })

                this.argsObj[token] = {
                    des: description,

                }
            }

        }
    }
}

class base {
    constructor(botName, messListening, viewFlag) {
        this.messFlag = messListening
        this.botName = botName
        this.viewFlag = viewFlag
        this._botCache = null
        this._moveCache = null
        this._callArr = []
        this.loop = null

        this.bot.loadPlugin(pathfinder)
        this.bot.loadPlugin(pvp)

        this.botInit()

    }

    get bot() {
        if (!this._botCache) {
            this._botCache = mineflayer.createBot({
                host: 'localhost',
                port: 25565,
                username: this.botName,
            })
        }

        return this._botCache
    }

    get movement() {
        if (!this._moveCache) {
            this._moveCache = new Movements(this.bot)
        }


        return this._moveCache
    }

    get nearest() {
        return this.bot.nearestEntity()
    }

    listenMess() {
        this.bot.on('message', (message) => {
            /*
            * 重定向聊天信息到控制台
            * */
            console.log(message.toAnsi())
        })
    }

    viewer(bot) {
        bot.once('spawn', () => {
            mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port 是本地网页运行的端口 ，如果 firstPerson: false，那么将会显示鸟瞰图。
        })
    }

    listenError() {
        this.bot.on('error', console.error)
    }

    attack(target = null) {
        if (!target) target = this.nearest

        if (target) {
            this.bot.pvp.attack(target)
        }
        else {
            this.bot.chat("错误的目标!")
        }
    }

    lookAt(target) {
        this.bot.once('spawn', () => {
            setInterval(() => {
                if (!target) return
                this.bot.lookAt(target.position.offset(0, target.height, 0))
            }, 50)

        })
    }

    moveTo(target = null) {
        if (!target) target = this.nearest

        const { x: playerX, y: playerY, z: playerZ } = target.position

        this.bot.pathfinder.setMovements(this.movement)
        this.bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1))
    }

    botInit() {
        if (this.messFlag) {this.listenMess()}

        if (this.viewFlag) {this.viewer(this.bot)}

        this.commandTable = {
            'attack': this.attack.bind(this),
            'moveTo': this.moveTo.bind(this),
            'hunt': this.hunt.bind(this),
            'stopLoop': this.stopLoop.bind(this),
        }

        this.listenError()
        this.commandControl()
    }

    _strToEntity(str) {

        return this.bot.nearestEntity(entity => entity.name.toLowerCase() === str)
    }

    hunt(target = null) {
        if (!target) target = this.nearest
        else if (typeof target ==='string') target = this._strToEntity(target)

        if (target) {
            this.lookAt(target)
            this.moveTo(target)
            this.attack(target)
        }
    }

    eventLoop(func, args) {
        if (this._callArr.length) {
            console.log('任务准备运行')
            return;
        }

        let funcArr = [func, args]

        if (!this._callArr.includes(funcArr)) this._callArr.push(funcArr)

        this.loop = setInterval(() => {
            for (let f of this._callArr) {
                f[0](...f[1])
            }

            if (!this._callArr.length) {
                clearInterval(this.loop)
                this.loop = null
            }
        }, 10)
    }

    stopLoop() {
        this._callArr = []
        if (this.loop) {
            clearInterval(this.loop)
            this.loop = null
        }
    }

    commandControl() {
        this.bot.on('chat', (username, message) => {
            if (username === this.bot.username) return

            const args = message.split(' ')

            if (args.length) {
                try {
                    if (args.length >= 3 || args[2] === '-K') {
                        this.eventLoop(this.commandTable[args[0]], [args.length > 1 ? this._strToEntity(args[1]) : null])
                    }
                    else {
                        this.commandTable[args[0]](args.length > 1 ? this._strToEntity(args[1]) : null)
                    }
                }
                catch (e) {
                    console.log(e)
                    this.bot.chat("指令错误!")
                }
            }
        })
    }

}


module.exports = {base, cached}
