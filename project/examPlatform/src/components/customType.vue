<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import {$, sleep, request} from "../../../../jsPackage/src/comFunc";
import {appUrl, module, rsp} from "@/assets/common"
import {Store_} from "@/stores";

import router from "@/router";
import draggable from "vuedraggable";
import pageHeader from "@/components/pageHeader.vue";


export default {
    computed: {},
    data() {
        return {
            moduleList: module.templates,
            chosenModule: [],
            attr: {content: "", flag: false, style: "", id: null, name: ""},
            form: module.form,
            name: null,
            popup: false
        }
    },
    components: {
        pageHeader,
        draggable
    },
    setup() {
        const store = Store_();
        return {store}
    },
    methods: {
        clone(element: any) {
            return JSON.parse(JSON.stringify(element));
        },
        addModule(elem: CustomEvent) {
        },
        setAttr(elem: any) {
            this.attr.id = elem.id;
            this.attr.name = elem.name;
            this.attr.flag = true;
        },
        clearAll() {
            this.chosenModule = [];
            this.attr.flag = false;
            this.attr.id = null;
        },
        submit() {
            request(appUrl, "customType", {name: this.name, modules: this.form, uid: this.store.idSet.uid}, "POST")
                    .then((res: rsp.Std<null>) => {
                        if (res.code === 200) {
                            this.store.updateUser();
                            router.push("/addQues");
                        }
                        else
                            console.error(`${res.code} - Create custom type failed: ${res.msg}!`);
                    })
        },
        save() {
            for (let idx in this.chosenModule) {
                let elem = this.chosenModule[idx];

                this.form.value[elem.id].order = parseInt(idx);
            }

            if (this.chosenModule.length <= 0)
                return alert("Please select at least one module to save!")

            if (this.name) {
                this.submit();
                this.popup = false;
                this.store.updateUser()
            }
            else this.popup = true;
        }
    },
    watch: {
        attr: {
            handler(newVal: any) {
                const table = $.id("attr") as HTMLDivElement;
                const tableSon = $.id("attr-son") as HTMLDivElement;
                const control = $.id("control") as HTMLDivElement;

                if (table && control) {
                    if (newVal.flag) {
                        table.style.flex = "1";
                        control.style.transform = "rotate(180deg)";
                        sleep(500).then(() => tableSon.style.display = "block")
                    } else {
                        table.style.flex = "0";
                        tableSon.style.display = "none";
                        control.style.transform = "rotate(0deg)";
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

    <pageHeader>

        <form class="name-input-popup" v-if="popup" @submit.prevent="save">

            <div class="input-block">

                <label for="name">Name of Custom Type: </label>
                <input type="text" id="name" placeholder="Name of Custom Type" v-model="name" required/>

            </div>

            <input class="confirm-block" type="submit" style="color: #000" value="Confirm">

        </form>

        <div class="operation-table">

            <div class="module-menu">

                <draggable
                        :list="moduleList"
                        :item-key="'id'"
                        chosen-class="chosen"
                        animation=100
                        :group="{name: 'group', pull: 'clone', put: false}"
                        :clone="clone"
                        :sort="false"
                >
                    <template #item="{ element }">
                        <div class="module-item">
                            <p style="cursor: pointer; padding-left: 10px;">{{ element.name }}</p>
                        </div>
                    </template>

                </draggable>

            </div>

            <div class="preview-table">

                <draggable
                        :list="chosenModule"
                        :item-key="'idx'"
                        :group="{name: 'module', put: true}"
                        @add="addModule"
                >

                    <template #item="{ element }">
                        <div class="module-item" @click="setAttr(element)">
                            <div v-html="element.content" :style="element.style"></div>
                        </div>
                    </template>

                </draggable>

                <i class="attr-handle" id="control" @click="attr.flag = !attr.flag">

                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">

                        <title>Control</title>
                        <line x1="18" y1="0" x2="6" y2="12" stroke-width="2" stroke="black"></line>
                        <line x1="18" y1="24" x2="6" y2="12" stroke-width="2" stroke="black"></line>

                    </svg>

                </i>

                <div class="control-group">

                    <a class="input-submit-field" href="javascript:void(0)" @click="clearAll">
                        <span>Clear All</span>
                    </a>


                    <input class="input-submit-field" type="submit" value="Save" @click="save"/>

                </div>

            </div>

            <div class="attr-table" id="attr">

                <div class="feild-container" id="attr-son">

                    <div class="common-part" v-if="typeof attr.id === 'number'">

                        <h3>{{ attr.name }}</h3>

                        <div class="type-field-group">

                            <label for="font-size">Font Size: </label>
                            <input id="font-size" type="number" v-model="form.value[attr.id].fontSize">

                        </div>

                    </div>

                    <div v-if="attr.id === 0">
                    </div>
                    <div class="form-wrapper" v-else-if="attr.id === 1">

                        <div class="type-field-group">

                            <label for="option-num">Number of Options(0 means unlimited): </label>
                            <input id="option-num" type="number" v-model="form.value[attr.id].num">

                        </div>

                        <div class="type-field-group">

                            <label for="add-flag">Will add: </label>
                            <input id="add-flag" type="checkbox" v-model="form.value[attr.id].add">

                        </div>

                        <div class="type-field-group">

                            <label for="option-type">Option Type: </label>
                            <select id="option-type" v-model="form.value[attr.id].type">
                                <option value="letter">Letter</option>
                                <option value="number">Number</option>
                                <option value="boolean">True/False</option>
                            </select>

                        </div>

                    </div>
                    <div v-else-if="attr.id === 4">

                        <div class="type-field-group">

                            <label for="option-num">Number of Options(0 means unlimited): </label>
                            <input id="option-num" type="number" v-model="form.value[attr.id].num">

                        </div>

                        <div class="type-field-group">

                            <label for="add-flag">Will add: </label>
                            <input id="add-flag" type="checkbox" v-model="form.value[attr.id].add">

                        </div>

                        <div class="type-field-group">

                            <label for="method">Correction Method: </label>
                            <select id="method" v-model="form.value[attr.id].method">
                                <option value="option">Correcting in Option</option>
                                <option value="text">Correcting in Text</option>
                                <option value="both">Do not Correcting</option>
                            </select>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </pageHeader>

</template>

<style>
.chosen {
    background-color: rgb(98, 171, 253) !important;
}

.module-menu > div {
    width: 100%;
}

.preview-table > div {
    width: 100%;
}

.module-item {
    width: 98%;
    min-height: 40px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 2px dashed #000000;
    margin: 2px 0;
    transition: all 0.2s ease-in-out;
}

.module-item:hover {
    background-color: #52a3ff;
}

.operation-table {
    display: flex;
    flex-direction: row;
    height: 93vh;
}

.preview-table {
    display: flex;
    flex: 3;
    background-color: #90c9ac;
    border-radius: 8px;
    margin: 5px 3px 0 3px;
    position: relative;
}

.module-menu {
    display: flex;
    flex: 1;
    background-color: #c9c897;
    border-radius: 8px;
    margin: 5px 3px 0 0;
}

.attr-handle {
    position: absolute;
    right: 0;
    bottom: 50%;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    padding: 2px;
}

.attr-handle:hover {
    cursor: pointer;
    background-color: #b2f6d2;
    transform: scale(0.8);
}

.control-group {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: end;
    justify-content: space-around;
}

.attr-table {
    display: flex;
    flex: 0;
    background-color: #cf8e6d;
    margin: 5px 0 0 3px;
    border-radius: 8px;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
}

.name-input-popup {
    position: absolute;
    top: 50%; /* 从顶部开始，偏移50%的父元素高度 */
    left: 50%; /* 从左侧开始，偏移50%的父元素宽度 */
    transform: translate(-50%, -50%); /* 相对于元素自身的中心点进行移动，以使其完全居中 */
    width: 40%;
    height: 10%;
    border-radius: 5px;
    background-color: #ffffff;
    z-index: 1;
    border: 2px solid #707070;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-block {
    width: 100%;
    display: flex;
    flex: 3;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.input-block > label {
    font-size: 18px;
}

.input-block > input {
    width: 50%;
}

.confirm-block {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    font-weight: bold;
    background-color: #52a3ff;
    border: none;
}

.form-wrapper {
    display: flex;
    flex-direction: column;
}

.type-field-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-left: 10px;
}

</style>
