<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
/**
 * @file home.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/22 下午1:26
 * @desc 课程评分系统
 * @copyright CC BY-NC-SA 2024. All rights reserved.
 * */
import { defineComponent, reactive } from "vue";
import { request, API_URL } from "confunc";
import { mapState } from "pinia";
import { Store_ } from "@/stores/stores";
import { Courses } from "@/assets/types";
import genHeader from "@/components/genHeader.vue";
import avatarSvg from "@/assets/img/avatar.svg";
import router from "@/router/router";

export default defineComponent({
    data() {
        return {
            /**
             * @desc 信号与索引存储
             * @property atc 当前文章块索引
             * @property curr 当前鼠标悬停的文章块索引
             * @property star 当前鼠标悬停块的星星数
             * @property cmt 当前评论块索引,控制评论显示
             * */
            flags: {
                atc: null as number | null,
                curr: null as number | null,
                star: 0,
                cmt: { curr: null as number | null }
            },
            starLog: new Map<number, number>(),
            comment: { content: "", id: null as number | null },
            commentLog: new Map<number, string>()
        };
    },
    setup() {
        const store = Store_();
        const articles = reactive([]) as Courses;
        request(API_URL, "article", null).success(res => Object.assign(articles, res.data));
        return { store, articles, avatarSvg };
    },
    computed: {
        ...mapState(Store_, {
            color: store => store.color,
            content: store => store.content,
            svg: store => store.svg
        })
    },
    components: {
        genHeader
    },
    methods: {
        /**
         * @desc 星星激活状态
         * @param blockIdx 文章块索引
         * @param idx 星星索引
         * @returns 是否激活
         * */
        active(blockIdx: number, idx: number) {
            const log = this.starLog.get(blockIdx);
            return (log || this.flags.curr === blockIdx) /* 当前块 */ && idx <= (log || this.flags.star); /* 激活前面的星 */
        },
        /**
         * @desc 设置索引与更新用户评论id与评论缓存
         * @param ordIdx 文章块顺序索引
         * @param atcIdx 文章块id
         * */
        openComment(ordIdx: number, atcIdx: number | null) {
            this.flags.cmt.curr = ordIdx === this.flags.cmt.curr ? null : ordIdx; // 设置当前评论块索引为顺序索引
            if (this.comment.id !== atcIdx) {
                // 用户之前评论的文章id与但前文章id不同(是否切换文章)
                if (this.comment.id) this.commentLog.set(this.comment.id, this.comment.content); // 记录用户之前评论的内容
                this.comment.id = atcIdx; // 设置当前评论文章id
                this.comment.content = this.commentLog.get(atcIdx) || ""; // 获取评论内容
            }
        },
        subComment() {
            if (!this.store.user.id)
                if (confirm(this.store.format(this.content.home.confirm))) this.store.updateUser({ name: "guest", id: 2, img: null });
                else return router.push("/login");

            const date = new Date().toLocaleDateString();
            request(API_URL, "comment", { ...this.comment, date, uid: this.store.user.id }).then(res => {
                if (res.code === 200) {
                    alert(this.store.format(this.content?.home.block.comment.success));
                    this.articles[this.flags.cmt.curr].comment.push({ content: this.comment.content, user: this.store.user, date });
                    this.comment.content = ""; // 清空评论内容
                    this.commentLog.set(<number>this.comment.id, this.comment.content);
                }
            });
        },
        visit(user: { name: string; id: number; img: string | null }) {
            this.store.sendto(user, "profile");
            router.push("/profile");
        }
    }
});
</script>

