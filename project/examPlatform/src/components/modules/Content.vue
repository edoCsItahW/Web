<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { Store_ } from "@/stores";
import { mapState } from "pinia";
import { field } from "@/assets/common";
import latex from "@/components/latex.vue";
import markdown from "@/components/markdown.vue";


export default {
    data() {
        return {}
    },
    setup() {
        const store = Store_();
        return { store }
    },
    props: {
        message: Number
    },
    computed: {
        ...mapState(Store_, {
           exam: 'exam'
        }),
        nowFrame(): field {
           return this.store.frameObj[this.message]
        },
        fontSize() {
            return this.nowFrame.fontSize || '20px'
        }
    },
    components: {
        latex,
        markdown
    }
}
</script>

<template>
    <div class="ques-content" :style="{ 'font-size': fontSize }">

        <b>{{ exam.global.ques + 1 }}</b>. <span v-if="store.nowQP[exam.global.ques].display === 'text'">{{ store.nowQues[nowFrame.name] }}</span>
        <latex :latex="store.nowQues[nowFrame.name]" v-else-if="store.nowQP[exam.global.ques].display === 'latex'" />
        <markdown :markdown="store.nowQues[nowFrame.name]" v-else />

    </div>
</template>

<style>
.ques-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #b0a4e3;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
}
</style>