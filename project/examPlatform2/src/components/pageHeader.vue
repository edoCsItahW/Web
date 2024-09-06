<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script>
import { Store_ } from "@/stores/stores";
import { color } from "@/assets/global";

export default {
    setup() {
        const store = Store_();
        return { store, color }
    }
}
</script>

<template>

    <header class="ph-header" :style="{ color: color('font', true) }">

        {{ store.content?.pageHeader.title[store.lang] }}

    </header>

    <slot>


    </slot>

    <footer class="ph-footer" :style="{
        backgroundColor: color('back'),
        color: color('font')
    }">

        12

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

</style>