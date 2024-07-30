/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import './assets/main.css'


import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from "pinia";
import uploader from 'vue-simple-uploader'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(uploader)

app.mount('#app')
