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
import pageHeader from "@/components/pageHeader.vue";
import { request } from "../../../../jsPackage/src/comFunc";
import {appUrl, rsp} from "@/assets/common";
import latex from "@/components/latex.vue";
import {mapState} from "pinia";
import markdown from "@/components/markdown.vue";


export default {
    data() {
        return {
            tmpFlag: false
        }
    },
    setup() {
        const store = Store_();
        return { store };
    },
    computed: {
        ...mapState(Store_, {
            exam: "exam"
        }),
        getQP() {
            const qp = this.store.user.TPs[this.store.idSet.TP].quesPool

            if (Object.keys(qp).length > 0)
                return qp
            else
                return {}
        }
    },
    components: {
        markdown,
        pageHeader,
        latex
    },
    methods: {
        deleteQues(type: string, id: number) {
            request(appUrl, "delQues", { ...this.store.idSet, type, id })
                .then((res: rsp.Std<any>) => {
                    if (res.code === 200)
                        this.store.updateUser();
                    else
                        console.error(`${res.code} - Failed to delete question: ${res.msg}!`);
                })
        },
        state(...args: any) {
            console.log(...args);
            return args[0];
        }
    }
}
</script>

<template>

    <pageHeader>

        <div class="main-body">

            <div class="ques-list" v-if="Object.keys(getQP).length > 0">

                <div class="ques-item" v-for="(ques, type) in getQP">

                    <h1 class="ques-type-title">{{ type }}</h1>

                    <div class="ques-item-content" v-for="(question, idx) in ques">

                        <div class="ques-item-text">

                            <b style="font-size: 18px;">{{ question.id + 1 }}</b>.
                            <latex :latex="question.value.Content" v-if="store.quesPool[type][idx].display === 'latex'" />
                            <markdown :markdown="question.value.Content" v-else-if="store.quesPool[type][idx].display ==='markdown'" />
                            <span v-else>{{ question.value.Content }}</span>

                        </div>

                        <div class="stdbtn delete-btn" @click="deleteQues(type, question.id)">

                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <title>Delete</title>
                                <line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2"></line>
                                <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2"></line>
                            </svg>

                        </div>

                    </div>

                </div>

                <div style="min-width: 30%; display: flex; justify-content: space-around;">

                    <router-link to="/addQues" class="input-submit-field">Add Question</router-link>

                    <router-link to="/exam" class="input-submit-field">Begin Exam</router-link>

                </div>

            </div>

            <router-link to="/addQues" class="window-none" v-else @mouseenter="tmpFlag = true;" @mouseleave="tmpFlag = false">

                <div class="icon-none"></div>
                <span id="error-msg" v-show="tmpFlag">You have not added any questions yet, And you can push this window to add a question.</span>

            </router-link>

        </div>

    </pageHeader>

</template>

<style>
.window-none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transition: all 0.3s ease-in-out;
    flex-direction: column;
    text-decoration: none;
}

.window-none:hover {
    filter: grayscale(1.1);
    background-color: #777777;
}

.icon-none {
    content: url('/src/assets/add.svg');
    display: inline-block;
    width: 128px;
    height: 128px;
    margin-bottom: 20px;
}

#error-msg {
    color: white;
}

.ques-item-text {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.ques-list {
    display: flex;
    flex-direction: column;
}

.ques-item {
    background-color: #344c6e;
    border-radius: 10px;
}

.ques-type-title {
    color: honeydew;
}

.ques-item-content {
    position: relative;
    padding:0 20px;
    margin-bottom: 10px;
    background-color: #4980ca;
    line-height: 3;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.delete-btn {
    position: absolute;
    right: 10px;
    top: 30%;
    background-color: rgba(255, 255, 255, 0.1);
    max-width: 5px;
    max-height: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    display: flex;
    padding: 8px 11px;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.delete-btn:hover {
    background-color: rgba(247, 90, 90, 0.7);
    transform: scale(1.1);
}

</style>