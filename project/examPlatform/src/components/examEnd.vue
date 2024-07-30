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
import {mapState} from "pinia";
import pageHeader from "@/components/pageHeader.vue";
import router from "@/router";
import latex from "@/components/latex.vue";
import markdown from "@/components/markdown.vue";


interface Log {
    input: string | string[],
    answer: string | string[],
    type: string,
    right: number,
    content: string
}


export default {
    data() {
        return {}
    },
    setup() {
        const store = Store_();
        return { store, router }
    },
    computed: {
        ...mapState(Store_, {
            exam: 'exam'
        }),
        typeNum() {
            return this.exam.log.reduce((acc: {[key: string]: number}, cur: Log) => {
                if (!acc[cur.type])
                    acc[cur.type] = 0
                acc[cur.type] += 1
                return acc}, {} as {[key: string]: number})
        },
        openEndedNum() {
            return this.exam.log.filter((item: Log) => item.right === 0).length;
        },
        rightNum() {
            return this.exam.log.filter((item: Log) => item.right === 1).length;
        }
    },
    components: {
        markdown,
        pageHeader,
        latex
    },
    props: {
        scroll: Boolean
    }
}
</script>

<template>

    <page-header>

        <div class="main-body" :style="{ 'overflow-y': store.window_.scroll ? 'auto' : 'hidden'}">

            <h1>Examination End</h1>

            <p class="gapbottom-20 stdText-20">Congratulations! You have completed the examination.</p>

            <div class="form-container">

                <h2>Topic composition:</h2>

                <ul class="stdlist">

                    <li class="rightshift-10 gapbottom-10" v-for="(num, type) in typeNum"><b>{{ type }}</b>: {{ num }}</li>

                </ul>

                <p class="gapbottom-20">Out of the <span class="block">{{ exam.log.length - openEndedNum }}</span> graded questions, you answered <span class="block">{{ rightNum }}</span> correctly</p>

                <hr>

                <div class="exam-result gapbottom-20">

                    <div v-for="(res, idx) in exam.log">

                        <h3>{{ res.type }}</h3>

                        <div class="res-ques rightshift-10" :class="res.right >= 1 ? 'res-right' : res.right === 0 ? 'res-open-ended' : 'res-wrong'">


                            <p class="gapbottom-10 rowplace vcenter"><b>{{ idx + 1 }}</b>.
                                <latex v-if="store.quesPool[res.type][res.id].display === 'latex'" :latex="res.content"/>
                                <markdown v-else-if="store.quesPool[res.type][res.id].display === 'markdown'" :markdown="res.content"/>
                                <span v-else>{{ res.content }}</span>
                            </p>

                            <div class="rightshift-20" v-if="typeof res.input === 'string'">

                                Answer: {{ res.answer }}, Your answer:
                                <latex v-if="store.quesPool[res.type][res.id].display === 'latex'" :latex="res.input"/>
                                <markdown :markdown="res.input" v-else-if="store.quesPool[res.type][res.id].display === 'markdown'" />
                                <span v-else>{{ res.input }}</span>

                            </div>

                            <div class="rightshift-20" v-else>

                                <div class="res-detail gapbottom-10" v-for="(type, title) in {Answer: res.answer, 'Your answer': res.input}">

                                    <p><b>{{ title }}</b>:</p>

                                    <p class="rightshift-10 rowplace vcenter" v-for="(content, key) in type">
                                        <b>{{ key }}</b>.
                                        <latex v-if="store.quesPool[res.type][res.id].display === 'latex'" :latex="content"/>
                                        <markdown :markdown="content" v-else-if="store.quesPool[res.type][res.id].display === 'markdown'" />
                                        <span v-else>{{ content }}</span>
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="confirm-btn">

                    <button class="stdbtn" style="margin-bottom: 0;" @click="store.exam.log = []; router.push('/scanQues')">Confirm</button>

                </div>

            </div>

        </div>

    </page-header>

</template>

<style>

span[class^="block"] {
    padding: 2px;
    background-color: rgba(216, 216, 216, 0.71);
    border-radius: 4px;
}

.res-ques {
    padding: 10px;
    border-radius: 8px;
}

.exam-result {
    padding: 0 10px 10px 10px;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
}

.res-right {
    border: 2px solid #00b300;
    background-color: rgba(0, 179, 0, 0.25);
}

.res-wrong {
    border: 2px solid #ff0000;
    background-color: rgba(255, 0, 0, 0.25);
}

.res-open-ended {
    border: 2px solid #8a8a8a;
    background-color: rgba(138, 138, 138, 0.27);
}

.confirm-btn {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>