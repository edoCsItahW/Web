<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { Store_ } from "@/stores";
import { mapState } from "pinia";
import pageHeader from "./pageHeader.vue";


export default {
    data() {
        return {}
    },
    setup() {
        const store = Store_();

        store.updateUser();
        store.updateWindow("leftIcon", true);

        return { store }
    },
    computed: {
        ...mapState(Store_, {
            user: "user",
            window_: "window_",
        })
    },
    components: {
        pageHeader
    }
}
</script>

<template>
        <pageHeader v-if="user">

            <div class="wark-table">

                <div class="sider-menu">

                    <ul class="menu">

                        <li class="menu-item" @click="">

                        <span role="img" aria-hidden="true">

                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -50 256 256"
                                 focusable="false">
                                <title>testPaper</title>
                                <g>
                                    <title>Layer 1</title>
                                    <ellipse ry="100" rx="100" id="svg_6" cy="128" cx="128" stroke-width="10"
                                             stroke="#ffffff" fill="#ffffff"/>
                                    <line id="svg_8" y2="128" x2="165.335" y1="128" x1="89.335" stroke-width="10"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_9" y2="128" x2="165.335" y1="128" x1="89.335" stroke-width="10"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_10" y2="152" x2="165.335" y1="152" x1="89.335" stroke-width="10"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_11" y2="177" x2="165.335" y1="177" x1="89.335" stroke-width="10"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_12" y2="208" x2="68" y1="48" x1="68" stroke-width="20"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_13" y2="208" x2="188" y1="208" x1="68" stroke-width="20"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_14" y2="98" x2="188" y1="203" x1="188" stroke-width="20"
                                          stroke="#000000" fill="none"/>
                                    <line id="svg_15" y2="48" x2="148" y1="48" x1="68" stroke-width="20"
                                          stroke="#000000" fill="none"/>
                                    <path d="m145.33499,48.99999c2,0 2,0 3,0c1,0 1,0 2,0c1,0 0.69344,0.45881 2,1c0.92387,0.38268 2,1 3,1c0,0 0.15224,-0.76537 2,0c1.30656,0.54119 1.29289,1.29289 2,2c0.70711,0.70711 2,0 3,1c1,1 2,1 3,1c0,0 0.82375,1.48626 3,2c0.97325,0.22975 2.07613,0.61732 3,1c1.30656,0.54119 1.69344,2.45881 3,3c0.92387,0.38268 1,0 3,2c0,0 0.29289,1.2929 1,2c0.70711,0.70711 0.61731,0.07612 1,1c0.5412,1.30656 2,1 2,1c0,1 1.4588,1.69344 2,3c0.38269,0.92388 0,1 0,3c0,1 0,2 0,2c1,1 1,2 1,2c1,2 1,3 1,4c0,0 0,2 1,2c0,0 0.4588,0.69344 1,2c0.38269,0.92388 0,2 0,2c0,1 0,2 0,2c1,1.99999 1,1.99999 2,4.99999l0,1"
                                          id="svg_18" stroke-width="20" stroke="#000000" fill="none"/>
                                    <path d="m138.33499,54.99999c3,1 3.07613,1.61732 4,2c1.30656,0.54119 1,2 1,2c1,0 1,1 2,2c0,0 2,2 2,2c0,1 -0.38269,2.07612 0,3c0.5412,1.30656 2,1 2,2c0,1 -0.38269,1.07612 0,2c0.5412,1.30656 1,2 2,3c0,0 0,1 0,2c0,0 0,1 1,2c0,0 0,1 0,2c0,1 1,1 1,2c0,0 0,1 0,2c0,0 0,1 0,2c0,0 0,1 0,2c0,2.99999 0,3.99999 0,4.99999c0,1 1,1 3,1c1,0 2,0 3,0c0,0 2,0 3,0c1,0 2,0 3,0c1,0 2.07613,-0.38268 3,0c1.30656,0.5412 3,1 3,1c1,0 3,0 4,0c1,0 2,1 3,1l1,0l0,0l1,0"
                                          id="svg_19" stroke-width="20" stroke="#000000" fill="none"/>
                                </g>
                            </svg>

                        </span>

                            <p style="margin-left: 10px;">套卷</p>

                        </li>

                    </ul>

                </div>

                <div class="widow">

                    <div class="item-table">

                        <div class="item-wrapper">

                            <router-link to="/scanQues" class="item item-image" v-for="(item, index) in user.TPs" :style="{ 'background-image': `url(${item.fileData})` }" @click="store.idSet.TP = index">

                                <div class="item-text">

                                    <p class="itme-name">{{ item.name }}</p>
                                    <p class="itme-desc">{{ item.desc }}</p>

                                </div>

                            </router-link>

                            <router-link to="/createTP" class="item">

                                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="150" height="150"
                                     viewBox="0 0 24 24" aria-labelledby="addIconTitle">
                                    <title id="addIconTitle">Add</title>
                                    <line x1="12" y1="9" x2="12" y2="15" stroke-width="1" stroke="black"
                                          stroke-linecap="round" stroke-linejoin="round" opacity="0.7"></line>
                                    <line x1="9" y1="12" x2="15" y2="12" stroke-width="1" stroke="black"
                                          stroke-linecap="round" stroke-linejoin="round" opacity="0.7"></line>
                                </svg>

                            </router-link>

                        </div>

                    </div>

                </div>

            </div>

        </pageHeader>

</template>

<style>
body {
    background-color: #474747;
    overflow: hidden;
}

svg {
    overflow: visible;
}

.wark-table {
    display: flex;
    flex-direction: row;
    height: 100vh;
}

.sider-menu {
    flex: 1;
    background-color: #092035;
    border-radius: 8px;
    margin: 10px 5px 0 0;
}

.widow {
    flex: 3;
    background-color: #474747;
    border-radius: 8px;
    margin: 10px 0 0 5px;
}

.menu {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 5px;
    margin-block-end: 0;
    height: calc(100% - 40px);
}

.menu-item {
    list-style: none;
    color: #9e9e9e;
    margin: 0 5px;
    border-radius: 4px;
    height: 6%;
    text-align: left;
    align-content: center;
    padding: 0 0 0 10px;
    font-weight: bold;
    font-size: 20px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.menu-item:hover {
    background-color: #1a2f49;
    color: #37eff3;
}

.item-table {
    background-color: #aeaeae;
    border-radius: 8px;
    margin: 5px;
}

.item-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 10px;
}

.item {
    width: calc(19% - 10px);
    height: 150px;
    background-color: lightblue;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    margin: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #151515;
}

.item:hover {
    filter: brightness(1.1);
}

.item-text {
    padding: 0 10px;
}

.itme-name {
    font-size: 20px;
}

.itme-desc {
    font-size: 13px;
}

.item-image {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

</style>