<template>
    <gen-header>
        <div class="home">
            <!--- 文章列表 --->
            <div class="article" :style="{ color: color.font }">
                <!--- 文章块 --->
                <div
                    class="article-block"
                    v-for="(atc, index) in articles"
                    @mouseenter="flags.curr = atc?.id"
                    @mouseleave="
                        flags.curr = null;
                        flags.star = 0;
                    "
                >
                    <h3>{{ atc?.title }}</h3>

                    <p>
                        <span>{{ store.format(content?.home.block.teacher) }}</span>
                        :
                        <span>{{ atc?.teacher }}</span>
                    </p>

                    <!--- 文章内容 --->

                    <div class="article-block-content" :style="{ flexDirection: flags.atc === atc?.id ? 'column' : 'row' }">
                        <div class="article-block-content-img">
                            <img :src="atc?.imgUrl" alt="" :style="{ width: '100%', height: 'auto' }" />
                        </div>

                        <div class="article-block-content-text">
                            <p>{{ atc?.text }}</p>
                        </div>
                    </div>

                    <!--- 文章评分 --->
                    <div class="article-block-score">
                        <p>
                            <span>{{ store.format(content?.home.block.score) }}</span>
                            <!-- idx偏移1避免0分-_-! -->
                            <!-- `i` 为星星数 -->
                            <span v-for="i in 5" v-html="svg.star(24, 24, active(atc?.id, i))" @mouseenter="flags.star = i" @click="starLog.set(atc?.id, i)"></span>
                        </p>
                    </div>

                    <!--- 文章评论 --->
                    <div class="article-block-comment">
                        <p class="react-text" @click="openComment(index, atc?.id)">
                            <span v-html="svg.comment()"></span>
                            <span>{{ atc?.comment.length }}{{ store.format(content?.home.block.comment.num) }}</span>
                        </p>

                        <transition-group name="fade" tag="ul" style="width: 100%; padding-left: 20px" :style="{ display: index === flags.cmt.curr ? 'block' : 'none' }">
                            <li class="article-block-comment-item" :key="index" v-for="cmt in atc?.comment">
                                <img style="cursor: pointer" :src="cmt?.user.img || avatarSvg" alt="" class="avatar" @click="visit(cmt?.user)" />

                                <div class="article-block-comment-item-content">
                                    <h5 style="cursor: pointer" @click="visit(cmt?.user)">{{ cmt?.user.name }}</h5>
                                    <p>{{ cmt?.content }}</p>
                                    <p style="font-size: 14px" :style="{ color: color.border }">{{ cmt?.date }}</p>
                                </div>
                            </li>

                            <div class="article-block-comment-input" key="input">
                                <img :src="this.store.user.img || avatarSvg" alt="" class="avatar" />

                                <textarea v-model="comment.content" :placeholder="store.format(content?.home.block.comment.ph)"></textarea>

                                <button @click="subComment" :disabled="!comment.content">{{ store.format(content?.home.block.comment.submit) }}</button>
                            </div>
                        </transition-group>
                    </div>
                </div>
            </div>

            <!--- 统计信息 --->
            <div class="statistics">
                <h3>{{ store.format(content?.home.statistics.title) }}</h3>

                <div class="statistics-item">
                    <!-- 🔥⭐️😄 -->
                </div>
            </div>
        </div>
    </gen-header>
</template>

<style lang="sass">
@use 'sass:map'


.react-text
    cursor: pointer
    transition: all 0.2s ease-in-out

    &:hover
        color: #7e7e7e

.avatar
    aspect-ratio: 1/1
    width: 35px
    height: 35px
    margin-right: 10px

.home
    display: flex
    flex-direction: row
    align-items: center
    padding: 0 20%

$rate-map: (article: 7, statistics: 3)
.article
    display: flex
    flex-direction: column
    flex: map.get($rate-map, article)

    &-block
        display: flex
        flex-direction: column
        padding: 15px

        &-content
            display: flex
            margin-top: 10px

            &-img
                flex: 1
                margin-right: 20px
                min-width: 150px

            &-text
                flex: 4

        &-score
            display: flex
            flex-direction: row

            svg
                position: relative
                top: 5px

        &-comment
            display: flex
            align-items: flex-start
            flex-direction: column
            justify-content: center

            &-input
                display: flex
                flex-direction: row
                width: 100%

                textarea
                    width: 100%
                    resize: none
                    font-size: 16px
                    padding: 10px
                    outline: none
                    border: none
                    border-radius: 10px 0 0 10px

                button
                    border-radius: 0 10px 10px 0
                    border: none
                    background-color: #52a3ff
                    transition: background-color 0.3s ease-in-out
                    color: white
                    font-weight: bold

                    &:disabled
                        background-color: #9fcaff
                        cursor: not-allowed

                    &:hover:not(:disabled)
                        background-color: #3c86ff

            &-item
                display: flex
                flex-direction: row
                padding: 10px

            svg
                position: relative
                top: 5px

.statistics
    display: flex
    flex: map.get($rate-map, statistics)
    flex-direction: column
    align-items: center
    height: 100%
</style>
