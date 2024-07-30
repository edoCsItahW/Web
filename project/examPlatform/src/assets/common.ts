/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { reactive } from "vue";


export const appUrl = location.origin + "/api/"

export const letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export const numberList = Array.from({length: 10}, (_, i) => String(i))
export const boolList = ['True', 'False']

/* 标准响应类型 */

export namespace rsp {  // 标准响应类型
    export interface TP {
        id: number,
        name: string,
        desc: string,
        fileName: string,
        fileData: string,
        quesPool: object
    }

    export interface User {
        name: string,
        password: string,
        id: number,
        ip: string,
        customType: CusType.cls
        TPs: Array<TP>
    }

    export interface Std<T> {
        code: number,
        msg: string,
        data: T
    }
}


/* 标准请求类型 */

export namespace req {  // 标准请求类型
    export interface Std<T> {
        url: string,
        body: T,
        query: object,
        headers: object,
    }

    export interface RegAndLog {
        name: string,
        password: string,
        ip: string
    }

    export interface Normal<T> {
        type: string,
        data: T
    }

    export interface User {
        uid: number
    }

    export interface TP {
        uid: string
        name: string,
        desc: string,
        duration: string,
        file: File
    }

    export interface Ques {
        uid: string,
        tpId: number,
        type: string,
        content: object
    }

    export interface DelQues {
        uid: number,
        TP: number,
        type: string,
        id: number
    }

    export interface module {
        fontSize: number,
        order: number,
        num: number,
        type: string,
        method: string,
    }

    export interface CustomType {
        uid: string,
        name: string,
        modules: Array<module>
    }

}


/* icon定义 */

export namespace logo {
    export const home = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 286'>\n" +
        "                <defs>\n" +
        "                    <linearGradient x1='0%' y1='50%' x2='100%' y2='50%' id='IconifyId19082901379fdac601560'>\n" +
        "                        <stop stop-color='#52F2C9' offset='0%'/>\n" +
        "                        <stop stop-color='#52F2C9' offset='9.876%'/>\n" +
        "                        <stop stop-color='#8573E2' offset='100%'/>\n" +
        "                    </linearGradient>\n" +
        "                </defs>\n" +
        "                <path d='M22.37 285.192c-3.854 0-7.706-1.016-11.214-3.048C4.171 278.096 0 270.859 0 262.786V21.908c0-7.887 4.073-14.96 10.895-18.92c6.822-3.96 14.983-3.985 21.832-.071l155.474 88.847a7.995 7.995 0 0 1-7.933 13.88L24.795 16.799c-2.658-1.518-4.994-.493-5.876.019c-.881.512-2.931 2.032-2.931 5.09v240.879c0 3.32 2.226 4.969 3.183 5.523c.957.555 3.494 1.668 6.375.015l200.493-114.952h-23.111a7.995 7.995 0 0 1-7.994-7.995v-5.33h-9.992v18.154a7.995 7.995 0 0 1-7.994 7.994h-25.314a7.995 7.995 0 0 1-7.994-7.994v-33.308h-10.242v56.373a7.994 7.994 0 0 1-7.994 7.994h-26.23a7.995 7.995 0 0 1-7.994-7.994V101.41h-9.825v108.583a7.995 7.995 0 0 1-7.995 7.994H46.714a7.994 7.994 0 0 1-7.994-7.994V65.77h-3.331a7.994 7.994 0 1 1 0-15.988h11.325a7.994 7.994 0 0 1 7.994 7.994V202h10.658V93.417a7.994 7.994 0 0 1 7.994-7.994h25.814a7.994 7.994 0 0 1 7.994 7.994v79.855h10.242v-56.373a7.995 7.995 0 0 1 7.994-7.994h26.23a7.994 7.994 0 0 1 7.994 7.994v33.308h9.326v-18.153a7.994 7.994 0 0 1 7.994-7.994h25.98a7.994 7.994 0 0 1 7.994 7.994v5.329h34.144c5.02 0 9.261 3.26 10.552 8.11c1.292 4.852-.767 9.789-5.123 12.285L33.498 282.194c-3.487 1.999-7.308 2.998-11.128 2.998'\n" +
        "                      fill='url(#IconifyId19082901379fdac601560)'/>\n" +
        "            </svg>"

