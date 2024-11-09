<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import { Three, Particle } from "@/assets/suport";
import { ModelLoader } from "@/assets/model";
import { AmbientLight, PointLight } from "three";
import scene from "@/components/scene.vue";

//onload = () => {
//    const three = new Three("Poi");
////    const particle = new Particle();
////
//    new ModelLoader("Castle", "glb")
//        .load().then(model => {
//            three.render(model);
//    })
//}


export default {
    data() {
        return {}
    },
    components: {
        scene
    }
}
</script>

<template>
    <scene/>
</template>

<style lang="sass">
body
    margin: 0
</style>
