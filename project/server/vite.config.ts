/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            sass: {
                api: 'modern-compiler'
            }
        }
    },
    plugins: [
        vue(),
        vueDevTools(),
        viteMockServe({
            mockPath: "./src/mock",
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    assetsInclude: ["**/*.svg"],
    server: {
        host: "0.0.0.0",
        port: 7265,
        open: true
    }
});