<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import router from "@/router/router";
import { Store_ } from "@/stores/stores";
import { color } from "@/assets/global";

onload = () => {
    Store_().init();
    router.push("/");
};

export default {
    setup() {
        const store = Store_();
        return { store, color };
    },
};
</script>

<template>
    
    <div class="root" :style="{ backgroundColor: color('back', true) }">
        
        <router-view></router-view>
        
    </div>
    
</template>

<style lang="sass">
@import "@/assets/global"

body
    margin: 0
p
    margin: 0
a
    text-decoration: none
    color: black

.root
    height: $TOP_HEIGHT
    overflow-y: hidden
    position: relative
</style>
