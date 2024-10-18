<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import { color } from "@/assets/global";
import { Store_ } from "@/stores/stores";

// TODO: 实现无提示的添加题目窗口
// TODO: 实现题目所见即所得功能
// TODO: 实现宏,信息填写功能

export default {
    data() {
        return {
            
        }
    },
    setup() {
        const store = Store_();
        return { color, store }
    },
    computed: {
        // 文本: 当前没有题目
        nothingText() { return this.store.content?.ques.nothing[this.store.lang]; }
    }
}
</script>

<template>
    
    <div class="ques" :style="{ backgroundColor: color('back') }">
        
        <header class="ques-header">
        
        
        
        </header>
        
        <div class="nothing">
            
            <p :style="{ color: color('font') }">{{ nothingText }}</p>
            
        </div>
        
    </div>
    
</template>

<style lang="sass">
.ques
    height: 100%
    
.nothing
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
</style>