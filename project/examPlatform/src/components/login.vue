<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->

<script lang="ts">
import { defineComponent } from "vue";
import  { Store_ } from '@/stores';
import { mapState } from "pinia";
import { appUrl } from "@/assets/common";
import { $, request } from "../../../../jsPackage/src/comFunc";
import { rsp } from "@/assets/common";
import { dirTran } from "@/assets/mathKit";
import router from "@/router";
import pageHeader from "@/components/pageHeader.vue";


export default defineComponent({
    data() {
        return {
            flag: false,
            userInfo: {
                name: "",
                password: "",
                captcha: ""
            },
            captcha: '' as string,
            nowCaptcha: [],
        }
    },
    setup() {
        const store = Store_();

        return { store }
    },
    created() {
        this.getCaptcha();
    },
    computed: {
        ...mapState(Store_, {
            user: "user",
            window_: "window_",
        })
    },
    components: {
        pageHeader
    },
    methods: {
        select(event: MouseEvent, flag: boolean) {
            this.flag = flag;

            const selected = document.getElementsByClassName("selected");
            let target: HTMLElement = <HTMLElement>event.target;

            while (target.nodeName !== 'A')
                target = <HTMLElement>target.parentNode;


            if (selected.length && selected[0] !== target)
                selected[0].classList.remove("selected");

            target.classList.add("selected");
        },
        randomColor() {
            return `rgb(${Array.from({length: 3}, () => Math.floor(Math.random() * 256)).join(',')})`
        },
        getCaptcha() {
            request(appUrl, "", {type: "captcha"}, "POST")
                    .then((res: rsp.Std<string>) => {
                        this.captcha = res.data
                    })
        },
        drawCaptcha(num: any[]) {
            while (num.length > 0) num.pop();

            const captcha: HTMLCanvasElement = <HTMLCanvasElement>$.id("captcha");

            if (!captcha) return;

            const [capW, capH] = [captcha.width, captcha.height];

            const ctx = captcha.getContext("2d");

            for (let i = 0; i <= 3; i++) {
                const j = Math.floor(Math.random() * this.captcha.length)  // 产生随机索引

                const deg = Math.random() * 30 * Math.PI / 180;  // 产生随机角度

                let text = this.captcha[j];  // 随机字符

                num.push(text.toLowerCase());  // 存入数组

                const [x, y] = [10 + i * 20, 10 + Math.random() * 8]  // 随机坐标

                ctx.font = "bold 30px Arial";

                ctx.translate(x, y);  // 平移坐标系
                ctx.rotate(deg);  // 旋转坐标系

                ctx.fillStyle = this.randomColor();  // 随机颜色
                ctx.fillText(text, 0, 15);  // 绘制字符

                ctx.rotate(-deg);
                ctx.translate(-x, -y);

            }
            for (let i = 0; i <= 10; i++) {  // 绘制干扰线
                ctx.strokeStyle = this.randomColor();
                ctx.beginPath();

                const pointArr = Array.from({length: 4}, (_, index) => Math.random() * (index % 2 ? capW : capH))

                const [cosRes, sinRes] = dirTran(...pointArr)  // @ts-ignore

                ctx.moveTo(pointArr[0], pointArr[1]);
                ctx.lineTo(pointArr[0] + cosRes * 25, pointArr[1] + sinRes * 25);
                ctx.stroke();
            }
            for (let i = 0; i <= 30; i++) {  // 绘制干扰点
                ctx.strokeStyle = this.randomColor();
                ctx.beginPath();

                const pointArr = Array.from({length: 4}, (_, index) => Math.random() * (index % 2 ? capW : capH))

                const [cosRes, sinRes] = dirTran(...pointArr)  // @ts-ignore

                ctx.moveTo(pointArr[0], pointArr[1]);
                ctx.lineTo(pointArr[0] + cosRes * 2, pointArr[1] + sinRes * 2);
                ctx.stroke();
            }

        },
        updateCaptcha() {
            this.getCaptcha();

            let ctx = ($.id("captcha") as HTMLCanvasElement).getContext("2d")

            ctx.clearRect(0, 0, 100, 50);
        },
        submit() {
            if (this.flag && this.nowCaptcha.join('') !== this.userInfo.captcha) alert("验证码错误");

            const type = this.flag ? "register" : "login"

            request(appUrl, type, {name: this.userInfo.name, password: $.toHash(this.userInfo.password), ip: location.origin}, "POST")
                    .then((res: rsp.Std<number>) => {
                        if (res.code === 200) {
                            if (this.flag) {
                                this.flag = false;
                                const pt = document.getElementById("password-type");
                                const rt = document.getElementById("register-type");

                                pt.classList.add("selected");
                                rt.classList.remove("selected");
                            }
                            else {
                                if (!this.flag) {
                                    this.store.updateUserId(res.data);
                                    router.push("/");
                                }
                            }
                        }
                        else console.error(`${res.code} - ${type} failed: ${res.msg}!`);
                    })
        },
    },
    watch: {
        captcha(newVal, oldVal) {
            this.drawCaptcha(this.nowCaptcha);
        },
        flag(newVal, oldVal) {
            if (newVal) this.getCaptcha();
        }
    }
})
</script>

