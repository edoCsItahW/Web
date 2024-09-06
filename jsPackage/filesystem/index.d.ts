/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
declare module 'fileSystem' {
    export class FileSystem {
        constructor(path: string);
        get path(): string;
        set path(path: string);
        static join(path: string): string;
        static abspath(path: string): string;
        write(path: string, content: string): void;
        read(path: string): string;
    }

    export function open(path: string): FileSystem;
}
