<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import router from "@/router/router"
import { Store_ } from "@/stores/stores";


onload = () => {
    Store_().init();
    router.push("/");
}

export default {}
</script>

<template>

    <div class="root">

        <router-view>

        </router-view>

    </div>

</template>

<style lang="sass">
@import "@/assets/global"

body
    margin: 0
p
    margin: 0

.root
    height: $TOP_HEIGHT
    overflow-y: hidden
    position: relative

</style>