<template>

    <div class="root">

        <pageHeader>

            <div class="body-part">

                <header class="login-form-header">

                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256">
                        <defs>
                            <linearGradient id="IconifyId1908e5d4a4c2715e61582" x1="43.896%" x2="66.16%" y1="1.951%"
                                            y2="95.244%">
                                <stop offset="28%" stop-color="#07C3F2"/>
                                <stop offset="94%" stop-color="#087CFA"/>
                            </linearGradient>
                            <linearGradient id="IconifyId1908e5d4a4c2715e61583" x1="33.063%" x2="70.362%" y1="15.078%"
                                            y2="84.685%">
                                <stop offset="14%" stop-color="#FCF84A"/>
                                <stop offset="37%" stop-color="#07C3F2"/>
                            </linearGradient>
                            <linearGradient id="IconifyId1908e5d4a4c2715e61584" x1="44.416%" x2="56.203%" y1="25.058%"
                                            y2="90.203%">
                                <stop offset="28%" stop-color="#07C3F2"/>
                                <stop offset="94%" stop-color="#087CFA"/>
                            </linearGradient>
                        </defs>
                        <path fill="url(#IconifyId1908e5d4a4c2715e61582)"
                              d="M34.507 231.36L0 26.827L63.813.347L104.56 24.56l37.333-20.133l77.787 29.866L176.053 256z"/>
                        <path fill="url(#IconifyId1908e5d4a4c2715e61583)"
                              d="m256 86.693l-33.04-81.6L163.013 0L70.48 88.907l24.907 114.586l46.506 32.614L256 168.4l-28-52.507z"/>
                        <path fill="url(#IconifyId1908e5d4a4c2715e61584)"
                              d="m204.72 74.533l23.28 41.36l28-29.2l-20.56-50.826z"/>
                        <path d="M48 48h160v160H48z"/>
                        <path fill="#FFF"
                              d="M67.947 177.76h60v10h-60zm56.8-109.84l-8.934 35.013L105.6 67.92H95.44L85.2 102.933L76.293 67.92h-14l17.147 60.027h11.253l9.814-34.747l9.706 34.747H121.6l17.12-60.027zm16.48 51.707l7.813-9.6a27.57 27.57 0 0 0 17.973 7.306c5.334 0 8.694-2.133 8.694-5.68v-.16c0-1.899-.665-3.27-3.058-4.57l-.382-.2l-.41-.198l-.216-.1l-.454-.198l-.238-.1l-.5-.198l-.531-.2l-.278-.1l-.58-.2l-.303-.102l-.63-.204l-.667-.206l-.347-.104l-.72-.21l-.758-.214l-.795-.216l-.835-.221l-1.605-.416l-1.144-.307l-.748-.207l-.734-.21l-.72-.215l-.707-.217l-.694-.222l-.68-.227l-.334-.115l-.658-.235l-.643-.241l-.629-.248l-.614-.255l-.301-.13l-.591-.267l-.576-.275c-5.582-2.748-8.889-6.796-8.998-14.338l-.002-.574c0-10.792 8.59-17.98 20.68-18.13l.386-.003a34.67 34.67 0 0 1 22.347 7.653l-6.88 9.974a28.1 28.1 0 0 0-15.653-5.92c-5.067 0-7.734 2.32-7.734 5.333v.187c0 2.402.988 3.856 4.09 5.227l.456.196q.237.098.487.194l.518.195l.548.196l.58.196l.611.199l.646.2l.679.203l1.083.312l.767.213l.803.217l1.719.452q.426.112.843.225l.826.23q.205.057.407.116l.8.236l.781.242l.765.247l.746.252l.728.26l.357.131l.7.27c7.724 3.045 12.013 7.432 12.138 15.507l.002.524c0 11.946-9.12 18.667-22.106 18.667a38.24 38.24 0 0 1-25.52-9.627"/>
                    </svg>

                    <h2 class="login-form-text" style="margin-left: 10px">Webstorm</h2>

                </header>

                <form class="login-form" @submit.prevent="submit">

                    <div class="gapbottom-20">

                        <ul class="stdlist type-list">

                            <li @click="select($event, false)">

                                <a id="password-type" class="stdlink textlightmode stdText-18 underline-l slowtrans selected">

                                    <span>By Password</span>

                                </a>

                            </li>

                            <li @click="select($event, true)">

                                <a id="register-type" class="stdlink textlightmode stdText-18 underline-l slowtrans">

                                    <span>Register</span>

                                </a>

                            </li>

                        </ul>

                    </div>

                    <div class="login-field-container">

                        <div class="login-field-group">

                            <i class="login-icon-user"></i>
                            <input class="stdtextinput-5 input-text-name" type="text" name="name" placeholder="username" v-model="userInfo.name" required>

                        </div>

                        <div class="login-field-group">

                            <i class="login-icon-password"></i>
                            <input class="stdtextinput-5 input-text-password" type="password" name="password" placeholder="password" v-model="userInfo.password" required>

                        </div>

                        <div class="login-field-group" v-if="flag">

                            <input class="input-text-captcha" type="text" name="captcha" placeholder="captcha" v-model="userInfo.captcha" required>

                            <canvas id="captcha" width="100" height="35" @click="updateCaptcha">

                            </canvas>

                        </div>

                        <input class="stdbtn login-submit-btn" type="submit" :value="flag ? 'Register' : 'Log in'">

                    </div>

                </form>

            </div>

        </pageHeader>

    </div>

