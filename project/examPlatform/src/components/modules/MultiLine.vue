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
import { Store_ } from "@/stores";
import {mapState} from "pinia";


export default {
    data() {
        return {
            answer: '',
            flag: 0
        }
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
            exam: "exam"
        })
    },
    methods: {
        correct(answer: string) {
            if (this.answer === answer)
                this.flag = 1;
            else
                this.flag = -1;

            this.log(this.answer, answer, this.flag);

        },
        clear() {
            this.answer = '';
            this.flag = 0;
        },
        log(input: string | object, answer: string | object, right: boolean) {
            this.store.exam.log.push({
                input: input,
                answer: answer,
                right: right,
                type: this.store.nowType,
                content: this.store.nowQues['Content'],
                id: this.exam.global.ques
            })
        }
    },
    watch: {
        'exam.msg': {
            handler(val: {dst: string, type: string, data: object}) {
                if (val && ['text', 'both'].includes(val.dst)) {
                    switch (val.type) {
                        case 'correct':
                            if (val.dst === 'text') {
                                this.correct(val.data);
                                this.store.exam.global.submit = false;
                            }
                            break;
                        case 'next':
                            this.clear();
                            this.exam.msg = null;
                            break;
                        default:
                            console.error('MultiLine.vue - Unknown message type', val.type);
                            break;
                    }
                }
            }
        }
    }
}
</script>

<template>
    <textarea class="multi-line" :class="flag === 1 ? 'text-right' : flag === -1 ? 'text-wrong' : ''" placeholder="Enter your answer here..." v-model="answer"></textarea>
</template>

<style>
.multi-line {
    width: 98%;
    height: 100%;
    min-height: 100px;
    resize: none;
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
}

.text-right {
    padding: 6px;
    border: 4px solid #72ff4f;
}

.text-wrong {
    padding: 6px;
    border: 4px solid #ff4f4f;
}

</style>