    export const login = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 256'>\n" +
        "                    <path fill='#F7DF1E' d='M0 0h256v256H0z'/>\n" +
        "                    <path d='m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574'/>\n" +
        "                </svg>"

    export const createTP = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 256'>\n" +
        "                    <defs>\n" +
        "                        <linearGradient id='IconifyId1908614ef135babcd1560' x1='43.896%' x2='66.16%' y1='1.951%'\n" +
        "                                        y2='95.244%'>\n" +
        "                            <stop offset='28%' stop-color='#07C3F2'/>\n" +
        "                            <stop offset='94%' stop-color='#087CFA'/>\n" +
        "                        </linearGradient>\n" +
        "                        <linearGradient id='IconifyId1908614ef135babcd1561' x1='33.063%' x2='70.362%' y1='15.078%'\n" +
        "                                        y2='84.685%'>\n" +
        "                            <stop offset='14%' stop-color='#FCF84A'/>\n" +
        "                            <stop offset='37%' stop-color='#07C3F2'/>\n" +
        "                        </linearGradient>\n" +
        "                        <linearGradient id='IconifyId1908614ef135babcd1562' x1='44.416%' x2='56.203%' y1='25.058%'\n" +
        "                                        y2='90.203%'>\n" +
        "                            <stop offset='28%' stop-color='#07C3F2'/>\n" +
        "                            <stop offset='94%' stop-color='#087CFA'/>\n" +
        "                        </linearGradient>\n" +
        "                    </defs>\n" +
        "                    <path fill='url(#IconifyId1908614ef135babcd1560)'\n" +
        "                          d='M34.507 231.36L0 26.827L63.813.347L104.56 24.56l37.333-20.133l77.787 29.866L176.053 256z'/>\n" +
        "                    <path fill='url(#IconifyId1908614ef135babcd1561)'\n" +
        "                          d='m256 86.693l-33.04-81.6L163.013 0L70.48 88.907l24.907 114.586l46.506 32.614L256 168.4l-28-52.507z'/>\n" +
        "                    <path fill='url(#IconifyId1908614ef135babcd1562)'\n" +
        "                          d='m204.72 74.533l23.28 41.36l28-29.2l-20.56-50.826z'/>\n" +
        "                    <path d='M48 48h160v160H48z'/>\n" +
        "                    <path fill='#FFF'\n" +
        "                          d='M67.947 177.76h60v10h-60zm56.8-109.84l-8.934 35.013L105.6 67.92H95.44L85.2 102.933L76.293 67.92h-14l17.147 60.027h11.253l9.814-34.747l9.706 34.747H121.6l17.12-60.027zm16.48 51.707l7.813-9.6a27.57 27.57 0 0 0 17.973 7.306c5.334 0 8.694-2.133 8.694-5.68v-.16c0-1.899-.665-3.27-3.058-4.57l-.382-.2l-.41-.198l-.216-.1l-.454-.198l-.238-.1l-.5-.198l-.531-.2l-.278-.1l-.58-.2l-.303-.102l-.63-.204l-.667-.206l-.347-.104l-.72-.21l-.758-.214l-.795-.216l-.835-.221l-1.605-.416l-1.144-.307l-.748-.207l-.734-.21l-.72-.215l-.707-.217l-.694-.222l-.68-.227l-.334-.115l-.658-.235l-.643-.241l-.629-.248l-.614-.255l-.301-.13l-.591-.267l-.576-.275c-5.582-2.748-8.889-6.796-8.998-14.338l-.002-.574c0-10.792 8.59-17.98 20.68-18.13l.386-.003a34.67 34.67 0 0 1 22.347 7.653l-6.88 9.974a28.1 28.1 0 0 0-15.653-5.92c-5.067 0-7.734 2.32-7.734 5.333v.187c0 2.402.988 3.856 4.09 5.227l.456.196q.237.098.487.194l.518.195l.548.196l.58.196l.611.199l.646.2l.679.203l1.083.312l.767.213l.803.217l1.719.452q.426.112.843.225l.826.23q.205.057.407.116l.8.236l.781.242l.765.247l.746.252l.728.26l.357.131l.7.27c7.724 3.045 12.013 7.432 12.138 15.507l.002.524c0 11.946-9.12 18.667-22.106 18.667a38.24 38.24 0 0 1-25.52-9.627'/>\n" +
        "                </svg>"

