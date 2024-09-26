<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<!-- ----------------------------------------------------
  - @File name: func.ts paper.vue
  - @Author: edocsitahw in WebStorm
  - @Version: 1.1
  - @Date: 2024/09/06 下午3:44
  - @Commend: 
  ------------------------------------------------------- -->

<script lang="ts">
import { defineComponent } from 'vue'
import { Store_ } from '@/stores/stores'
import { API_URL, color, Func } from '@/assets/global'
import { request } from 'jsorigin/src'
import { API } from '@/assets/typeSup'
import router from '@/router/router'


export default defineComponent({
    data() {
        return {
            procedure: ['info'],
            requires: {
                name: { content: null, required: true },
                sbj: { content: null, required: true },
                desc: { content: null, required: false, def: '' },
                limit: { content: null, required: false, def: 0 }
            }
        }
    },
    setup() {
        const store = Store_();
        return { store, color, Func }
    },
    computed: {
        // 文本: 左侧显示题目内容
        leftTitleText() {
            return this.store.content?.paper.left.title[this.store.lang];
        },
        // 文本: 右侧标题
        rightTitleText() {
            return this.store.content?.paper.right.title[this.store.lang];
        },
        // 文本: 右侧描述
        rightDescText() {
            return this.store.content?.paper.right.desc[this.store.lang];
        }
    },
    methods: {
        submit() {
            request(API_URL, 'create', {
                content: Object.entries(this.requires).reduce((acc, [k, v]) => { acc[k] = (v as any).content || (v as any).def; return acc}, {}), type: 0 })
            .then((res: API.Resp.Std<null>) => {
                if (res.code !== 200) console.error(res);
                else router.push('/');
            });
        }
    }
})
</script>

<template>
    
    <div class="paper" :style="{ backgroundColor: color('back') }">
        
        <div class="paper-left">
            
            <div class="paper-title">
                
                <h3>{{ leftTitleText }}</h3>
            
            </div>
            
            <div class="paper-procedure">
                
                <ul style="list-style: none">
                    
                    <li class="paper-procedure-item" v-for="proc in procedure">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                            <circle r="12" cx="12" cy="12" :fill="color('icon')" />
                        </svg>
                        
                        <span style="margin-left: 10px">{{ proc }}</span>
                    
                    </li>
                
                </ul>
            
            </div>
        
        </div>
        
        <form class="paper-right" @submit.prevent="submit">
            
            <h1 :style="{ margin: '0 0 10px 0', color: color('font') }">{{ rightTitleText }}</h1>
            
            <p :style="{ margin: '0 0 10px 0', color: color('font') }">{{ rightDescText }}</p>
            
            <div class="paper-doc" :style="{ backgroundColor: color('fontl', true), color: color('back') }">
                
                <div class="paper-doc-field" v-for="(info, idx) in store.content?.paper.right.fields">
                    
                    <h6 :style="{ margin: 0, color: color('font') }">{{ `(${info.type[store.lang]})`
                        }}{{ info.label[store.lang] }}</h6>
                    
                    <input type="text" :placeholder="info.desc[store.lang]"
                           v-model="requires[Object.keys(requires)[idx]].content"
                           :required="requires[Object.keys(requires)[idx]].required" />
                
                </div>
            
            </div>
            
            <input class="paper-submit" type="submit" :value="store.content?.paper.right.submit[store.lang]"
                   @mousedown="($event.target as HTMLButtonElement).style.transform = 'scale(0.95)'"
                   @mouseup="($event.target as HTMLButtonElement).style.transform = 'scale(1)'" />
        
        </form>
    
    </div>

</template>

<style lang="sass">
@use "sass:math"
@import "../assets/global"

@mixin base-right
    padding: 10px
    flex: 3
    display: flex
    flex-direction: column
    align-items: center

@mixin base-doc
    width: 100%
    border-radius: 10px
    padding: 10px
    display: flex
    margin-bottom: 20px
    flex-direction: column
    gap: 10px

@mixin std-input
    width: 80%
    padding: 5px
    &::placeholder
        font-size: 16px

@mixin std-button($width: 50%)
    width: $width
    padding: 10px
    border: none
    border-radius: 20px
    transition: all 0.3s ease-in-out
    &:hover
        box-shadow: 0 0 10px 0 #000000

input[type="text"]
    @include std-input

// PC端
@media screen and (min-width: map-get($WIDTH_MAP, 'tablet'))
    .paper
        display: flex
        position: absolute
        width: 90%
        height: 90%
        transform: translate(-50%, -50%)
        top: 50%
        left: 50%
        border-radius: 10px
        
        &-left
            flex: 2
            display: flex
            align-items: center
            flex-direction: column
            background-image: linear-gradient(120deg, #52a3ff 10%, #ffffff 30%, #52a3ff 60%, #fafafa 100%)
        
        &-procedure
            &-item
                display: flex
                align-items: center
                vertical-align: middle
        
        &-right
            @include base-right
        
        &-doc
            @include base-doc
        
        &-submit
            @include std-button()


// 移动端 及 平板段
@media screen and (max-width: map-get($WIDTH_MAP, 'tablet'))
    .paper
        height: 100%
        
        &-left
            display: none
        
        &-right
            @include base-right
        
        &-doc
            @include base-doc
        
        &-submit
            @include std-button()
</style>
