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
 * @file main.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/15 下午2:26
 * @description 服务器端主入口文件
 * @copyright CC BY-NC-SA
 * */
import { defineComponent, provide, ref } from "vue";
import { Store_ } from "@/stores/stores";
import { mapState } from "pinia";
import stdHeader from "@/components/stdHeader.vue";
import { ModelLoader } from "@/assets/model"
import { Three } from "@/assets/suport";

// TODO: 完善3D背景

export default defineComponent({
    data() {
        return {
            scroll: { flag: true, pos: 0, frame: 0, speed: 0.5, hight: 0 },
            three: null as Three | null
        };
    },
    setup() {
        const store = Store_();
        return { store }
    },
    computed: {
        ...mapState(Store_, {
            user: "user",
            proj: "proj",
            color: "color",
            lang: "lang"
        })
    },
    methods: {
        scrolling() {
            if (!this.scroll.hight) {
                const el = document.querySelector("ul:first-child");
                this.scroll.hight = el?.clientHeight || 0;
            }
            
            this.scroll.pos += this.scroll.speed;
            
            if (this.scroll.pos >= (this.proj?.length || 1) * this.scroll.hight) this.scroll.pos = 0;
            
            this.scroll.frame = requestAnimationFrame(this.scrolling);
        }
    },
    components: {
        stdHeader
    },
    mounted() {
//        const three = new Three('Poi', document.getElementById('model'));
//        new ModelLoader("koenigsegg", 'glb').load().then(model => three.render(model));
    },
    beforeUnmount() {
    }
//    watch: {
//        "scroll.flag": {
//            handler(val: boolean) {
//                if (val) {
//                    requestAnimationFrame(this.scrolling);
//                }
//                else
//                    cancelAnimationFrame(this.scroll.frame);
//            },
//            immediate: true
//        }
//    }
});
</script>

<template>
    
    <std-header>
        
        <div id="model"></div>
        
        <!-- -->
        <div class="main" :style="{ backgroundColor: color.back }">
            
            <div class="main-containter">
                
                <div class="main-left">
                    
                    <!-- 左侧内容 -->
                    <div class="main-left-content">
                        
                        <!-- 用户信息 -->
                        <div class="main-left-content-user">
                            
                            <div class="main-left-content-user-avatar">
                                
                                <!-- 头像 -->
                                <img :src="user?.imgUrl" alt="avatar">
                            
                            </div>
                            
                            <div class="main-left-content-user-name">
                                
                                <!-- 用户名 -->
                                <h2 :style="{ color: color.font }">{{ user?.name }}</h2>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>
                
                <!-- 右侧内容 -->
                <div class="main-right">
                    
                    <!-- 项目列表 -->
                    <div class="main-right-list" @mouseenter="scroll.flag = false" @mouseleave="scroll.flag = true">
                        
                        <ul>
                            <!-- <li v-for="pj in proj" :style="{transform: `translateY(-${scroll.pos}px)`}"> -->
                            <!--    {{ pj.name }} -->
                            <!-- </li> -->
                            <li v-for="pj in proj" :style="{ color: color.font, border: `2px solid ${color.border}` }">
                                
                                <router-link to="/proj" style="text-decoration: none; color: inherit" @click="store.send('proj', pj)">
                                    
                                    <h4 style="margin: 0">{{ store.format(pj.name) }}</h4>
                                    <p style="margin: 0">{{ store.format(pj.desc) }}</p>
                                    
                                </router-link>
                                    
                            </li>
                        
                        </ul>
                    
                    </div>
                
                
                </div>
            
            </div>
        
        </div>
    
    </std-header>
    
</template>

<style lang='sass'>
#model
    position: absolute
    z-index: -1

.main
    display: flex
    flex-direction: column
    height: 100%
    flex: 19
    
    &-containter
        display: flex
        flex-direction: row
        height: 100%
    
    &-left
        display: flex
        flex: 4
        flex-direction: column
        justify-content: center
        align-items: center
        
        &-content
            &-user
                
                &-avatar
                    width: 150px
                    height: 150px
                    border-radius: 50%
                    overflow: hidden
                    display: flex
                    justify-content: center
                    align-items: center
                    
                    & img
                        width: 100%
                        height: auto
    
    &-right
        display: flex
        flex: 6
        flex-direction: column
        justify-content: center
        
        &-list
            //overflow: hidden
            //border: 2px solid #d3d3d3
            //transition: transform 0.1s linear?
            list-style: none
            padding: 20px
            
            ul
                margin: 0
                padding: 0
                list-style: none
                
                li
                    padding: 20px
                    margin: 10px
                    border-radius: 10px
                    cursor: pointer
                    transition: all 0.15s ease-in-out
                    
                    &:hover
                        transform: scale(1.02)

</style>