    export const scanQues = "<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 512 225'>\n" +
        "                    <path fill='#14D8CC' fill-rule='evenodd' d='M512 7.66v158.324c0 4.231-3.44 7.66-7.68 7.66H327.68v43.412c0 4.231-3.438 7.66-7.68 7.66H7.68c-4.242 0-7.68-3.429-7.68-7.66V58.733c0-4.229 3.438-7.661 7.68-7.661h304.64V7.661C312.32 3.429 315.76 0 320 0h184.32c4.24 0 7.68 3.43 7.68 7.66m-50.596 45.455a2.05 2.05 0 0 0-2.045-2.043h-10.24a2.05 2.05 0 0 0-2.048 2.043v38.398c0 .613-.717.818-.922.205L432.123 52.91c-.307-.922-1.024-1.839-2.56-1.839H417.38a2.05 2.05 0 0 0-2.048 2.043v67.402c0 1.124.924 2.043 2.048 2.043h10.237a2.05 2.05 0 0 0 2.048-2.043V85.18c0-.612.717-.814.922-.204l13.926 35.848c.305.817 1.022 1.736 2.763 1.736h12.083a2.05 2.05 0 0 0 2.045-2.043zm-57.444 57.698a2.05 2.05 0 0 0-2.048-2.04h-8.701c-.615 0-1.024-.406-1.024-1.021V65.88c0-.613.41-1.024 1.024-1.024h7.68a2.05 2.05 0 0 0 2.045-2.04v-9.701a2.05 2.05 0 0 0-2.045-2.043h-31.739c-1.126 0-2.05.917-2.05 2.043v9.701a2.05 2.05 0 0 0 2.05 2.04h7.677c.615 0 1.024.411 1.024 1.024v41.872c0 .615-.41 1.021-1.024 1.021h-8.701a2.05 2.05 0 0 0-2.048 2.04v9.704c0 1.124.922 2.043 2.048 2.043h33.784a2.05 2.05 0 0 0 2.048-2.043zm-91.64-44.42H16.64a1.28 1.28 0 0 0-1.28 1.277v140.448c0 .705.573 1.277 1.28 1.277h294.4c.707 0 1.28-.572 1.28-1.277zm-45.376 92.941c1.126 0 2.048.92 2.048 2.043v10.212a2.05 2.05 0 0 1-2.048 2.043h-37.573a2.05 2.05 0 0 1-2.048-2.043v-67.402a2.05 2.05 0 0 1 2.048-2.043h37.163a2.05 2.05 0 0 1 2.048 2.043v10.212a2.05 2.05 0 0 1-2.048 2.043H242.68c-.614 0-1.026.408-1.026 1.021v12.255c0 .613.412 1.021 1.026 1.021h23.035c1.127 0 2.048.92 2.048 2.043v10.212a2.05 2.05 0 0 1-2.048 2.043H242.68c-.614 0-1.026.408-1.026 1.021v12.255c0 .613.412 1.021 1.026 1.021zm-53.04-57.19a2.05 2.05 0 0 1 2.045 2.043v67.402a2.05 2.05 0 0 1-2.046 2.043H201.82c-1.74 0-2.457-.92-2.762-1.736l-13.926-35.848c-.205-.61-.922-.408-.922.204v35.337a2.05 2.05 0 0 1-2.048 2.043h-10.238a2.053 2.053 0 0 1-2.048-2.043v-67.402c0-1.126.925-2.043 2.048-2.043h12.184c1.538 0 2.252.917 2.56 1.839l14.026 38.807c.207.613.921.408.921-.205v-38.398a2.05 2.05 0 0 1 2.048-2.043zm-57.754 0c1.129 0 2.048.917 2.048 2.043v48c0 12.357-10.238 22.569-24.369 22.569c-13.921 0-24.161-10.212-24.161-22.57v-48a2.05 2.05 0 0 1 2.05-2.042h10.34c1.124 0 2.048.917 2.048 2.043v48c0 4.492 3.684 8.169 9.723 8.169c6.25 0 9.933-3.677 9.933-8.17v-48a2.05 2.05 0 0 1 2.048-2.042zm-56.318 2.043v10.212a2.05 2.05 0 0 1-2.048 2.043H84.987c-.615 0-1.024.408-1.024 1.021v54.126a2.053 2.053 0 0 1-2.048 2.043H71.677a2.05 2.05 0 0 1-2.048-2.043v-54.126c0-.613-.41-1.021-1.024-1.021H55.808a2.05 2.05 0 0 1-2.048-2.043v-10.212c0-1.126.919-2.043 2.048-2.043h41.976a2.05 2.05 0 0 1 2.048 2.043'/>\n" +
        "                </svg>"

