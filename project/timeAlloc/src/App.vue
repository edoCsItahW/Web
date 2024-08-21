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


onload = () => {
    localStorage.setItem("uid", "0");
    router.push("/");
}
</script>

<template>
    <div class="root">

        <router-view></router-view>

    </div>
</template>

<style lang="sass">
@import "@/assets/globals"

.root
    width: 100%
    height: 100vh
    overflow-x: hidden


</style>
