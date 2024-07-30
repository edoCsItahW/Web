<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { request } from "../../../../jsPackage/src/comFunc";
import { Store_ } from "@/stores";
import { mapState } from "pinia";
import { appUrl, rsp } from "@/assets/common";

import pageHeader from "@/components/pageHeader.vue";
import note from "@/components/note.vue";
import QuesType from "@/components/modules/QuesType.vue";
import Content from "@/components/modules/Content.vue";
import MultiLine from "@/components/modules/MultiLine.vue";
import Option from "@/components/modules/Option.vue";
import Answer from "@/components/modules/Answer.vue";


interface Msg {
    type: string;
    data: any;
}

interface Ques {
    [key: string]: {[key: string]: string}[]
}


export default {
    data() {
        return {
            flag: true,
            type: 0,
        }
    },
    setup() {
        const store = Store_();
        return { store }
    },
    computed: {
        ...mapState(Store_, {
            user: "user",
            idSet: "idSet",
            exam: "exam"
        })
    },
    components: {
        note,
        pageHeader,
        QuesType,
        Content,
        MultiLine,
        Option,
        Answer
    },
    methods: {
        handleMsg(msg: Msg) {
            switch (msg.type) {
                case "beginExam":
                    this.flag = false;
                    break;
                case "typeChange":
                    this.type = msg.data;
                    break;
                default:
                    console.warn('exam.vue - Unknown message type: ', msg.type);
                    break;
            }
        },
        getModule(name: string) {
            return this.$options.components[name];
        },
    },
    watch: {
        type: {
            handler(val) {
                if (this.type)
                    request(appUrl, '', {data: this.user.TPs[this.idSet.TP].quesPool, randomType: this.type, type: "shuffle"})
                        .then((res: rsp.Std<any>) => {
                            if (res.code === 200)
                                this.store.updateQP(res.data);
                            else
                                console.error(`${res.code} - Failed to shuffle questions: ${res.msg}!`)
                        })
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<template>

    <pageHeader>

        <note @message-sent="handleMsg" v-if="flag" />

        <div class="main-body" v-else>

            <div class="ques-container">

                <div class="ques-blank" v-for="(frame, idx) in store.frameObj">

                    <component :is="getModule(frame.name)" :message="idx" v-if="frame.order !== null"/>

                </div>

            </div>

            <div class="btn-container">

                <input class="stdbtn add" type="button" value="submit" @click="exam.global.submit = true"/>

                <button class="stdbtn add" type="button" @click="store.nextQues">last question</button>

            </div>

        </div>

    </pageHeader>

</template>

<style>
.ques-container {
    margin-bottom: 20px;
}

.btn-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.add {
    background-color: #4b97ff;
    border: none;
    color: white;
}

.add:hover {
    background-color: #3c7ae4;
}

</style>