    export const exam = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 256'>\n" +
        "                    <circle cx='128.002' cy='128.002' r='128.002' fill='#60B57D'/>\n" +
        "                    <path fill='#FFF'\n" +
        "                          d='M117.82 59.143a3.605 3.605 0 0 1-4.515 5.62c-9.397-7.547-17.224-10.04-22.051-7.575c-5.618 2.865-7.797 12.083-6.663 24.946l.17 1.737q.144 1.319.33 2.682l.269 1.839q.5 3.227 1.235 6.67c6.767-1.05 14.05-1.735 21.698-2.02a198 198 0 0 1 10.079-11.969l1.698-1.83c4.246-4.513 8.505-8.553 12.696-12.049l1.673-1.37c15.295-12.285 29.531-17.146 38.738-11.168c8.02 5.203 10.17 16.989 7.19 32.783a3.605 3.605 0 1 1-7.084-1.336c2.495-13.227.852-22.232-4.03-25.4c-6.348-4.12-18.142.623-31.44 11.701l-1.484 1.257a127 127 0 0 0-2.246 1.982l-1.51 1.383a150 150 0 0 0-4.571 4.446l-1.535 1.577q-.384.4-.769.805l-1.54 1.647l-1.54 1.691l-1.541 1.736q-.772.879-1.54 1.78l-1.54 1.822l-.299.363c3.586.019 7.235.123 10.932.315l1.435.08l2.852.182q3.551.25 7.017.599l2.758.295q.685.078 1.368.159l2.711.341q3.371.445 6.635.984l2.592.444l2.555.473l2.515.501c8.32 1.716 15.97 3.888 22.71 6.434l1.996.775c17.704 7.074 28.614 16.812 28.054 27.576c-.464 8.898-8.44 16.244-21.81 21.507a3.605 3.605 0 1 1-2.64-6.708c11.024-4.34 16.971-9.817 17.25-15.174c.358-6.858-7.848-13.951-21.507-19.672l-1.7-.694q-1.726-.687-3.557-1.343l-1.856-.649q-.94-.32-1.904-.632l-1.954-.615l-2-.598q-.505-.147-1.017-.292l-2.068-.57q-.522-.14-1.05-.278l-2.133-.54a175 175 0 0 0-6.645-1.498l-2.293-.456l-1.16-.22l-2.348-.42l-2.382-.398l-1.204-.19l-2.432-.36q-1.224-.174-2.463-.334l-2.495-.309l-2.523-.282a217 217 0 0 0-3.837-.37l-2.59-.213q-1.302-.099-2.616-.182l-2.639-.154l-2.64-.121l-2.62-.09a217 217 0 0 0-8.993-.068l-2.06.038l-.81 1.074a214 214 0 0 0-1.505 2.045l-1.496 2.082a221 221 0 0 0-6.566 9.801l-1.388 2.224a217 217 0 0 0-4.232 7.177q.184.453.375.908l.98 2.314q.249.58.504 1.162l1.036 2.331l1.074 2.342l1.112 2.349l1.15 2.356l1.186 2.362l1.215 2.348l1.233 2.314l1.249 2.28l.63 1.126l1.272 2.227q.64 1.104 1.285 2.19l1.298 2.152q.652 1.065 1.31 2.113l1.32 2.075l1.329 2.034a192 192 0 0 0 3.356 4.904l1.353 1.886a175 175 0 0 0 2.717 3.64l1.362 1.75l1.363 1.705q.341.42.682.834l1.362 1.632l1.36 1.583a129 129 0 0 0 4.06 4.446l1.342 1.377l1.334 1.324a99 99 0 0 0 1.985 1.884l1.31 1.186a82 82 0 0 0 1.945 1.673l1.28 1.042c8.703 6.925 16.414 9.722 21.534 7.11c4.807-2.45 7.102-9.608 6.932-19.757l-.043-1.545a73 73 0 0 0-.081-1.588l-.118-1.63a86 86 0 0 0-.154-1.672l-.192-1.712l-.109-.87l-.246-1.769l-.284-1.805l-.32-1.84a128 128 0 0 0-.959-4.747l-.448-1.954l-.484-1.983q-.126-.5-.256-1.002l-.539-2.025l-.575-2.052l-.302-1.035l-.63-2.088l-.666-2.111q-.513-1.593-1.067-3.208l-.757-2.163l-.793-2.182a200 200 0 0 0-1.694-4.415l-.902-2.23l-.937-2.243l-.482-1.126l-.991-2.261l-1.028-2.272q-.261-.569-.527-1.139l-1.08-2.284l-.555-1.145a3.605 3.605 0 1 1 6.48-3.159l1.196 2.49q.588 1.243 1.156 2.482l1.118 2.474a220 220 0 0 1 3.112 7.356l.957 2.426q.235.605.464 1.208l.896 2.403q.219.598.433 1.195l.835 2.376a185 185 0 0 1 1.545 4.694l.71 2.315c8.5 28.409 7.41 51.515-5.34 58.016c-10.313 5.26-24.936-2.046-39.655-17.456l-1.523-1.622a138 138 0 0 1-3.044-3.415l-1.518-1.79c-4.046-4.844-8.055-10.257-11.938-16.147l-1.45-2.231a226 226 0 0 1-10.398-18.043l-.657-1.279a239 239 0 0 1-1.288-2.564l-1.247-2.559a230 230 0 0 1-2.826-6.112l-.582 1.151q-.27.54-.533 1.08l-1.038 2.147l-.997 2.132l-.958 2.114q-.234.527-.463 1.051l-.896 2.087q-.219.518-.433 1.035l-.836 2.056q-.204.51-.402 1.019l-.774 2.02q-.188.502-.37 1.002l-.712 1.983l-.67 1.956q-.487 1.456-.926 2.88l-.565 1.883l-.522 1.851q-.125.459-.245.913l-.458 1.8a92 92 0 0 0-.956 4.344l-.307 1.67c-2.04 11.83-.71 20.554 4.345 23.835c5.092 3.303 14.533.79 26.183-7.62a3.605 3.605 0 1 1 4.22 5.845c-13.807 9.968-26.013 13.216-34.327 7.822c-10.046-6.519-10.752-23.757-4.066-45.202l.694-2.158q.717-2.172 1.532-4.395l.838-2.233a173 173 0 0 1 3.825-9.143l1.072-2.33l1.117-2.346a208 208 0 0 1 4.582-8.897q-.324-.828-.641-1.653l-.933-2.475a189 189 0 0 1-3.296-9.713l-.714-2.374a163 163 0 0 1-1.24-4.466q-.667.134-1.322.272l-1.96.431l-1.913.453q-.472.116-.938.234l-1.84.483l-1.787.504q-.882.257-1.736.523l-1.683.542q-.828.276-1.628.561l-1.572.579c-10.803 4.113-17.383 9.51-17.69 15.388c-.279 5.358 5.068 11.423 15.584 16.883a3.605 3.605 0 1 1-3.322 6.398C46.567 140.033 39.395 131.898 39.86 123c.645-12.406 16.305-21.875 39.597-26.656c-4.714-22.525-2.315-40.051 8.52-45.577c8.009-4.088 18.472-.757 29.842 8.377m19.753 67.051c1.196 5.536-2.322 10.99-7.857 12.188c-5.536 1.196-10.99-2.322-12.188-7.858c-1.194-5.535 2.322-10.989 7.858-12.187c5.535-1.196 10.989 2.322 12.187 7.857m-34.898-25.606l-.65.045q-.746.053-1.484.113l-2.345.202l-2.31.228q-.573.06-1.141.124l-2.256.267l-1.113.143l-2.198.304l-.872.133l.308 1.151a167 167 0 0 0 1.568 5.342l.694 2.18l.362 1.1l.752 2.213q.31.895.633 1.798a239 239 0 0 1 3.54-5.705l.78-1.208a235 235 0 0 1 5.732-8.43'/>\n" +
        "                </svg>"

