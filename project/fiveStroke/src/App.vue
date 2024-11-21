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
 * @file App.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/11/13 14:00:45
 * @description
 * */
import { defineComponent } from "vue";
import router from "@/router/router";

onload = () => {
    router.push("/");
};

export default defineComponent({
    name: "App",
    data() {
        return {
            screen: {
                w: `${window.innerWidth}px`,
                h: `${window.innerHeight}px`
            }
        };
    },
    methods: {
        updateSize() {
            this.screen.w = `${window.innerWidth}px`;
            this.screen.h = `${window.innerHeight + window.scrollY}px`;
        }
    },
    mounted() {
        this.updateSize();
        window.addEventListener("resize", this.updateSize);
    },
});
</script>

<template>
    <div class="root" :style="{ width: screen.w, height: screen.h }">
        <router-view></router-view>
    </div>
</template>

<style lang="sass"></style>
