<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import { Store_ } from "@/stores/stores";
import { color, Svg } from "@/assets/global";

export default {
    data() {
        return {
            icons: [
                {
                    src: Svg.home,
                    path: "/",
                },
                {
                    src: Svg.custom,
                    path: "/custom",
                },
                {
                    src: Svg.add,
                    path: "/add",
                },
                {
                    src: Svg.setting,
                    path: "/setting",
                },
                {
                    src: Svg.avatar,
                    path: "/user",
                },
            ] as { src: Function; path: string }[],
        };
    },
    computed: {
        // 文本: <标题>
        titleText() {
            return this.store.content?.pageHeader.title[this.store.lang];
        },
    },
    setup() {
        const store = Store_();
        return { store, color };
    },
    methods: {
        // 文本: <链接>
        linkText(idx: number) {
            return this.store.content?.pageHeader.footer[idx][this.store.lang];
        },
    },
};
</script>

<template>
    <header class="ph-header" :style="{ color: color('font', true) }">
        {{ titleText }}
    </header>

    <slot> </slot>

    <footer
        class="ph-footer"
        :style="{
            backgroundColor: color('back'),
            color: color('font'),
        }"
    >
        <div class="ph-footer-item" v-for="(icon, idx) in icons">
            <router-link class="ph-footer-link" :to="icon.path">
                <div v-html="icon.src(color('font'))"></div>

                <p :style="{ color: color('font') }">{{ linkText(idx) }}</p>
            </router-link>
        </div>
    </footer>
</template>

<style lang="sass">
@use 'sass:math'
@import "../assets/global"

.ph-header
    background-image: linear-gradient(to bottom, #378CF2, #00bfff)
    height: math.div($TOP_HEIGHT, 12)
    display: flex
    align-items: center
    justify-content: center
    font-weight: bold
    font-size: math.div($TOP_HEIGHT, 40)

.ph-footer
    position: absolute
    bottom: 0
    width: 100%
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-around

    &-item
        @include iconHover()
        transform: scale(0.9)

    &-link
        display: inline-flex
        flex-direction: column
        align-items: center
        justify-content: center
        font-size: 0.8rem
        font-weight: lighter
</style>