    export const customType = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 288'>\n" +
        "            <path fill='#649AD2'\n" +
        "                  d='M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781c-2.054-3.608-5.133-6.632-9.261-9.023c-34.08-19.651-68.195-39.242-102.264-58.913c-9.185-5.303-18.09-5.11-27.208.27c-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58C0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537c2.056 3.717 5.177 6.824 9.401 9.269c20.24 11.722 88.164 50.63 101.726 58.631c9.121 5.382 18.027 5.575 27.215.27c34.07-19.672 68.186-39.262 102.272-58.913c4.224-2.444 7.345-5.553 9.401-9.267c1.997-3.614 2.992-7.806 2.992-12.539c0 0 0-79.018-.013-118.539'/>\n" +
        "            <path fill='#004482'\n" +
        "                  d='m128.392 143.476l-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269c20.24 11.722 88.164 50.63 101.726 58.631c9.121 5.382 18.027 5.575 27.215.27c34.07-19.672 68.186-39.262 102.272-58.913c4.224-2.444 7.345-5.553 9.401-9.267z'/>\n" +
        "            <path fill='#1A4674'\n" +
        "                  d='M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33c15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141z'/>\n" +
        "            <path fill='#01589C'\n" +
        "                  d='M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667l124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539c0 0 0-79.018-.013-118.539'/>\n" +
        "            <path fill='#FFF'\n" +
        "                  d='M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738zM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759l-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094c-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33c15.659 0 29.325-8.51 36.647-21.153l.241-.423l36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851c-31.549 0-59.084-17.185-73.754-42.707c-7.162-12.459-11.26-26.904-11.26-42.307c0-46.95 38.061-85.013 85.014-85.013m75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738z'/>\n" +
        "        </svg>\n"

