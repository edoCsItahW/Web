<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { ref } from 'vue'


const orgWarn = console.warn;
console.warn = function (...args) {
    const char = /(?<=:\s)Unicode text character\s"(.)"\sused in math mode(?=\s\[)/.exec(args[0])?.[1];

    if (!/[\u4e00-\u9fa5]/.test(char))
        orgWarn.apply(console, args);
}


export default {
    data() {
        return {
            text: ''
        }
    },
    props: {
        latex: {
            type: String,
            required: true
        }
    },
    setup() {
        const math = ref<HTMLElement | null>(null);
        return { math }
    },
    mounted() {
        this.text = this.latex

        if (this.text.includes('$'))
            this.text = this.text.replace(/\$/g, '')

        if (this.math)
            katex.render(this.text, this.math, {
                throwOnError: false,  // 控制报错
                strict: 'ignore',  // 忽略非法字符
                errorColor: '#b19c00',  // 错误颜色
                displayMode: false, // 显示模式,内联模式
            })
    },
    watch: {
        latex: {
            handler(latex: string) {

                if (latex.includes('$'))
                    latex = latex.replace(/\$/g, '')

                if (this.math)
                    katex.render(this.latex, this.math, {
                        throwOnError: false,  // 控制报错
                        strict: 'ignore',  // 忽略非法字符
                        errorColor: '#ffe537',  // 错误颜色
                        displayMode: false, // 显示模式,内联模式
                    })
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<template>
    <div ref="math"></div>
</template>

<style>

</style>