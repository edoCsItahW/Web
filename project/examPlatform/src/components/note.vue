<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
export default {
    data() {
        return {
            types: ['Normal', 'Random-Question', 'Random-Option', 'Random-All'],
            type: 0
        }
    },
    methods: {
        selectType(event: any) {
            const type = document.getElementsByClassName("selected");

            if (type.length && type[0] !== event.target)
                type[0].classList.remove("selected");

            event.target.classList.add("selected");

            this.type = parseInt(event.target.getAttribute("content"));
        },
        beginExam() {
            this.$emit("message-sent", {type: "beginExam", data: false})
        }
    },
    watch: {
        type: {
            handler(val: number) {
                this.$emit("message-sent", {type: "typeChange", data: val})
            },
            immediate: true
        }
    }
}
</script>

<template>
    <div class="main-body">

        <h1>Matters Needing Attention</h1>

        <p class="std-text right-shift gapbottom-20">1. For each question, you need to click the submit answer button to submit
            the answer,
            and then click the 'next question' button to continue answering the question.</p>

        <p class="std-text right-shift gapbottom-20">2. For the order of answering questions, it depends on you.
            You can use the buttons below to control the answering mode and order.</p>

        <p class="std-text right-shift gapbottom-20">3. If you want to start the exam,
            you can press the "Start Exam" button at any time to start answering questions.</p>

        <p class="std-text right-shift gapbottom-20">4. Finally, congratulate you have a smooth exam beforehand.</p>

        <div class="form-container" style="padding-top: 20px; display: flex; justify-content: center;">

            <ul class="ques-type-list">

                <li class="ques-type-item" v-for="(tp, idx) in types">
                    <a :class="idx === 0 ? 'selected' : ''" href="javascript:void(0)" :content="idx" @click="selectType">{{ tp }}</a>
                </li>

            </ul>

        </div>

        <div class="center">

            <a class="input-submit-field" href="javascript:void(0)" @click="beginExam">

                <span>Begin Exam</span>

            </a>

        </div>

    </div>
</template>

<style>
.right-shift {
    margin-left: 30px;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
}

</style>