    export const examEnd = "<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 256 288'>\n" +
        "                <path fill='#649AD2'\n" +
        "                      d='M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781c-2.054-3.608-5.133-6.632-9.261-9.023c-34.08-19.651-68.195-39.242-102.264-58.913c-9.185-5.303-18.09-5.11-27.208.27c-13.565 8-81.48 46.91-101.719 58.632C4.071 67.6.015 74.984.013 84.58C0 124.101.013 163.62 0 203.141c0 4.73.993 8.923 2.993 12.537c2.056 3.717 5.177 6.824 9.401 9.269c20.24 11.722 88.164 50.63 101.726 58.631c9.121 5.382 18.027 5.575 27.215.27c34.07-19.672 68.186-39.262 102.272-58.913c4.224-2.444 7.345-5.553 9.401-9.267c1.997-3.614 2.992-7.806 2.992-12.539c0 0 0-79.018-.013-118.539'/>\n" +
        "                <path fill='#004482'\n" +
        "                      d='m128.392 143.476l-125.4 72.202c2.057 3.717 5.178 6.824 9.402 9.269c20.24 11.722 88.164 50.63 101.726 58.631c9.121 5.382 18.027 5.575 27.215.27c34.07-19.672 68.186-39.262 102.272-58.913c4.224-2.444 7.345-5.553 9.401-9.267z'/>\n" +
        "                <path fill='#1A4674'\n" +
        "                      d='M91.25 164.863c7.297 12.738 21.014 21.33 36.75 21.33c15.833 0 29.628-8.7 36.888-21.576l-36.496-21.141z'/>\n" +
        "                <path fill='#01589C'\n" +
        "                      d='M255.987 84.59c-.002-4.837-1.037-9.112-3.13-12.781l-124.465 71.667l124.616 72.192c1.997-3.614 2.99-7.806 2.992-12.539c0 0 0-79.018-.013-118.539'/>\n" +
        "                <path fill='#FFF'\n" +
        "                      d='M249.135 148.636h-9.738v9.74h-9.74v-9.74h-9.737V138.9h9.737v-9.738h9.74v9.738h9.738zM128 58.847c31.135 0 58.358 16.74 73.17 41.709l.444.759l-37.001 21.307c-7.333-12.609-20.978-21.094-36.613-21.094c-23.38 0-42.333 18.953-42.333 42.332a42.13 42.13 0 0 0 5.583 21.003c7.297 12.738 21.014 21.33 36.75 21.33c15.659 0 29.325-8.51 36.647-21.153l.241-.423l36.947 21.406c-14.65 25.597-42.228 42.851-73.835 42.851c-31.549 0-59.084-17.185-73.754-42.707c-7.162-12.459-11.26-26.904-11.26-42.307c0-46.95 38.061-85.013 85.014-85.013m75.865 70.314v9.738h9.737v9.737h-9.737v9.74h-9.738v-9.74h-9.738V138.9h9.738v-9.738z'/>\n" +
        "            </svg>"

}


