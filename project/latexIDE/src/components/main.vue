<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import latex from "@/components/latex.vue";
import markdown from "@/components/markdown.vue";
import { Store_ } from "@/stores/store";
import { mapState} from "pinia";
import { Type } from "@/assets/global";


export default {
    data() {
        return {
            code: ''
        }
    },
    setup() {
        const store = Store_();
        store.text();
        return { store }
    },
    computed: {
        ...mapState(Store_, { text: "text", setting: "setting" }),
        options() { return this.text.main?.menus.map((item: Type.LangCell) => item[this.setting.language]) }
    },
    methods: {
    },
    components: {
        latex,
        markdown
    }
}
</script>

<template>
    
    <div class="main" :style="{ backgroundColor: store.color('background'), color: store.color('color') }">
        
        <header class="main-menu">
            
            <ul class="main-menu-list">
                
                <li class="main-menu-item" v-for="opt in options">{{ opt }}</li>
            
            </ul>
        
        </header>
        
        <div class="main-window">
            
            <div class="main-window-editor">
            
                <textarea id="editor" :style="{ backgroundColor: store.color('background'), color: store.color('color'), fontSize: setting.font.size }" v-model="code"></textarea>
            
            </div>
            
            <div class="main-window-show">
            
                <markdown :markdown="code"></markdown>
            
            </div>
        
        </div>
        
    </div>
    
</template>

<style lang="sass">
.main
    height: 100%
    display: flex
    flex-direction: column
    
    &-menu
        flex: 1
        display: flex
        align-items: center
        
        &-list
            padding: 0
            margin: 0
            list-style: none
            display: flex
            flex-direction: row
            
        &-item
            margin: 0 10px
        
    &-window
        flex: 19
        display: flex
        flex-direction: row
        
        &-editor
            flex: 1
            
        &-show
            flex: 1
            
#editor
    width: 100%
    height: 100%
    border: none
    resize: none
    
</style>