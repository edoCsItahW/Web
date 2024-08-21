/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {CMD, Guardian, Merchant, Archer, ToolKit, WarnLevel} from './npc'
import net from 'net';
import {ChatMessage} from "prismarine-chat";
import { exec } from "node:child_process";


exec("powershell Start-Process -FilePath 'cmd' -ArgumentList '/c server.exe'", (error, stdout, stderr) => {
    if (error) {
        console.error(`执行出错: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`错误输出: ${stderr}`);
        return;
    }
});


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    await sleep(2000);

    let lastMsg = "";

    const client = new net.Socket();
    client.connect(9999, "localhost", () => {

        console.warn(WarnLevel.INFO, ToolKit.formatMsg("Connected successfully"));

        const cmd = new CMD([445, 62, 2038], {
            client: client, msg: (...args) => {

                const msg: ChatMessage = args[0];

                console.warn(WarnLevel.INFO, ToolKit.formatMsg(msg.toAnsi()))

                client.write(msg.toString());

                console.warn(WarnLevel.INFO, ToolKit.formatMsg(msg.toString(), 'out', 'MESSAGE'));

                client.on('data', data => {
                    if (data.toString() !== lastMsg) {
                        console.warn(WarnLevel.INFO, ToolKit.formatMsg(data.toString(), 'in', 'MESSAGE'));
                        lastMsg = data.toString();
                    }
                });

            }
        });
        cmd.run();

        const guardian = new Guardian("GuardianR", [498, 71, 2038], {client: client});
        guardian.run();

        const merchant = new Merchant("Merchant", [485, 66, 2042], {client: client});
        merchant.run();

        const archer = new Archer("Archer", [496, 79, 2037], {client: client});
        archer.run();
    });
}


main();


