/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { createRouter, createWebHistory } from "vue-router";
import home from "@/components/home.vue";
import paper from "@/components/paper.vue";
import setting from "@/components/setting.vue";
import ques from "@/components/ques.vue";
import user from "@/components/user.vue";
import custom from "@/components/custom.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: home,
        },
        {
            path: "/add",
            name: "paper",
            component: paper,
        },
        {
            path: "/setting",
            name: "setting",
            component: setting,
        },
        {
            path: "/ques",
            name: "ques",
            component: ques
        },
        {
            path: "/user",
            name: "user",
            component: user
        },
        {
            path: "/custom",
            name: "custom",
            component: custom
        }
    ],
});

export default router;
