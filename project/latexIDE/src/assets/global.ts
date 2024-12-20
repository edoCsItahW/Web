/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/*****************************************************
 * @File name: func.ts global.ts
 * @Author: edocsitahw in WebStorm
 * @Version: 1.1
 * @Date: 2024/09/14 下午3:48
 * @Commend:
 *******************************************************/

export namespace Type {
    export type LangCell = { zh: string, en: string };
    
    export type Text = {
        main: {
            menus: LangCell[]
        }
    };
    
    export enum Lang {
        ZH = 'zh',
        EN = 'en'
    }
    
    export enum Theme {
        DARK = 'dark',
        LIGHT = 'light'
    }
}
