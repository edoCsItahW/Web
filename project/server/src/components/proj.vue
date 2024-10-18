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
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { Store_ } from "@/stores/stores";
import stdHeader from "@/components/stdHeader.vue";
import markdown from "@/components/markdown.vue";


export default defineComponent({
    data() {
        return {
            dyncImg: { top: 0, key: ['doc'], idx: 0 }
        }
    },
    setup() {
        const store = Store_();
        return { store }
    },
    computed: {
        ...mapState(Store_, {
            trans: "trans",
            color: "color",
            svg: "svg"
        })
    },
    methods: {
        handleScroll() {
            const scrollY = window.scrollY;
            const offsetTop = document.querySelector(".proj-detail").getBoundingClientRect().top;
            
            if (scrollY > offsetTop) {
                this.dyncImg.top = Math.min(scrollY - offsetTop, 0);
                this.dyncImg.url = null;  // TODO: 实现动态图片加载功能
            }
            else this.dyncImg.top = 0;
        }
    },
    components: {
        stdHeader,
        markdown
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    }
});
</script>

<template>
    
    <std-header>
        
        <div class="proj" :style="{ backgroundColor: color.back }">
            
            <div class="proj-intro" :style="{ border: `1px solid ${color.border}` }">
                
                <h1 :style="{ color: color.font }" class="center">{{ store.format(trans?.data.name) }}</h1>
                
                <h3 :style="{ color: color.font }">{{ store.format({zh: '简介', en: 'Introduction'}) }}</h3>
                
                <markdown :markdown="trans?.data.intro" :style="{ color: color.font }"/>
                
            </div>
            
            <div class="proj-detail">
            
                <div class="proj-detail-dync" v-html="svg[dyncImg.key[dyncImg.idx]](200, 200)">
                
                </div>
            
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
        overflow-y: scroll
        
        &-dync
            flex: 1
            position: relative
            
            img
                position: absolute
                left: 0
                width: 100%
                transition: top 0.2s
</style>