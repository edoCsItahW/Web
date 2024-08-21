<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
import frame from "@/components/frame.vue";
import { Clock } from "@/assets/dyncPlay";


export default {
    data() {
        return {
            flag: false,
            tasks: []
        }
    },
    created() {
        this.waitLoad();
    },
    components: {
        frame
    },
    methods: {
        waitLoad() {
            const interval = setInterval(() => {
                if (document.getElementById('clock')) {
                    clearInterval(interval);
                    this.flag = true;
                }
            })
        },
        show(container = document.getElementById('clock')) {
            const clock = new Clock(container);
            clock.engine.events.push(() => {
                clock.light.rotation.x += 0.01;
                clock.needleMap.get('hour').rotation.z -= 1.75 * 1e-8;
                clock.needleMap.get('minute').rotation.z -= 5.25 * 1e-6;
                clock.needleMap.get('second').rotation.z -= 6.3 * 1e-4;
            });
            clock.render();
        }
    },
    watch: {
        flag: {
            handler(val) {
                if (val)
                    this.show();
            },
            immediate: true
        }
    }
}
</script>

<template>
    <div class="home">

        <frame class="home-content">

            <div id="clock"></div>

            <div class="schedule">

                <div class="schedule-track">

                    <div class="schedule-item" v-for="task in tasks"></div>

                    <div class="schedule-nothing" v-if="!tasks.length" :style="{ 'justify-content': tasks.length ? 'flex-start' : 'center' }">
                        <span>当前无任务</span>
                    </div>

                </div>

                <div class="schedule-tasks">

                    <div class="schedule-item" v-for="task in tasks"></div>

                </div>

            </div>

            <div class="todo">

                <div class="todo-item"></div>

                <div class="todo-nothing" v-if="!tasks.length">
                    <span>当前无待办</span>
                </div>

            </div>

        </frame>

    </div>
</template>

<style lang="sass">
#clock
    position: absolute
    width: 100%
    height: 100%
    z-index: -1

.home
    position: relative

    &-content
        position: relative
        display: flex
        flex-direction: column
        height: 100vh

.schedule
    background-color: rgba(35, 35, 35, 0.13)
    position: relative
    flex: 2

    &-track
        display: flex
        flex-direction: row
        align-items: center
        min-height: 10%
        background-color: #f75a5a
        position: absolute
        top: 15%
        left: 50%
        transform: translate(-50%, -50%) /* 相对于元素自身的中心点进行移动，以使其完全居中 */
        width: 50%
        height: 25%

    &-tasks
        display: flex
        flex-direction: row
        align-items: center
        min-height: 10%
        background-color: #efe41f
        position: absolute
        top: 45%
        left: 50%
        transform: translate(-50%, -50%) /* 相对于元素自身的中心点进行移动，以使其完全居中 */
        width: 50%
        height: 25%

    &-item
        width: 100%

    &-nothing
        text-align: center

.todo
    display: flex
    flex-direction: row
    align-items: center
    background-color: #2230d5
    position: absolute
    top: 73%
    left: 50%
    transform: translate(-50%, -25%) /* 相对于元素自身的中心点进行移动，以使其完全居中 */
    width: 50%
    height: 25%

    &-item
        width: 100%

    &-nothing
        text-align: center



</style>