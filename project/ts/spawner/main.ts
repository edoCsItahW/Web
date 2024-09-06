/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import { Parser } from "./spawner";
// @ts-ignore
import fs from "fs";
// @ts-ignore
import path from "path";

// @ts-ignore
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "./comment.json")));

for (const comment of data)
    console.log(Parser.example(comment))


