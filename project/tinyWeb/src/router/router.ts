import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { Store_ } from "@/stores/stores";
import home from "@/components/home.vue";
import login from "@/components/login.vue";
import profile from "@/components/profile.vue";

const router = createRouter({
//    history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: home
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
        {
            path: "/profile",
            name: "profile",
            component: profile
        }
    ]
});

router.beforeEach((to, from, next) => {
    const store = Store_();
    store.controlOnly = ["login"].includes(to.name as string);

    next();
})

export default router;
