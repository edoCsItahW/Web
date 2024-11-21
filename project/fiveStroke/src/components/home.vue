<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
/**
 * @file home.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/11/13 下午2:06
 * @desc
 * @copyright CC BY-NC-SA
 * */
import { defineComponent } from "vue";
import { API_URL, route } from "confunc";

export default defineComponent({
    data() {
        return {
            currImgUrl: "",
            rightKey: null as string | null,
            checkFlag: false,
            errCount: 0,
            keyRows: [
                ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
            ],
            prompt: {flag: true, auto: false, time: 5000},
            showCharRoot: true
        };
    },
    created() {
        this.getImg();
    },
    methods: {
        getImg() {
            this.errCount = 0;
            fetch(route.join(API_URL, "img"))
                .then(res => {
                    if (res.status == 200) {
                        this.rightKey = res.headers.get("Custom-Message");
                        return res.blob(); // 将响应转换为Blob对象
                    } else console.error(`${res.status} -- Failed to get img!`);
                })
                .then(blob => {
                    if (blob) this.currImgUrl = URL.createObjectURL(blob);

                    this.checkFlag = true;

                    if (this.prompt.auto) {
                        this.prompt.time = 5000;
                        setTimeout(() => this.promptKey(), this.prompt.time);
                    }
                });
        },
        promptKey() {
            // 提示效果
            const rightKey = document.getElementById(this.rightKey?.toUpperCase());
            rightKey?.classList.add('prompt');
            setTimeout(() => rightKey?.classList.remove('prompt'), 500);
        }
    },
    mounted() {
        document.addEventListener("keydown", ev => {
            if (ev.repeat) return;

            if ((ev.key >= 'a' && ev.key <= 'z') || (ev.key >= 'A' && ev.key <= 'Z')) {
                this.prompt.time = 5000;  // 在提示前输入会重置提示时间

                // 按键效果
                const key = document.getElementById(ev.key.toUpperCase());
                key?.classList.add('push');
                setTimeout(() => key?.classList.remove('push'), 50);

                // 检查是否正确
                if (ev.key.toUpperCase() === this.rightKey) {
                    this.checkFlag = false;

                    // 正确效果
                    const img = document.getElementById('img');
                    img?.classList.add('right');
                    setTimeout(() => {
                        img?.classList.remove('right');
                        this.getImg();
                    }, 500);
                }
                else {
                    // 三次错误后进行下一题
                    if (this.errCount >= 3)
                        this.getImg();
                    else {
                        this.errCount++;  // 错误次数+1

                        // 错误效果
                        const img = document.getElementById('img');
                        img?.classList.add('wrong');
                        setTimeout(() => {
                            img?.classList.remove('wrong');
                        }, 1000);
                    }
                }
            }
        });
    }
});
</script>

<template>
    <div class="home">

        <header class="home-header">

            <h1>Five Stroke</h1>

        </header>

        <main class="home-main">

            <div class="home-main-control">

                <div class="home-main-control-prompt">

                    <div class="home-main-control-prompt-flag">

                        <label for="prompt-flag">是否开启提示</label>
                        <label class="switch">
                            <input id="prompt-flag" type="checkbox" v-model="prompt.flag">
                            <span class="slider"></span>
                        </label>

                    </div>

                    <div class="home-main-control-prompt-auto" v-if="prompt.flag">

                        <label for="auto-prompt">是否自动提示</label>
                        <label class="switch">
                            <input id="auto-prompt" type="checkbox" v-model="prompt.auto">
                            <span class="slider"></span>
                        </label>

                    </div>

                    <button v-if="!prompt.auto && prompt.flag" @click="promptKey">提示</button>

                </div>

                <div class="home-main-control-charroot">

                    <div class="home-main-control-charroot-flag">

                        <label for="char-root">是否显示字根表</label>
                        <label class="switch">
                            <input id="char-root" type="checkbox" v-model="showCharRoot">
                            <span class="slider"></span>
                        </label>

                    </div>

                </div>

            </div>

            <div class="home-main-img">

                <img id="img" :src="currImgUrl" alt="img" />

            </div>

            <div class="home-main-key" v-if="showCharRoot">

                <div class="home-main-key-row" v-for="(row, index) in keyRows" :key="index">

                    <img :id="key" v-for="(key, idx) in row" :key="idx" :src="`/static/img/${key}.png`" alt="key" />

                </div>

            </div>

        </main>

    </div>

</template>

<style lang="sass">
@keyframes shake
    0%
        transform: translateX(0)
    25%
        transform: translateX(-5px)
    50%
        transform: translateX(5px)
    75%
        transform: translateX(-5px)
    100%
        transform: translateX(0)


.switch
    position: relative
    display: inline-block
    width: 40px
    height: 20px

.switch input
    opacity: 0
    width: 0
    height: 0

.slider
    position: absolute
    cursor: pointer
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: #ccc
    transition: .4s
    border-radius: 34px

.slider:before
    position: absolute
    content: ""
    height: 14px
    width: 14px
    left: 3px
    bottom: 3px
    background-color: white
    transition: .4s
    border-radius: 50%

input:checked + .slider
    background-color: #217fff

input:checked + .slider:before
    transform: translateX(20px)

.home
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    height: 100%

    &-header
        display: flex
        flex: 1

    &-main
        display: flex
        flex-direction: column
        align-items: center
        flex: 9

        &-control
            position: absolute
            top: 30px
            right: 10px
            display: flex
            flex-direction: column
            align-items: center

            & > div
                border: 1px solid #000000
                border-radius: 5px
                padding: 5px
                margin-bottom: 5px
                display: flex
                flex-direction: column
                align-items: center

        &-img
            flex: 2
            display: flex
            align-items: center
            justify-content: center
            min-width: 100%

            img
                width: 50%
                height: auto

        &-key
            flex: 3
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center

            &-row
                display: flex
                justify-content: center
                align-items: center
                img
                    width: 8%
                    transition: all 0.05s ease-in-out

.right
    box-shadow: 0 0 10px greenyellow

.wrong
    padding: 0
    box-shadow: 0 0 10px red
    animation: shake 0.7s linear infinite

.prompt
    box-shadow: 0 0 10px yellow
    animation: shake 0.7s linear infinite

.push
    transform: scale(0.9)
</style>
