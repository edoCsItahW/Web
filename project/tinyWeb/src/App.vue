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
 * @file App.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/22 10:56:04
 * @desc
 * @copyright CC BY-NC-SA 2024. All rights reserved.
 * # 要求
 * 1. 网站功能
 *     * ️ ⭐️用户输入: 至少实现一个功能,允许用户输入并提交数据(如留言、注册、登录、评论等).
 *     * ⭐️数据存储: 将用户输入的数据保存到数据库,确保持久化存储.
 *     * ⭐️列表展示: 提供列表展示功能(如展示用户列表、商品目录或评论列表).
 *     * ⭐️详情查看: 支持点击列表项查看详细信息页面.
 *     * ⭐️页面展示: 网站页面需设计合理,确保用户体验良好.
 * 2. 技术栈要求
 *     * 前端技术: HTML、CSS、JavaScript 或前端框架(如 React、⭐️Vue、Bootstrap).
 *     * ⭐️后端技术: 不限(Node.js、Django、Spring Boot 等均可).
 *     * ⭐️数据库: 不限(MySQL、MongoDB等均可).
 *     * 学生需在项目报告中说明所选技术及其使用原因.
 * 3. 页面内容
 *     * 网站首页标题栏必须包含学生姓名、学号和网站标题.
 *     * 网站整体设计需清晰、美观,保证易于导航.
 * 4. 开发与提交方式
 *     * 独立开发: 本次大作业要求每位学生独立完成,杜绝合作或抄袭.
 *     * 演示视频: 录制3-5分钟演示视频,展示网站主要功能和使用流程,需要出镜,边演示边讲解.
 * 5. 提交内容
 *     * 源代码: 包括所有前后端代码.(源代码中变量命名需带上自己的姓名拼音)
 *     * 项目报告(PDF格式): 包括项目简介、系统架构、技术栈选择、功能实现说明、开发中遇到的难点及解决方案.
 *     * 演示视频: 上传演示视频(演示程序启动、功能演示).
 * */
import { request, API_URL } from "confunc";
import { Store_ } from "@/stores/stores";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import router from "@/router/router";

onload = () => { router.push("/"); };

/**
 * TODO:
 * 1. 留言功能
 * 2. 评分功能
 *    - 评分统计
 * 3. ...
 * */

export default defineComponent({
    name: "App",
    data(vm) {
        return {
            /** @var {Object} screen 视口大小
             * @property {String} w 宽度
             * @property {String} h 高度
             * @desc 将视口大小绑定到data中,使其成为响应式数据
             * */
            screen: { w: `${window.innerWidth}px`, h: `${window.innerHeight}px` },
            // 响应式媒介
            back: ""
        };
    },
    setup() {
        const store = Store_();

        // ----------------- 发送token验证请求获取用户信息 -----------------
        const token = localStorage.getItem("token");
        if (token) request(API_URL, "user", { token, type: "check" }).then(
            res => {
                    if (res.code === 200) store.updateUser(res.data);
                    else console.warn(`${res.code} - Check user failed: ${res.msg}!`)
                });

        return { store };
    },
    computed: {
        ...mapState(Store_, {
            // 主题控制实例
            color: state => state.color
        })
    },
    methods: {
        /**
         * @desc 更新data中的screen属性
         * @callback
         * */
        updateSize() {
            this.screen.w = `${window.innerWidth}px`;
            this.screen.h = `${window.innerHeight + window.scrollY + 10 /** 缓冲 */}px`;
            this.calcuHeader();
        },
        /**
         * @desc 计算header的margin-top值,使占位元素其与header的高度一致
         * */
        calcuHeader() {
            const headerPH = document.getElementById("header-placeholder") as HTMLDivElement;
            if (headerPH) headerPH.style.marginTop = `${document.getElementById("header")?.offsetHeight}px`;
        }
    },
    mounted() {
        this.updateSize();
        window.addEventListener("resize", this.updateSize);
        window.addEventListener("scroll", this.updateSize);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateSize);
        window.removeEventListener("scroll", this.updateSize);
    },
    watch: {
        /**
         * @desc 由于color本身非响应,需要主动监听并更新back属性
         * */
        color: {
            handler(val) {
                this.back = val?.back;
            },
            deep: true,
            immediate: true
        }
    }
});
</script>

<template>

    <div class="root" :style="{ width: screen.w, height: screen.h, backgroundColor: back, color: color.font }">

        <router-view></router-view>

    </div>

</template>

<style lang="sass">
@font-face
    font-family: "EnFont"
    src: url("@/assets/JetBrainsMono-Bold.ttf")
    unicode-range: U+0000-0041, U+0042-007A

body
    margin: 0
    font-family: "EnFont", sans-serif
    overflow-x: hidden

a
    text-decoration: none
    color: inherit

ul
    list-style: none
    margin: 0

.root
    display: flex
    flex-direction: column

h1, h2, h3, h4, h5, h6
    margin: 0
    padding: 0

p
    margin: 0
</style>
