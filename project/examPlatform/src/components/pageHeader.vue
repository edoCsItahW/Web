<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script>
import { Store_ } from "@/stores";
import { mapState } from "pinia";
import router from "@/router";


export default {
    data() {
        return {}
    },
    setup() {
        const store = Store_();

        return { store, router }
    },
    computed: {
        ...mapState(Store_, {
            user: "user",
            window_: "window_",
        })
    },
    methods: {

    }
}
</script>

<template>
    <header class="header" :style="{ 'backgroundColor': window_.bgColor }">

        <div class="header-logo">

            <div style="z-index: 9;" v-html="window_.logo" @click="router.push('/')"></div>

            <h1 class="header-logo-text">{{ window_.title }}</h1>

        </div>

        <div class="header-user" v-if="window_.leftIcon">

            <span class="header-user-name">{{ user?.name || 'Guest' }}</span>

            <router-link to="/login">

                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 650 650"
                     preserveAspectRatio="xMidYMid meet">
                    <title>Login or Register</title>
                    <g transform="translate(0,650) scale(0.1,-0.1)" fill="black">
                        <path d="M2655 6465 c-533 -102 -1000 -314 -1435 -651 -148 -114 -420 -386 -534 -534 -360 -464 -589 -995 -670 -1551 -23 -152 -23 -796 0 -948 81 -556 310 -1087 670 -1551 114 -148 386 -420 534 -534 467 -362 977 -582 1560 -673 167 -26 763 -26 930 0 583 91 1093 311 1560 673 148 114 420 386 534 534 362 467 582 977 673 1560 15 95 18 177 18 465 0 288 -3 370 -18 465 -91 583 -311 1093 -673 1560 -114 148 -386 420 -534 534 -441 341 -927 560 -1459 655 -105 19 -152 21 -575 20 -438 -1 -467 -2 -581 -24z m820 -1044 c190 -43 370 -136 513 -267 254 -231 390 -586 353 -923 -28 -263 -126 -473 -309 -663 -273 -284 -674 -399 -1055 -304 -477 120 -812 533 -834 1027 -24 530 333 1003 847 1124 137 32 353 35 485 6z m-1018 -2359 c209 -155 398 -256 570 -303 97 -26 283 -36 378 -20 195 34 423 147 671 333 51 37 97 68 103 68 6 0 44 -16 84 -36 220 -111 391 -269 550 -507 174 -260 317 -653 329 -902 l3 -70 -1889 -3 c-1040 -1 -1893 1 -1897 5 -12 13 10 180 41 308 110 458 371 869 692 1086 57 39 224 128 240 129 5 0 61 -39 125 -88z"/>
                    </g>
                </svg>

            </router-link>

        </div>

    </header>

    <slot :scroll="window_.scroll"></slot>

</template>

<style>
.header {
    padding: 0 24px;
    min-height: 60px;
    border-radius: 0 0 8px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.header-logo {
    display: flex;
    align-items: center;
}

.header-logo-text {
    font-size: 24px;
    color: honeydew;
    margin-left: 10px;
}

.header-user {
    float: right;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.header-user-name {
    font-weight: bold;
    font-size: 25px;
    margin-right: 10px;
    color: #ededed;
}
</style>