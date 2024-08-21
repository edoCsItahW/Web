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
import {MoveCommand, LookCommand, AttackCommand, HuntCommand, GuardCommand} from "./commond";
import { Beahvior, FuncKit } from "./func";


const base = new Base('bastBot', {msg: true, view: true});

base.interpreter = new Interpreter(base.bot,
    new MoveCommand(base.bot, () => { return base.movements; }),
    new AttackCommand(base.bot),
    new LookCommand(base.bot),
    new HuntCommand(base.bot, () => { return base.movements; }),
    new GuardCommand(base.bot, () => { return base.movements; })
)

base.parsing()

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
