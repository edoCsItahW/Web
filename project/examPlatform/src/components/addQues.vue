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
import { request, sleep } from "../../../../jsPackage/src/comFunc";
import { appUrl, rsp, objToClass, CusType, field, stdType } from "@/assets/common";
import pageHeader from "@/components/pageHeader.vue";
import latex from "@/components/latex.vue";
import markdown from "@/components/markdown.vue";
import { reactive } from "vue";


export default {
    data() {
        return {
            nowType: 'choice',
            cusTypes: {} as CusType.cls,
            seccessFlag: false,
            target: null
        }
    },
    setup() {
        const store = Store_();
        return { store, stdType, reactive };
    },
    components: {
        pageHeader,
        latex,
        markdown,
    },
    methods: {
        selectType(event: any) {
            const type = document.getElementsByClassName("selected");

            if (type.length && type[0] !== event.target)
                type[0].classList.remove("selected");

            event.target.classList.add("selected");

            this.nowType = event.target.getAttribute("content");

        },
        getContent(data: CusType.cls[string]) {
            return {display: this.types[this.nowType].display, value: data.value.reduce((acc, item) => {
                acc[item.name] = item.input ? item.content : null;
                return acc
            }, {} as { [key: string]: any })};
        },
        submit() {
            // TODO: 添加关于用户输入的Answer内容不在其Option键中的提示
            request(appUrl, "addQues", {
                content: this.getContent(this.types[this.nowType]),
                uid: this.store.idSet.uid,
                tpId: this.store.idSet.TP,
                type: this.nowType
            })
                .then((res: rsp.Std<null>) => {
                    if (res.code === 200) {
                        this.store.updateUser();
                        this.clear();
                        this.seccessFlag = true;
                    }
                    else
                        console.error(`${res.code} - Failed to add question: ${res.msg}`);
                })
        },
        clear() {
            this.types[this.nowType].value.forEach(item => item.content = '')
        }
    },
    computed: {
        types(): CusType.cls {
            return {...this.stdType, ...this.cusTypes}
        }
    },
    watch: {
        "store.user.customType": {
            handler(val: CusType.cls | CusType.obj) {
                if (val) {
                    const keys = Object.keys(val);

                    if (keys.length > 0) {
                        if (val[keys[0]].value[0] instanceof field)
                            this.cusTypes = val;
                        else
                            this.cusTypes = objToClass(val as CusType.obj);  // @ts-ignore
                    }

                }
            },
            deep: true,
            immediate: true
        },
        seccessFlag: {
            handler(val: boolean) {
                if (val)
                    sleep(2000).then(() => { this.seccessFlag = false; })
            },
            immediate: true
        }
    }
}
</script>

<template>

    <pageHeader>

        <div class="main-body">

            <h1>Add a question</h1>

            <p class="std-text" style="margin: 20px 0;">To add a question, please complete the following fields.</p>

            <div class="form-container" style="position: relative; padding-top: 20px;">

                <Transition>

