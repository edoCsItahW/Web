<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang='ts'>
/**
 * @file stdHeader.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/17 上午9:53
 * @desc 标准的头部组件,包含切换语言和切换主题的按钮
 * @copyright CC BY-NC-SA
 * */
import { defineComponent } from "vue";
import darkSvg from "@/assets/dark.svg";
import lightSvg from "@/assets/light.svg";
import langLSvg from "@/assets/langL.svg";
import langDSvg from "@/assets/langD.svg";
import { Theme, Lang } from "@/assets/global";
import { mapState } from "pinia";
import { Store_ } from "@/stores/stores";


export default defineComponent({
    setup() {
        const store = Store_();
        return {
            store, Lang
        };
    },
    computed: {
        ...mapState(Store_, {
            color: "color",
            svg: "svg",
            lang: "lang"
        }),
        isLight() { return this.color.mode === Theme.Mode.LIGHT; },
        langSvg() { return this.isLight ? langLSvg : langDSvg; },
        themeSvg() { return this.isLight ? darkSvg : lightSvg; }
    },
    methods: {
        changeTheme(event: MouseEvent) {
            const target = event.target as HTMLDivElement;
            target.classList.toggle("change");
            target.style.visibility = "hidden";
            this.store.changeColor();
            setTimeout(() => {
                target.style.visibility = "visible";
                target.classList.remove("change");
            }, 200);
        }
    }
});
</script>

<template>
    
    <!-- 控制按钮 -->
    <header class="header" :style="{backgroundColor: color.back}">
        
        <div class="header-btn">
            
            <!-- 切换语言按钮 -->
            <div class="header-btn-lang" v-html="svg.lang()" @click="store.lang = lang === Lang.ZH ? Lang.EN : Lang.ZH"></div>
            
            <!-- 切换主题按钮 -->
            <div class="header-btn-theme" @click="changeTheme">
                
                <img :src="themeSvg" alt="theme">
            
            </div>
        
        </div>
    
    </header>
    
    <slot></slot>

</template>

<style lang='sass'>
.change
    transition: all 0.2s ease-in-out
    transform: scale(0.3)

.header
    display: flex
    justify-content: flex-end
    align-items: center
    padding: 10px
    flex: 1
    
    &-btn
        display: flex
        
        div
            border-radius: 50%
            
            &:hover
                cursor: pointer
                filter: brightness(0.8) contrast(1.2) saturate(1.5)
                
</style>