/* 模块定义 */


export interface typeObj {
    name: string,
    num: number,
    fontSize: number,
    input: boolean,
    order: number,
    content?: any | any[] | object,
    inpType?: string,
    type?: string,
    method?: string,
    map?: string[],
    add?: boolean
}


const listMap: { [key: string]: string[] } = {
    letter: letterList,
    number: numberList,
    boolean: boolList
};


export interface Field {
    name: string,
    _input: boolean,
    _num: number,
    _order: number,
    fontSize: number,
    add: boolean,
    _type: string,
    inpType: string,
    method: string,
    _content: string | string[],

    content: string | string[],
    type: string,
    map: string[],
    num: number,
    order: number,
    input: boolean
}


export class field implements Field {
    public inpType;
    public add;
    public _num;
    public _content;
    public fontSize;
    public method;

    constructor(public name: string, input: boolean, num: number = 1, order: number = null, type?: string, method?: string) {
        this.name = name;
        this._input = input;
        this._num = num;
        this._order = order;
        this.fontSize = 0;
        this.add = false;
        this._type = type || 'letter';
        this.inpType = 'text';
        this.method = method || 'option';
        this._content = ''
    }

    updataContent() {
        if (this._num > 1) {
            if (typeof this._content !== 'object')
                this._content = Object.fromEntries(this.map.slice(0, this.num).map(letter => [letter, '']))

            else {
                if (Object.keys(this._content)[0] !== this.map[0])
                    this._content = Object.fromEntries(this.map.slice(0, this.num).map(letter => [letter, '']))

            }
        }
    }

    get content() {
        this.updataContent()

        return this._content
    }

    set content(value: any) {
        this._content = value;
    }

    get type() {
        return this._type
    }

    set type(value: string) {
        this.updataContent()

        this._type = value
    }

    get map() {
        return listMap[this.type];
    }

    get num() {
        return this._num
    }

    set num(value: number) {
        this._num = value

        if (this._num > 1) {
            if (typeof this._content === 'string')
                this._content = Object.fromEntries(this.map.slice(0, this.num).map((letter, idx) => [letter, idx ? '' : this._content]));
            else if (typeof this._content === 'object')
                this._content[this.map[this._num - 1]] = ''
            else console.error("Unknow Type")
        }
    }

