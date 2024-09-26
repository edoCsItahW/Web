<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import * as marked from 'marked'
import { ref } from "vue";


export default {
    data() {
        return {}
    },
    props: {
        markdown: {
            type: String,
            required: true
        }
    },
    setup() {
        const html = ref('');
        return { html }
    },
    watch: {
        markdown: {
            handler(val) {
                this.html = marked.parse(val);
            },
            immediate: true
        }
    }
}
</script>

<template>
    <div v-html="html"></div>
</template>

<style>

</style>