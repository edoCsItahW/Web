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
 * @date 2024/11/07 09:11:24
 * @description
 * */
import { defineComponent } from "vue";
import router from "@/router/router";

onload = () => {
    router.push("/");
};

export default defineComponent({
    name: "App",
    data() {
        return {
            coeff: []
        }
    }
});
</script>

<template>

    <div class="equation-input">

        <label for="coeff-a">系数a:</label><input v-model="coeff[0]" id="coeff-a" type="text" placeholder="a">
        <label for="coeff-b">系数b:</label><input v-model="coeff[1]" id="coeff-b" type="text" placeholder="b">
        <label for="coeff-c">系数c:</label><input v-model="coeff[2]" id="coeff-c" type="text" placeholder="c">
        <label for="coeff-d">系数d:</label><input v-model="coeff[3]" id="coeff-d" type="text" placeholder="d">

    </div>

</template>

<style lang="sass">

input[type="text"]
    width: 20px

</style>
