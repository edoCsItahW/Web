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
 * @file proj.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/18 下午2:25
 * @desc
 * @copyright CC BY-NC-SA
 * */
import { defineComponent, StyleValue } from "vue";
import { mapState } from "pinia";
import { Store_ } from "@/stores/stores";
import stdHeader from "@/components/stdHeader.vue";
import markdown from "@/components/markdown.vue";


export default defineComponent({
    data() {
        return {
            dyncImg: { url: 'proj-img-0.png', style: { top: '0', width: '100%', height: 'auto' } as StyleValue, idx: 0 },
            contents: [
                {
                    class: 'proj-detail-content-doc',
                    title: { zh: '项目文档', en: 'Project Documentation' },
                    content: { zh: '如需浏览项目文档,请点击', en: 'Please click to view the project documentation' },
                    link: { zh: '文档链接', en: 'document link' },
                    key: 'docUrl'
                },
                {
                    class: 'proj-detail-content-code',
                    title: { zh: '项目源码', en: 'Project Source Code' },
                    content: { zh: '如需浏览项目源码,请点击', en: 'Please click to view the project source code' },
                    link: { zh: '源码链接', en: 'code link' },
                    key: 'url'
                },
                {
                    class: 'proj-detail-content-demo',
                    title: { zh: '项目演示', en: 'Project Demo' },
                    content: { zh: '如需浏览项目演示,请点击', en: 'Please click to view the project demo' },
                    link: { zh: '演示链接', en: 'demo link' },
                    key: 'demoUrl'
                }
            ],
            _start: null,
            _end: null
        }
    },
    setup() {
        const store = Store_();
        return { store };
    },
    computed: {
        ...mapState(Store_, {
            trans: "trans",
            color: "color",
            svg: "svg",
            status: "status"
        }),
        start() {
            return this._start || this.hexToRgb(this.color.fontD, 0.3);
        },
        end() {
            return this._end || this.hexToRgb(this.color.back, 0.3);
        }
    },
    methods: {
        handleScroll() {
            this.dyncImg.style.top = `${Math.max(0, window.scrollY)}px`;
            this.dyncImg.url = `proj-img-${this.dyncImg.idx = Math.floor(window.scrollY / 400) % 4}.png`;  // 越大越难变
        },
        hexToRgb(hexColor: string, alpha: number) {
            const [r, g, b] = this.color.hexToRgb(hexColor);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    },
    components: {
        stdHeader,
        markdown,
        dyncImgComp: defineComponent({
        
        })
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    watch: {
        status: {
            handler(val) {
                if (val)
                    this.dyncImg.style.width = this.status?.w / 3 + 'px';
            },
            immediate: true,
            deep: true
        },
        "color.mode": {
            handler(val) {
                this._start = this.hexToRgb(this.color.fontD, 0.3);
                this._end = this.hexToRgb(this.color.back, 0.3);
            }
        }
    }
});
</script>

<template>
    
    <std-header>
        
        <div class="proj" :style="{ background: `${color.back} radial-gradient(circle, ${color.font} 0%, ${color.back} 70%) fixed` }">
            
            <h1 :style="{ color: color.font }" class="center">{{ store.format(trans?.data.name) }}</h1>
            
            <div class="proj-detail">
            
                <div class="proj-detail-dync">
                    
                    <!-- /src/assets 为适应flask改成 /static/img -->
                    <img :src="`/static/img/${dyncImg.url}`" alt="动态图片" :style="dyncImg.style">
                
                </div>
                
                <div class="proj-detail-content">
                    
                    <div :style="{ color: idx === dyncImg.idx ? color.font : color.backL, margin: `${status?.h / 3}px 0` }" :class="cont.class" v-for="(cont, idx) in contents">
                        
                        <h3 class="center">{{ store.format(cont.title) }}</h3>
                        
                        <p><span>{{ store.format(cont.content) }}</span><a :href="trans?.data[cont.key]">{{ store.format(cont.link) }}</a></p>
                        
                    </div>
                    
                </div>
            
            </div>
            
            <div class="proj-intro" :style="{ border: `1px solid ${color.border}` }">
                
                <h3 :style="{ color: color.font }">{{ store.format({zh: '简介', en: 'Introduction'}) }}</h3>
                
                <markdown :markdown="trans?.data.intro" :style="{ color: color.font }"/>
            
            </div>
            
        </div>
    
    </std-header>

</template>

<style lang='sass'>
.center
    text-align: center

.proj
    flex: 19
    padding: 20px
    
    &-intro
        display: flex
        flex-direction: column
        padding: 15px
        border-radius: 10px
        
    &-detail
        display: flex
        //overflow-y: scroll
        padding-top: 15px
        
        &-dync
            flex: 1
            position: sticky
            top: 0
            overflow: hidden

            img
                position: absolute
                display: block
                //width: 100%
                //height: auto
                border-radius: 10px

            //&::after
            //    content: ''
            //    position: absolute
            //    top: 0
            //    left: 0
            //    bottom: 0
            //    right: 0
            //    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5))
            //    pointer-events: none
                    
        &-content
            flex: 1
            padding: 20px
            
            div
                transition: color 0.3s ease-in-out
</style>