<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { defineComponent } from "vue";
import pageHeader from "@/components/pageHeader.vue";
import { request } from "../../../../jsPackage/src/comFunc";
import { appUrl, rsp } from "@/assets/common";
import router from "@/router";
import uploader from 'vue-simple-uploader';  // @ts-ignore
import { Store_ } from "@/stores"


export default defineComponent({
    data() {
        return {
            formData: {
                name: "",
                desc: "",
                duration: 0,
            }
        }
    },
    components: {
        pageHeader,
        uploader: uploader.Uploader,
        uploaderBtn: uploader.UploaderBtn,
        uploaderDrop: uploader.UploaderDrop,
        uploaderUnsupport: uploader.UploaderUnsupport,
        uploaderList: uploader.UploaderList,
    },
    setup() {
        const store = Store_();
        return { store }
    },
    methods: {
        submit() {
            request(appUrl, "createTP", {...this.formData, uid: this.store.idSet.uid})
                .then((res: rsp.Std<rsp.TP>) => {
                    if (res.code !== 200) console.error(`${res.code} - Failed to create test paper: ${res.msg}!`)
                })
                this.store.updateUser()
                router.push("/")
        },
        valueValid(event: any) {
            const minute = event.target.value

            if (minute > 180) {
                const res = confirm("Are you sure your exam will take three hours?");

                if (!res) event.target.value = 0;
            }

        },
    },
    watch: {
    }
})
</script>

<template>
    <pageHeader>

        <div class="main-body">

            <h1>Create a new test paper</h1>

            <p class="stdText-22" style="margin: 20px 0;">The following form will help you create a new test paper.</p>

            <div class="form-container">

                <form @submit.prevent="submit">

                    <div class="field-group">

                        <input class="input-text-field field-widget" type="text" id="test-name" name="name"
                               placeholder="Enter the name of the test" v-model="formData.name" required>
                        <label class="field" for="test-name">Test Name</label>

                    </div>

                    <div class="field-group optional">

                        <input class="input-text-field field-widget" type="text" id="test-description" name="desc"
                               v-model="formData.desc" placeholder="Enter a brief description of the test">
                        <label class="field" for="test-description">Test Description</label>

                    </div>

                    <div class="field-group optional">

                        <input class="input-time-field field-widget" type="number" min="0" id="test-duration" name="duration"
                               v-model="formData.duration" @change="valueValid">
                        <label class="field" for="test-duration">Test Duration(minutes)</label>

                    </div>

                    <div class="field-group need-move">

                        <input class="input-submit-field field-widget" type="submit" value="Create Test Paper">

                    </div>

                </form>

            </div>

        </div>

    </pageHeader>

</template>

<style>
.uploader-main .uploader-btn {
    margin-right: 4px;
}

.uploader-main uploader-list {
    max-height: 440px;
    overflow-x: hidden;
    overflow-y: auto;
}

.uploader-list, .uploader-file-progress {
    background: #404040 !important;
}

.main-body {
    padding: 0 15%;
    color: honeydew;
    height: 93vh;
}

.form-container {
    background-color: #656565;
    padding: 50px 30px 20px 30px;
    border-radius: 10px;
}

.optional::before {
    content: "*";
    color: white;
}

.field-group {
    align-items: center;
    align-content: center;
    display: flex;
    margin-bottom: 40px;
    position: relative;
}

.field {
    font-size: 1.2em;
}

.input-text-field {
    display: inline-block;
    padding: 8px 10px;
    font-size: 16px;
    border: 1px solid #cccbcb;
    width: 40%;
}

.input-file-field {
    display: none;
}

.input-time-field {
    display: inline-block;
    padding: 6px 10px;
    font-size: 16px;
    border: 1px solid #cccbcb;
}

.input-submit-field {
    margin-top: 20px;
    background-color: #52a3ff;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 16px 40px;
    line-height: 1.4;
    text-align: center;
    border-radius: 24px;
    vertical-align: baseline;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    overflow: visible;
    border: none;
    transition: background-color 0.3s ease-in-out;
}

.input-submit-field:hover {
    background-color: #217fff;
}

.move-bottom {
    margin-top: 100px;
}

.field-widget {
    position: absolute;
    margin-left: 20%;
}

.uploader-main {
    width: 41.5%;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
}

.disguise-button {
    font-size: 12px;
    font-weight: bold;
    color: #4b97ff;
    text-decoration: none;
    padding: 11px 32px;
    max-width: 20%;;
    border: 1px solid #cccbcb;
    border-radius: 19px;
    text-align: center;
    vertical-align: baseline;
    margin-bottom: 10px;
    float: left;
}

.uploader-file-info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.uploader-list-wrapper {
    display: flex;
    flex-direction: row;
}

.console-btn {
    position: absolute;
    float: right;
    display: flex;
    flex-direction: row;
    right: 0;
    bottom: 10%;
}

.icon-wrapper {
    border-radius: 5px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.close-icon:hover {
    background-color: red;
}


</style>
