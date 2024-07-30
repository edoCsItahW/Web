/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao. 
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial 
 * purposes is prohibited without the author's permission. If you have any questions or require 
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
function vvec(start: number, end: number) { return [end - start, 0] }

function hvec(start: number, end: number) {return [0, end - start]}

function dot(vec1: number[], vec2: number[]) {return vec1[0] * vec2[0] + vec1[1] * vec2[1]}

function len(vec: number[]) {return Math.sqrt(vec[0] ** 2 + vec[1] ** 2)}

function cos(vec1: number[], vec2: number[]) { return dot(vec1, vec2) / (len(vec1) * len(vec2)); }

function sin(vec1: number[] | number, vec2: number[] | null = null) {
    if (vec2) return Math.sqrt(1 - cos(vec1 as number[], vec2) ** 2);
    else return Math.sqrt(1 - (vec1 as number) ** 2);
}

export function dirCos(startX: number, startY: number, endX: number, endY: number) {
    const vec1 = [endX - startX, endY - startY];
    const vec2 = vvec(startX, endX);
    return cos(vec1, vec2);
}

export function dirTran(startX: number, startY: number, endX: number, endY: number) {
    const cosRes = dirCos(startX, startY, endX, endY);
    return [cosRes, sin(cosRes)]
}