<!--                    <div :class="{'confirm-info': true, 'icon-show': seccessFlag}" :style="{'opacity': seccessFlag ? 1 : 0}">-->
                    <div class="confirm-info" v-if="seccessFlag">

                        <svg viewBox="0 0 1024 1024" width="50" height="50">
                            <path d="M512 0C228.430769 0 0 228.430769 0 512s228.430769 512 512 512 512-228.430769 512-512S795.569231 0 512 0z m256 413.538462l-271.753846 271.753846c-7.876923 7.876923-19.692308 11.815385-31.507692 11.815384-11.815385 0-23.630769-3.938462-31.507693-11.815384l-169.353846-169.353846c-15.753846-15.753846-15.753846-47.261538 0-63.015385 15.753846-15.753846 47.261538-15.753846 63.015385 0l137.846154 137.846154 240.246153-240.246154c15.753846-15.753846 47.261538-15.753846 63.015385 0 19.692308 15.753846 19.692308 47.261538 0 63.015385z" fill="#94C86C">
                            </path>
                        </svg>

                    </div>

                </Transition>

                <form style="position: relative;" @submit.prevent="submit">

                    <div class="preview gapbottom-20">

                        <latex v-if="types[nowType].display === 'latex'" :latex="target?.value" />
                        <markdown v-else-if="types[nowType].display ==='markdown'" :markdown="target?.value" />
                        <span v-else>{{ target?.value }}</span>

                    </div>

                    <div class="field-group">

                        <label class="field">Question Type</label>
                        <div class="ques-type field-widget">

                            <ul class="ques-type-list">

                                <li class="ques-type-item" v-for="key in Object.keys(types)">
                                    <a :class="Object.keys(types).indexOf(key) ? '' : 'selected'"
                                       href="javascript:void(0)" :content="key" @click="selectType">{{ key }}</a>
                                </li>

                                <li class="ques-type-item" style="padding-right: 0;">
                                    <a href="javascript:void(0)" @click="selectType">
                                        <router-link to="/customType">Other</router-link>
                                    </a>
                                </li>

                            </ul>

                        </div>

                    </div>

                    <div class="field-group">

                        <label class="field">Display Method</label>
                        <select class="input-text-field field-widget extent" v-model="types[nowType].display" required>
                            <option value="latex">Latex</option>
                            <option value="text">Text</option>
                            <option value="markdown">Markdown</option>
                        </select>

                    </div>

                    <div class="input-container" v-for="arr in types[nowType].value.map(item => reactive(item))">

                        <div class="field-group" v-for="i in arr.num" v-if="arr.input && arr.order">

                            <label class="field" v-if="arr.num <= 1">{{ arr.name }}</label>  <!-- 单项字段 -->

                            <label class="field" v-else>{{ arr.name }}{{ arr.map[i - 1] }}</label>  <!-- 多项字段 -->

                            <input class="input-text-field field-widget extent" v-if="arr.num <= 1" :type="arr.inpType"
                                   :placeholder="`Please enter ${arr.name}`" v-model="arr.content" @focus="target = $event.target" required>

                            <input v-else class="input-text-field field-widget extent" :type="arr.inpType"
                                   :placeholder="`Please enter ${arr.name}${arr.map[i - 1]}`"
                                   v-model="arr.content[arr.map[i - 1]]" @focus="target = $event.target" required>

                            <div class="add-btn" v-if="arr.add && i === arr.num" @click="arr.num++">

                                <svg viewBox="0 0 24 24" width="24" height="24">
                                    <title>Add</title>
                                    <line x1="12" y1="5" x2="12" y2="19" stroke="black"></line>
                                    <line x1="5" y1="12" x2="19" y2="12" stroke="black"></line>
                                </svg>

                            </div>

                        </div>

                    </div>

                    <div class="field-group">

                        <div class="field-widget input-submit-container">

                            <input class="input-submit-field" type="submit" value="Add Question">

                            <router-link to="/scanQues" class="input-submit-field">End and Scan</router-link>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    </pageHeader>

</template>

<style>
.selected {
    color: #18a3fa !important;
    display: inline-block;
    cursor: pointer;
    border-bottom: 3px solid #18a3fa !important;
}

.input-submit-container {
    width: 70%;
    display: flex;
    justify-content: space-around;
}

li[class^="ques-type-item"] a {
    color: #cdcdcd;
    font-size: 18px;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

li[class^="ques-type-item"] a:hover {
    color: #ededed;
    border-bottom: 3px solid #ededed;
}

.preview {
    background-color: #323232;
    padding: 10px;
    border-radius: 8px;
    min-height: 50px;
    overflow: auto;
    display: flex;
    align-items: center;
}

.ques-type {
    text-align: left;
}

.ques-type-list {
    list-style: none;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    padding-inline-start: 0;
}

.ques-type-item {
    float: left;
    position: relative;
    padding-right: 27px;
    color: #cdcdcd;
    border-bottom: 1px solid #d3d3d3;
}

.input-container {
    flex-direction: column;
}

.std-text {
    font-size: 1.3em;
}

.add-btn {
    background-color: white;
    border-radius: 8px;
    position: absolute;
    right: 0;
    transition: all 0.2s ease-in-out;
}

.add-btn:hover {
    background-color: #bcbcbc;
    transform: scale(0.9);
}

.extent {
    margin-left: 22%;
    width: 70%;
}

.confirm-info {
    position: absolute;
    right: 8%;
    top: 5%;
    z-index: 1;
    /*transition: opacity 1s;
    opacity: 1;*/
}

/* .confirm-info:not(.icon-show) {
    opacity: 0;
} */

.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>