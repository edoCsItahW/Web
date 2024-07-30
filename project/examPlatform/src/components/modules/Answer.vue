<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { Field } from "@/assets/common";
import {Store_} from "@/stores";
import { mapState } from "pinia";


interface Msg {
    frame: Field,
    content: string,
    type: string,
    flag: {submit: boolean},
    addon: {dst: string, type: string, data: any}
}


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
            user: "user",
            window_: "window_",
            exam: "exam",
        }),
        nowFrame(): Field {
            return this.store.frameObj[this.message]
        }
    },
    watch: {
        "exam.global.submit": {
            handler(val: boolean) {
                if (val) {
                    this.store.exam.addonType = this.nowFrame.method;
                    this.exam.msg = {dst: this.nowFrame.method, type: 'correct', data: this.store.nowQues[this.nowFrame.name]};
                }

            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<template>

    <div class="ques-answer" v-if="exam.global.submit && nowFrame.method === 'both'">

        <p>Answer: {{ this.store.nowQues[this.nowFrame.name] }}</p>

    </div>

</template>

<style>
.ques-answer {
    padding: 10px;
    background-color: #092035;
    border-radius: 10px;
}
</style>