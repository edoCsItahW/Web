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
 * @file login.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/22 上午11:12
 * @desc 登录组件
 * @copyright CC BY-NC-SA 2024. All rights reserved.
 * */
import { defineComponent } from "vue";
import { Store_ } from "@/stores/stores";
import { mapState } from "pinia";
import { request, API_URL } from "confunc";
import genHeader from "@/components/genHeader.vue";

export default defineComponent({
    data() {
        return {
            userData: { name: "", password: "" },
            haveUser: false
        };
    },
    setup() {
        const store = Store_();
        return { store };
    },
    computed: {
        ...mapState(Store_, {
            color: state => state.color,
            content: state => state.content
        })
    },
    methods: {
        login() {
            console.log("login");
        }
    },
    components: {
        genHeader
    },
    watch: {
        "userData.name": {
            handler(nVal, oVal) {
                if (nVal && nVal !== oVal)
                    request(API_URL, "user", { name: this.userData.name, type: "query" })
                        .success(() => this.haveUser = true);
                else this.haveUser = false;
            },
            immediate: true
        }
    }
});
</script>

<template>

    <genHeader>

        <form class="login" :style="{ backgroundColor: color.backL, color: color.font }" @submit.prevent="login">

            <div class="login-title">

                <h1>{{ store.format(content?.login.title) }}</h1>

            </div>

            <div class="login-group">

                <input type="text" v-model="userData.name" :placeholder="store.format(content?.login.username)" />

                <transition name="fade" mode="out-in">

                    <input v-if="haveUser" />

                </transition>

            </div>

            <div class="login-submit">

                <button type="submit" :disabled="!userData.name" :style="{ color: color.font, border: `1px solid ${color.border}` }">{{ store.format(content?.login.submit) }}</button>

            </div>

        </form>

    </genHeader>

</template>

<style lang="sass">
@import "@/assets/global"

.login
    position: absolute
    top: 35%
    left: 50%
    transform: translate(-50%, -50%)
    max-width: 360px
    width: 50%
    min-width: 300px
    min-height: 25%
    border-radius: 10px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 20px 40px

    &-title
        text-align: center
        flex: 1

    &-group
        flex: 1
        display: flex
        flex-direction: column
        align-items: center
        width: 100%

        input[type="text"]
            width: 100%
            outline: none
            padding: 10px
            border-radius: 5px
            display: block
            box-sizing: border-box
            border: 1px solid #eee

            &:focus
                border-color: #618eff

    &-submit
        flex: 1
        width: 100%
        display: flex
        justify-content: center
        align-items: center

        button
            width: 100%
            padding: 10px
            border-radius: 5px
            background-color: #52a3ff
            transition: color 0.3s, background-color 0.3s
            font-weight: bold

            &:disabled
                background-color: #eee
                cursor: not-allowed

            &:hover:not(:disabled)
                background-color: #3c86ff

</style>
