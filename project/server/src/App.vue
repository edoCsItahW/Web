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
 * @date 2024/09/29 21:06:25
 * @description
 * */
import { defineComponent } from "vue";
import router from "@/router/router";
import { Store_ } from "@/stores/stores";


onload = () => {
    router.push("/");
}

export default defineComponent({
    name: "App",
    data() {
        return {
            h: '100%',
            w: '100%'
        }
    },
    setup() {
        Store_().init();
    },
    mounted() {
        this.updateSize();
        window.addEventListener('resize', this.updateSize);
    },
    methods: {
        updateSize() {
            this.h = `${window.innerHeight}px`;
            this.w = `${window.innerWidth}px`;
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateSize);
    }
});
</script>

<template>
    
    <div class="root" :style="{height: h, width: w}">
        
        <router-view></router-view>
        
    </div>
    
</template>

<style lang="sass">
body, html
    height: 100%
    margin: 0
    
.root
    display: flex
    flex-direction: column
</style>