<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import {Field} from "@/assets/common";
import {Store_} from "@/stores";
import {mapState} from "pinia";
import latex from "@/components/latex.vue";
import markdown from "@/components/markdown.vue";


interface Msg {
    frame: Field,
    content: string,
    type: string,
    flag: { submit: boolean },
    addon: { dst: string, type: string, data: any }
}


export default {
    data() {
        return {
            choiceAble: true
        }
    },
    setup() {
        const store = Store_();
        return {store}
    },
    props: {
        message: Number
    },
    components: {
        markdown,
        latex
    },
    methods: {
        select(event, key: string) {
            if (!this.choiceAble) return;

            const selected = document.getElementsByClassName("ques-selected");

            let target = event.target as HTMLElement;
            while (!target.classList.contains("ques-option-content"))
                target = target.parentElement as HTMLElement;

            if (selected.length > 0) {
                if (selected[0] !== target) {
                    if (!this.nowFrame.add)
                        selected[0].classList.remove("ques-selected");

                    target.classList.add("ques-selected");
                } else
                    target.classList.remove("ques-selected");
            } else
                target.classList.add("ques-selected");
        },
        correct(answer: string | { [key: number]: string }) {
            if (!this.choiceAble) return;

            if (typeof answer === "string")
                answer = [answer];

            else if (!Array.isArray(answer))
                answer = Object.values(answer);

            const options = Array.from(document.getElementsByClassName("ques-option-content"));
            const chosen = Array.from(document.getElementsByClassName("ques-selected"))

            const flag = (answer as string[]).length === chosen.length
                    ? (answer as string[]).every((item, idx) => item === chosen[idx].getAttribute("content"))
                    : false;

            options.forEach(ele => {
                if ((answer as string[]).includes(ele.getAttribute("content")))
                    ele.classList.add("ques-right");
                else if (!flag) ele.classList.add("ques-wrong");

                ele.classList.remove("ques-selected");
            })

            this.log(chosen.reduce((acc, cur) => {
                const key = cur.getAttribute("content");
                acc[key] = this.store.nowQues[this.nowFrame.name][key]
                return acc
            }, {} as { [key: string]: string }), (answer as string[]).reduce((acc, cur) => {
                acc[cur] = this.store.nowQues[this.nowFrame.name][cur];
                return acc
            }, {} as { [key: string]: string }), flag ? 1 : -1)

            this.choiceAble = false;
        },
        clear() {
            const options = document.getElementsByClassName("ques-option-content");

            for (let ele of options)
                ele.classList.remove("ques-selected", "ques-right", "ques-wrong");

            this.choiceAble = true;
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
    computed: {
        ...mapState(Store_, {
            exam: "exam"
        }),
        nowFrame(): Field {
            return this.store.frameObj[this.message]
        }
    },
    watch: {
        'exam.msg': {
            handler(val: { dst: string, type: string, data: object }) {
                if (val && val.dst === 'option') {
                    switch (val.type) {
                        case 'correct':
                            this.correct(val.data);
                            this.store.exam.global.submit = false;
                            break;

                        case 'next':
                            this.clear();
                            this.exam.msg = null;
                            break;

                        default:
                            console.error('Option.vue - Unknown message type', val.type);
                            break;
                    }
                }
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<template>
    <div class="ques-option">

        <div class="ques-option-content" v-for="(option, key) in this.store.nowQues[this.nowFrame.name]"
             @click="select($event, key as any)" :content="key">

            <b>{{ key }}</b>. <span v-if="store.nowQP[exam.global.ques].display === 'text'">{{ option }}</span>
            <latex :latex="option" v-else-if="store.nowQP[exam.global.ques].display === 'latex'" />
            <markdown :markdown="option" v-else />

        </div>

    </div>
</template>

<style>
.ques-option {
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    border-radius: 10px;
    background-color: #525288;
    margin-bottom: 10px;
}

.ques-option-content {
    font-size: 18px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 5px 5px 5px 10px;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.ques-option-content:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}

.ques-selected {
    background-color: #18a3fa;
}

.ques-right {
    background-color: #39ef9a;
}

.ques-wrong {
    background-color: #f75a5a;
}

</style>