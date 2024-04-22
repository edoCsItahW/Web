<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<!-- npm init vue@latest -->
<!-- cd 路径 -->
<!-- npm install -->
<!-- npm run dev(需要在有package.json的文件夹) -->
<!-- npm run build 项目完成投入生产 -->
<!--
  npm install 库 --save, 条件是cd到有package.json的文件夹,
  然后下载好后在node_modules的刚下的库中的package.json中加入'main': '库名.js'
-->
<!--
npm install xxx --save：这个命令会将模块安装到项目的node_modules目录下，并在package.json文件的dependencies部分写入这个模块的依赖。这意味着这个模块是项目在生产环境中运行所必需的。当你把项目复制到另一台电脑上，只需运行npm install命令，所有在dependencies中列出的依赖都会自动安装，包括使用--save安装的模块。
npm install xxx --save-dev：这个命令也是将模块安装到项目的node_modules目录下，但是会在package.json文件的devDependencies部分写入这个模块的依赖。devDependencies通常包含那些在开发过程中需要，但在生产环境中不需要的模块。例如，你可能会在开发过程中使用到一些构建工具或测试框架，这些工具或框架就可以通过--save-dev参数安装。
-->
<template>
  <h1>模板语言</h1>
  <p v-bind:class="classname">{{ msg }}</p>  <!-- 模板语法 -->
  <p :id="idname">{{ number + 1 }}</p>
  <p v-bind="attrObj" v-if="flag">条件真</p>  <!-- v-if: false时直接删除, v-show: false时display设为null -->
  <p v-else>条件假</p>
  <p v-if="type === 'A'">A</p>
  <p v-else-if="type === 'B'">B</p>
  <p v-else>C</p>
  <p v-for="item in names">{{ item }}</p>
  <p v-for="(v, k) in names" v-bind:id="v">{{ k }}</p>
  <p :class="{ 'active': isActive }">类属性绑定</p>
  <p :class="classList"></p>
  <p :class="{ arrActive, arrHasError }"></p>
  <p :class="[ isActive ? 'active' : '' ]"></p>
  <!-- 只能数组嵌套对象 -->
  <p :style="{ color: colorActive, fontSize: fontSize + 'px' }">样式绑定</p>
  <button @click="number++">Add 1</button>
  <button @click.stop="clickHandler(arg, $event)" v-for="(arg, index) of names" :key="index">{{ arg }}</button>  <!-- .stop阻止冒泡 -->
  <button @click="change()">改变信息</button>
  <form>
    <input type="text" v-model="text">
    <input type="checkbox" v-model="check">
    <!--
      v-model.lazy: 回车后提交新数据,
      v-model.trim: 去掉前后空格,
      v-model.number: 只接受数字
    -->
    <p>{{ formText }}</p>
    <label ref="textRef" class="textClass">{{ textContent }}</label><button @click="changeText">读取</button>
  </form>
</template>

<script src="@/components/js.js"></script>

<style src="@/components/style.css" scoped>  /* scoped: 表示当前样式仅在当前组件中生效 */</style>