    get order() {
        return this._order
    }

    set order(value: number) {
        this._order = value
    }

    get input() {
        return this._input
    }

}


export namespace CusType {
    export interface fieldObj<T> {display: string, value: T}
    export type cls = { [key: string]: fieldObj<Array<field>> }
    export type obj = { [key: string]: fieldObj<Array<Field>> }
    export type clsArr = { [key: string]: Array<field> }
    export type objArr = { [key: string]: Array<Field> }
}


function createType(...obj: Array<{ idx: number | number[], key: string | string[], value: any | any[] }>): CusType.cls[string] {

    let stdTypeObj: field[] = [
        new field("Content", true),
        new field("Option", true, 4),
        new field("QuesType", false, 0),
        new field("MultiLine", false),
        new field("Answer", true, 1, null, 'number')
    ]

    for (let d of obj)
        if (Array.isArray(d.idx) && typeof d.key === 'string' && Array.isArray(d.value))  // [], str, []
            for (let i = 0; i < d.idx.length; i++)
                stdTypeObj[d.idx[i]][d.key] = d.value[i];

        else if (Array.isArray(d.idx) && typeof d.key === 'string' && typeof d.value !== 'object')  // [], str, any
            for (let i of d.idx)
                stdTypeObj[i][d.key] = d.value;

        else if (typeof d.idx !== 'object' && Array.isArray(d.key) && Array.isArray(d.value))  // num, [], []
            for (let i in d.key)
                stdTypeObj[d.idx][d.key[i]] = d.value[i];

        else
            stdTypeObj[d.idx][d.key] = d.value;

    return {display: 'text', value: stdTypeObj};
}


export function objToClass(obj: CusType.obj): CusType.cls {
    for (let key in obj) {
        let stdTypeObj: field[] = [];

        for (let o: Field of obj[key].value)
            stdTypeObj.push(new field(o.name, o._input, o._num, o._order, o._type, o.method));

        obj[key].value = stdTypeObj;
    }

    return reactive(obj)

}


export namespace module {
    export const templates = [
        {
            name: "Content Module",
            id: 0,
            content: "<b>1</b>. <p>This is the content of the example question.</p>",
            style: "display: flex; align-items: center; flex-direction: row;",
            attr: {}
        },
        {
            name: "Option Module",
            id: 1,
            content: "<div style='display: flex; align-items: center; flex-direction: row;'><b>A</b>. <p>option A</p></div>" +
                "<div style='display: flex; align-items: center; flex-direction: row;'><b>B</b>. <p>option B</p></div>" +
                "<div style='display: flex; align-items: center; flex-direction: row;'><b>C</b>. <p>option C</p></div>" +
                "<div style='display: flex; align-items: center; flex-direction: row;'><b>D</b>. <p>option D</p></div>"
        },
        {
            name: "Question Type Module",
            id: 2,
            content: "<h3>Multiple-choice</h3>"
        },
        {
            name: "Multiline Module",
            id: 3,
            content: "<textarea style='width: 90%; min-height: 30px; max-height: 90%; resize: none;font-size: 20px'></textarea>",
            style: "width: 100%; min-height: 100px;display: flex; align-items: center; justify-content: center;",
        },
        {
            name: "Answer Shown Module",
            id: 4,
            content: "<p>A</p>"
        }
    ]
    export let form = createType();
}


export const stdType = {
    choice: createType(
        {idx: [0, 1, 2, 4], key: "order", value: [1, 2, 0, 3]},
    ),
    multiChoice: createType(
        {idx: [1, 4], key: "add", value: true},
        {idx: [0, 1, 2, 4], key: "order", value: [1, 2, 0, 3]},
    ),
    judgement: createType(
        {idx: 1, key: ["num", "type"], value: [2, "boolean"]},
        {idx: [0, 1, 2, 4], key: "order", value: [1, 2, 0, 3]},
    )
}