</template>

<style>
@font-face {
    font-family: 'Losttimoh';
    src: url("@/assets/Losttimoh-3.ttf");
}

.body-part {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -315px;
    margin-left: -200px;
    width: 400px;
    height: 630px;
    background: #1c1c1c;
    box-shadow: 0 0 10px 0 rgba(0, 33, 79, 0.11);
    border-radius: 6px;
}

.login-form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
}

.login-form-text {
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: 'Losttimoh', sans-serif;
}

.login-form {
    height: 82%;
}

.type-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.login-field-container {
    display: flex;
    flex-direction: column;
    padding: 30px 20px;
    height: 50%;
    justify-content: space-around;
}

.login-field-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
}

.login-icon-user {
    width: 32px;
    height: 32px;
    background: url("@/assets/icon.png") -110px 6px no-repeat;
}

.login-icon-password {
    width: 32px;
    height: 32px;
    background: url("@/assets/icon.png") -80px 6px no-repeat;
}

.input-text-name {
    padding-right: 32%;
}

.input-text-password {
    width: 90%;
}

.input-text-captcha {
    width: 53%;
}

#captcha {
    cursor: pointer;
    background-color: #6e6e6e;
}

.login-submit-btn {
    background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
}

.login-submit-btn:hover {
    filter: brightness(90%);
    box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.11);
}

</style>