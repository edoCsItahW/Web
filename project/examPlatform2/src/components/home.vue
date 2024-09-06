<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import pageHeader from "@/components/pageHeader.vue";
import {Store_} from "@/stores/stores";
import {color} from "@/assets/global";
import {Func} from "@/assets/global";
import { API } from "@/assets/typeSup";


export default {
    data() {
        return {
            // 可自动更新的待定学科列表,当请求成果时有值
            subjects_: [] as number[],
            // 统计键列表
            totals: ["persistDays", "oar", "score"],
            // 统计数据列表
            totals_: [] as number[],
            // 模块位置列表
            modules: ["book.svg", "catg.svg", "hat.svg", "hast.svg"],
            // 试卷列表
            papers_: [] as API.Papers
        }
    },
    setup() {
        const store = Store_();

        return {store, color}
    },
    created() {
        // 获取用户倒计时数据
        this.store.updateUser(this.store.userHash, "data", "countdown");
        // 获取用户学科
        this.store.updateUser(this.store.userHash, "data", "sbj");
        // 获取用户统计数据
        for (const key of this.totals) this.store.updateUser(this.store.userHash, "data", key);

        this.store.updatePaper();
    },
    computed: {
        // 文本: 倒计时
        rest() { return this.store.content?.home.header.rest[this.store.lang]; },
        // 文本: <倒计时默认文本>未设置
        restText() { return this.store.content?.home.header.restDef[this.store.lang]; },
        // 倒计时
        countdown() { return this.store.user?.data?.countdown || this.restText; },
        // 文本: <套卷>
        paperText() { return this.store.content?.home.paper.title[this.store.lang]; },
        // 文本: 作者
        authorText() { return this.store.content?.home.paper.author[this.store.lang]; },
        // 文本: 题目数量
        numText() { return this.store.content?.home.paper.num[this.store.lang]; }
    },
    components: {
        pageHeader
    },
    methods: {
        // 文本: <学科>
        sbjText(idx: number) { return this.store.content?.home.sbj[idx][this.store.lang]; },
        // 文本: <统计数据>
        totalText(idx: number) { return this.store.content?.home.total[idx][this.store.lang]; },
        // 文本: <模块名>
        moduleText(idx: number) { return this.store.content?.home.module[idx][this.store.lang]; },
        choice(ev: PointerEvent) {
            Func.choice(ev, "home-container-sbj-choiced");
        }
    },
    watch: {
        // 监听用户数据变化
        "store.user": {
            handler(nVal: null | API.User) {
                if (!nVal) return;

                if (nVal[this.store.userHash]?.data?.sbj)
                    this.subjects_ = nVal[this.store.userHash].data.sbj;

                for (const key of this.totals)
                    if (nVal[this.store.userHash]?.data?.[key] !== undefined)  // 数据中有0
                        this.totals_.push(nVal[this.store.userHash].data[key]);
            },
            deep: true,
            immediate: true
        },
        // 监听试卷数据变化
        "store.paper": {
            handler(nVal: null | API.Papers) {
                if (!nVal) return;

                this.papers_ = nVal;
            },
            deep: true,
            immediate: true
        }
    }
}
</script>

<template>

    <pageHeader>

        <div class="home-root">

            <div class="home-container" :style="{
                backgroundImage: `linear-gradient(to bottom, ${color('back')}, ${color('fontl', true)})`
            }">

                <header class="home-container-header">

                    <!-- 倒计时模块 -->
                    <div class="home-container-rest" :style="{
                        color: color('fontl'),
                        fontWeight: 'bold'
                    }">

                        {{ rest }}<p style="color: #25dada">{{ countdown }}</p>

                    </div>

                </header>

                <!-- 学科模块 -->
                <div class="home-container-sbj">

                    <div :class="{'home-container-sbj-item': true, 'home-container-sbj-choiced': !idx}"
                         v-for="idx in subjects_" @click="choice" :style="{
                        color: color('fontl'),
                    }">
                        {{ sbjText(idx) }}
                    </div>

                </div>

                <!-- 统计模块 -->
                <div class="home-container-total">

                    <div class="home-container-total-item" v-for="idx in totals.length">

                        <span>{{ totalText(idx - 1) }}</span>
                        <span>{{ totals_[idx - 1] }}</span>

                    </div>

                </div>

                <!-- 实用工具模块 -->
                <div class="home-container-tool">

                    <div class="home-container-tool-item" v-for="(pos, idx) in modules">

                        <img :src="`/src/assets/img/${pos}`" :alt="`${pos}`" :style="{backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`}">

                        <p>{{ moduleText(idx) }}</p>

                    </div>

                </div>

                <!-- 套卷展示模块 -->
                <div class="home-container-paper">

                    <h3>{{ paperText }}</h3>

                    <div class="home-container-paper-item" v-for="paper in papers_">

                        <h4 style="margin: 10px 0;">{{ paper.name }}</h4>

                        <div class="home-container-paper-item-detail">

                            <p>{{ authorText }}: {{ paper.author }}</p>

                            <p>{{ numText }}: {{ paper.num }}</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </pageHeader>

</template>

<style lang="sass">
@use "sass:math"
@import "@/assets/global"

$SIZE_MAP: (rest: 20, sbj: 20, img: 25)


.home-root
    background-color: #00bfff

.home-container
    border-radius: 10px 10px 0 0
    display: flex
    flex-direction: column
    padding: 0 15px
    height: relaSize(math.div(map-get($SIZE_MAP, rest), 18))
    overflow-y: auto

    &-rest
        display: flex
        justify-content: right
        align-items: center
        height: relaSize(map-get($SIZE_MAP, rest))

    &-sbj
        display: flex
        justify-content: left
        align-items: center
        height: relaSize(map-get($SIZE_MAP, sbj))

        &-item
            @include optionHover()
            margin: 0 15px
            font-size: 18px
            transition: color .3s ease-in-out

        &-choiced
            @include optionChoiced()

    &-total
        display: flex
        flex-direction: row
        justify-content: space-around
        background-image: linear-gradient(to right, transparent , #8c88e8)
        border-radius: 10px
        padding: 20px 10px
        margin: 5px 0
        // box-shadow: h-shadow v-shadow blur spread color inset;
        // h-shadow:水平阴影, v-shadow:垂直阴影, blur:模糊半径, spread:阴影尺寸, color:阴影颜色, inset:内阴影
        box-shadow: 4px 2px 5px 1px rgba(0, 0, 0, 0.14)

        &-item
            display: flex
            flex-direction: column
            align-items: center

    &-tool
        display: flex
        flex-wrap: wrap
        //justify-content: flex-start
        justify-content: space-between
        gap: 10px
        border-radius: 10px
        box-shadow: 4px 2px 5px 1px rgba(0, 0, 0, 0.14)

        &-item
            @include iconHover()
            display: flex
            flex-direction: column
            align-items: center
            justify-content: center
            margin: 10px

            & img
                border-radius: 5px
                padding: 5px
                width: relaSize(map-get($SIZE_MAP, img))
                height: relaSize(map-get($SIZE_MAP, img))
    &-paper
        display: flex
        flex-direction: column
        justify-content: left
        border-radius: 10px

        &-item
            @include iconHover(0.98)
            display: flex
            flex-direction: column
            justify-content: left
            padding: 5px 10px
            border-radius: 5px
            background-color: #fff
            box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.14)

            &-detail
                display: flex
                flex-direction: row

                & p
                    margin: 0 10px 5px 10px


</style>