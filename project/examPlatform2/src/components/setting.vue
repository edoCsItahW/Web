<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<!-- ----------------------------------------------------
  - @File name: func.ts setting.vue
  - @Author: edocsitahw in WebStorm
  - @Version: 1.1
  - @Date: 2024/09/07 下午11:05
  - @Commend: 
  ------------------------------------------------------- -->

<script lang="ts">
import { defineComponent } from "vue";
import { Store_ } from "@/stores/stores";
import { color, Svg } from "@/assets/global";
import { Theme } from "@/assets/typeSup";

export default defineComponent({
    data() {
        return {
            // @ts-ignore
            themeFlag: Boolean(Object.values(Theme).indexOf(this.store.theme)),
            themeList: [Svg.dark, Svg.light],
            langList: { en: "English", zh: "简体中文" },
        };
    },
    setup() {
        const store = Store_();
        return { store, color };
    },
    methods: {
        changeTheme() {
            this.themeFlag = !this.themeFlag;
        },
    },
    watch: {
        themeFlag: {
            handler(val: boolean) {
                this.store.theme = Object.values(Theme)[Number(val)];
            },
            immediate: true,
        },
    },
});
</script>

<template>
    <div class="setting" :style="{ backgroundColor: color('back') }">
        <div class="setting-menu">
            <ul class="setting-list">
                <li>
                    <span :style="{ color: color('font') }">{{ store.content?.settings.menu[0][store.lang] }}</span>

                    <div class="setting-list-item" v-html="themeList[Number(themeFlag)](color('font'))" @click="changeTheme"></div>
                </li>

                <li>
                    <span :style="{ color: color('font') }">{{ store.content?.settings.menu[1][store.lang] }}</span>

                    <select class="setting-list-item" v-model="store.lang">
                        <option v-for="(lang, key) in langList" :value="key">
                            {{ lang }}
                        </option>
                    </select>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="sass">
@import "src/assets/global"


.setting
    height: 100%
    &-list
        list-style: none
        margin: 0
        & li
            display: flex
            margin-bottom: 5px
            padding: 5px
            border-radius: 5px
            flex-direction: row
            position: relative
            align-items: center

        &-item
            position: absolute
            right: 30px
</style>
