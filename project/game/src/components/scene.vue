<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script setup lang="ts">
/**
 * @file scene.vue
 * @author edocsitahw
 * @version 1.1
 * @date 2024/11/05 下午1:28
 * @desc
 * @copyright CC BY-NC-SA
 * */
import { defineComponent, shallowRef, ShallowRef, ref, Ref } from "vue";
import { TresCanvas, useRenderLoop, UseRenderLoopReturn } from "@tresjs/core";
import * as THREE from "three";

const sun: ShallowRef<null | THREE.Mesh> = shallowRef(null);
const moon: ShallowRef<null | THREE.Mesh> = shallowRef(null);

const isDay: Ref<boolean> = ref(true);

const { onLoop } = useRenderLoop();

const height = 5;
let deg = Math.PI / 2; // 弧度制单位角度
let speed = 0.01; // 角速度

onLoop(({ delta, elapsed }) => {
  if (sun.value && moon.value) {
    if (!(Math.floor((deg + Math.PI / 2) / Math.PI) % 2) === isDay.value) {
      deg += speed;
      sun.value.position.x = -Math.cos(deg) * height;
      sun.value.position.y = Math.sin(deg) * height;
      moon.value.position.x = -Math.cos(deg - Math.PI) * height;
      moon.value.position.y = Math.sin(deg - Math.PI) * height;
    }
  }
});
</script>

<template>
  <button
    value="切换"
    @click="isDay = !isDay"
    style="position: absolute; top: 10px; right: 10px; z-index: 1000"
  />
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[0, 0, 30]" :look-at="[0, 0, 0]" />

    <TresMesh ref="sun" cast-shadow :position="[0, 5, 0]">
      <TresCircleGeometry radius="2" segments="1024" />

      <TresMeshStandardMaterial
        color="#ffaa00"
        emissive="#ffff00"
        emissive-intensity="1"
      />
    </TresMesh>

    <TresMesh ref="moon" cast-shadow :position="[0, -5, 0]">
      <TresCircleGeometry radius="1" segments="1024" />
      <TresMeshBasicMaterial color="#ffffff" />
    </TresMesh>
    <TresMesh :rotate-x="-1.57" :receive-shadow="true">
      <TresPlaneGeometry
        width="4000"
        height="4000"
        widthSegments="10"
        heightSegments="10"
      />
        <TresMeshStandardMaterial roughness="0.7" metalness="1.0" color="#333333" emissive="#000000" />
    </TresMesh>

    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<style lang="sass"></style>
