/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

import {createRouter, createWebHistory} from 'vue-router'
import { Store_ } from "@/stores";
import { logo } from "@/assets/common";
import home from "../components/home.vue";
import login from "../components/login.vue";
import createTP from "@/components/createTP.vue";
import scanQues from "@/components/scanQues.vue";
import addQues from "@/components/addQues.vue";
import exam from "@/components/exam.vue";
import customType from "@/components/customType.vue";
import examEnd from "@/components/examEnd.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: (home as any)
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/createTP',
            name: 'createTP',
            component: createTP
        },
        {
            path: '/scanQues',
            name: 'scanQues',
            component: scanQues
        },
        {
            path: '/addQues',
            name: 'addQues',
            component: addQues
        },
        {
            path: '/exam',
            name: 'exam',
            component: exam
        },
        {
            path: '/customType',
            name: 'customType',
            component: customType
        },
        {
            path: '/examEnd',
            name: 'examEnd',
            component: examEnd
        }
    ]
})


router.beforeEach((to, from, next) => {
    const store = Store_()

    switch (to.name) {
        case 'home':
            store.window_.title = 'Exam Platform';
            store.window_.leftIcon = true;
            store.window_.bgColor = "#3289ff";
            store.window_.logo = logo.home;
            store.window_.scroll = false;
            break;
        case 'login':
            store.window_.title = 'Login';
            store.window_.leftIcon = false;
            store.window_.bgColor = "#3289ff";
            store.window_.logo = logo.login;
            store.window_.scroll = false;
            break;
        case 'createTP':
            store.window_.title = 'Create Test Paper';
            store.window_.leftIcon = false;
            store.window_.bgColor = "#202020";
            store.window_.logo = logo.createTP;
            store.window_.scroll = false;
            break;
        case 'scanQues':
            store.window_.title = `Browsing Questions For ${store.user?.TPs[store.idSet.TP].name}` || 'Test Paper';
            store.window_.logo = logo.scanQues;
            store.window_.leftIcon = false;
            store.window_.bgColor = "#092035";
            store.window_.scroll = false;
            break;
        case 'exam':
            store.window_.title = store.user?.TPs[store.idSet.TP].name || 'Exam';
            store.window_.logo = logo.exam;
            store.window_.leftIcon = false;
            store.window_.bgColor = "#3289ff";
            store.window_.scroll = false;
            break;
        case 'customType':
            store.window_.title = 'Customize Question Shown Method'
            store.window_.leftIcon = false;
            store.window_.bgColor = "#202020";
            store.window_.logo = logo.customType;
            store.window_.scroll = false;
            break;
        case 'examEnd':
            if (from.name !== 'exam') {
                next({name: 'scanQues'})
                return;
            }
            else {
                store.window_.title = 'Exam End'
                store.window_.leftIcon = false;
                store.window_.bgColor = "#7073b1";
                store.window_.logo = logo.examEnd;
                store.window_.scroll = true;
            }

            break;
        default:
            break;
    }

    next();
})


export default router
