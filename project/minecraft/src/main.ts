/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { Base, funcKit } from "./support";
import { Interpreter } from "./interpreter";


const base = new Base('bastBot', {msg: true, view: true});

base.interpreter = new Interpreter(base.bot,
    base.stdWrap((...args: string[]) => { return [base.bot, funcKit.findTargetWithName(base.bot, args[0])] })(funcKit.lookAt),
    base.stdWrap((...args: string[]) => { return [base.bot, funcKit.findTargetWithName(base.bot, args[0])] })(funcKit.attack),
    base.stdWrap((...args: string[]) => { return [base.bot, funcKit.findTargetWithName(base.bot, args[0]), base.movements] })(funcKit.moveTo),
    base.stdWrap((...args: string[]) => { return [base.bot, funcKit.findTargetWithName(base.bot, args[0]), base.movements] })(funcKit.hunt),
)

base.parsing();

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
