/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Base } from "./support";
import { Interpreter } from "./interpreter";
import { performance } from "perf_hooks";
import { Beahvior, FuncKit } from "./func";
import { MoveCommand, LookCommand } from "./commond";


const base = new Base('bastBot', {msg: true, view: true});

base.interpreter = new Interpreter(base.bot,
    new MoveCommand(base.bot, base.movements),
    base.stdWrap((...args: string[]) => { return [base.bot, FuncKit.str2Target(base.bot, args[0])] })(Beahvior.attack),
    new LookCommand(base.bot),
    base.stdWrap((...args: string[]) => { return [base.bot, FuncKit.str2Target(base.bot, args[0]), base.movements] })(Beahvior.hunt),
)

base.parsing()

base.bot.on('chat', async (username: string, message: string) => {
    if (username === base.bot.username) return

    if (message === 'loaded') {
        console.log(base.bot.entity.position)
        await base.bot.waitForChunksToLoad()
        base.bot.chat('Ready!')
    }

    if (message.startsWith('find')) {
        const name = message.split(' ')[1]
        if (base.bot.registry.blocksByName[name] === undefined) {
            base.bot.chat(`${name} is not a block name`)
            return
        }
        const ids = [base.bot.registry.blocksByName[name].id]

        const startTime = performance.now()
        const blocks = base.bot.findBlocks({ matching: ids, maxDistance: 128, count: 10 })
        const time = (performance.now() - startTime).toFixed(2)

        base.bot.chat(`I found ${blocks.length} ${name} blocks in ${time} ms`)
    }
})

function protecteSelf() {
    let hostileId: number | null = null;
    const ival = setInterval(() => {
        const entity = base.bot?.nearestEntity();
        if (entity && entity.type === 'hostile' && entity.id !== hostileId) {
            if (base.bot.entity.position.distanceTo(entity.position) < 20) {
                hostileId = entity.id || null;
                base.interpreter?.execute('hunt @p');
            }
        }
    }, 1000)
}

protecteSelf();
