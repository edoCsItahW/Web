<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>

<template>
    <div class="frame">

        <header class="frame-header">

            <div class="frame-header-logo">

                <img src="@/assets/svg/logo.svg" alt="logo">

            </div>

            <div class="frame-header-tools">

                <ul class="frame-header-list">

                    <li class="frame-header-item">

                        <img src="@/assets/svg/avatar.svg" alt="avatar">

                    </li>

                </ul>

            </div>

        </header>

        <slot>

        </slot>

        <footer class="frame-footer">

            <p>
                <a rel="cc:attributionURL" href="https://github.com/edoCsItahW" target="_blank">This work</a>

                by

                <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://2207150234@st.sziit.edu.cn">Xiao Songtao</a>

                is licensed under

                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>


        </footer>

    </div>


</template>

<style lang="sass">
@import "@/assets/globals"


.frame
    &-header
        @extend %split
        background-color: auto-theme()
        padding: 6px 22px

    &-footer
        position: absolute
        bottom: 0
        width: 100%
        text-align: center
        background-color: auto-theme()
        color: auto-theme($COLOR-DICT-REVERSE)

</style>