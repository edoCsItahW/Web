/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/**
 * @file global.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/16 下午12:33
 * @desc
 * @copyright CC BY-NC-SA
 * */

/** @namespace Theme
 * @desc 包含主题相关的类和方法
 * @property {Mode} Mode 主题模式
 * @property {IColor} IColor 主题颜色接口
 * @property {_Color} _Color 主题颜色类
 * */
export namespace Theme {
    /** @enum Mode
     * @desc 主题模式
     * @property LIGHT 亮色模式
     * @property DARK 暗色模式
     * */
    export enum Mode {
        LIGHT,
        DARK
    }
    
    
    /** @interface IColor
     * @desc 主题颜色接口
     * @property {string} font 字体颜色
     * @property {string} back 背景颜色
     * @property {string} border 边框颜色
     * */
    export interface IColor {
        font: string;
        fontL: string;
        fontD: string;
        backL: string;
        backD: string;
        back: string;
        border: string;
    }
    
    
    /** @class _Color
     * @desc 主题颜色类
     * @property {Mode} mode 主题模式
     * @property {IColor} map 主题颜色映射表
     * */
    export class _Color {
        #map: IColor = {
            // LIGHT, DARK
            font: ["#333", "#d3d3d3"],
            fontL: ["#494949", "#9f9f9f"],
            fontD: ["#1e1e1e", "#ececec"],
            back: ["#e3e3e3", "#1c1c1c"],
            backD: ["#fff", "#000000"],
            backL: ["#d6d6d6", "#373737"],
            border: ["#888", "#888"],
        };
        
        constructor(public mode: Mode) {
        }
        
        get map() {
            return this.#map;
        }
        
        hexToRgb(hexColor: string): number[] {
            hexColor = hexColor.replace('#', '');
            
            return Array.from({length: 3}, (_, i) => parseInt(hexColor.slice(i * 2, i * 2 + 2), 16));
        }
    }
    
    
    /** @constant Color
     * @desc 包装 Theme._Color 类，使其可以像一个对象一样访问颜色属性
     * */
    export const Color = (mode: Mode) => new Proxy<_Color>(new _Color(mode), {
        get: (target: _Color, key: string) => {
            if (key in target.map) return target.map[key]?.[target.mode];
            return target[key];
        },
        set: (target: _Color, key: string, value: any) => {
            if (key in target.map) throw new Error(`Cannot set ${key} property`);
            if (key === "mode") target.mode = value;
            return true;
        }
    }) as IColor & _Color;
}

export interface _SvgFunc {
    (w?: Number, h?: Number, style?: string): string;
}

export interface ISvg {
    lang: _SvgFunc;
}

export class _Svg {
    #map = {
        // LIGHT, DARK
        lang: ['black', 'white']
    };
    
    public rate = 1;
    
    constructor(private color: Theme._Color & Theme.IColor) {
    }
    
    get isLight() {
        return this.color.mode === Theme.Mode.LIGHT;
    }
    
    get map() {
        return this.#map;
    }
    
    auto(key: string) {
        return this.map[key]?.[this.isLight ? 0 : 1];
    }
    
    lang(w: Number = 24, h: Number = 24) {
        return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="${this.auto('lang')}" width="${this.rate * w}" height="${this.rate * h}">
                <path d="m11.62965 16.61452c-1.13922-.692-3.111-2.36313-3.153-2.32718a28.32942 28.32942 0 0 1 -3.30095 2.26177c-.68823.39708-1.38892.49615-1.82064-.09139a.992.992 0 0 1 .26656-1.40406c.00852-.00391 2.44665-1.594 3.25973-2.29678a11.64387 11.64387 0 0 1 -2.23281-3.53521 1.07774 1.07774 0 0 1 .52716-1.36835c.52715-.22205 1.049-.12664 1.48663.61989a10.33341 10.33341 0 0 0 1.8143 2.89517 10.853 10.853 0 0 0 2.1563-4.3469l-7.63293-.02148v-2.00685h4.8124v-.99406a.98574.98574 0 1 1 1.9713 0v.99406h5.1703v2.00685h-2.08646a17.03869 17.03869 0 0 1 -2.64065 5.75689 15.88157 15.88157 0 0 0 2.30149 1.66068l2.3092-5.66617a1.162 1.162 0 0 1 2.1802.01591l3.01041 7.389 1.85638 4.385h-2.47393l-1.08252-2.53924h-4.84082l-.888 2.53924h-2.5993l.287-.69166zm4.31307-5.16715-1.67531 4.55419h3.35059z"/>
            </svg>`;
    }
}

export const Svg = (color: Theme._Color & Theme.IColor) => new Proxy<_Svg>(new _Svg(color), {
    get: (target: _Svg, key: string) => {
        if (key in target) return target[key];
        return target.auto(key);
    }
}) as _Svg & ISvg;

export enum Lang {
    EN = "en",
    ZH = "zh"
}
