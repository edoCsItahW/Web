/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import {Theme} from "@/assets/typeSup";


export const API_URL = location.origin + '/api';

export namespace Color {
    export const DARK_DICT = {
        font: '#ffffff',
        back: '#171717',
        fontl: '#e4e4e4'
    }
    export const LIGHT_DICT = {
        font: '#171717',
        back: '#fff',
        fontl: '#575757'
    }
}

export namespace Func {
    export function choice(ev: PointerEvent, targetClass: string) {
        const choiced = document.getElementsByClassName(targetClass);

        if (choiced)
            if (ev.target !== choiced[0]) {
                choiced[0].classList.remove(targetClass);
                (ev.target as HTMLElement).classList.add(targetClass);
            }

    }
}

export function color(key: string, reversal: boolean = false): string {
    return this.store.theme === (reversal ? Theme.DARK : Theme.LIGHT) ? Color.LIGHT_DICT[key] : Color.DARK_DICT[key];
}
