/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { spawn } from 'child_process';
import { WarnLevel, ToolKit } from "./npc";


export function runServer(): void {
    const ls = spawn('cmd', ['/c', 'server']);

    ls.stdout.on('data', (data) => {
        console.warn(WarnLevel.ERROR, data);
    });

    ls.stderr.on('data', (data) => {
        console.warn(WarnLevel.ERROR, data);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}


