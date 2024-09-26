import { defineStore } from "pinia";
import { request } from "jsorigin/src"
import { Type } from "@/assets/global";

const theme = {
    "dark": {
        "background": "#191919",
        "color": "#fff"
    },
    "light": {
        "background": "#fff",
        "color": "#191919"
    }
}

const setting = {
    "language": "zh",
    "theme": "dark",
    "font": {
        "family": "Helvetica",
        "size": "16px"
    }
}


export const Store_ = defineStore("store", {
    state() {
        return {
            text: null as Type.Text,
            setting: setting
        };
    },
    getters: {},
    actions: {
        text() {
            request(location.origin, "src/assets/text.json")
                .then((res: Type.Text) => {
                    this.text = res;
                })
        },
        color(key: string): string {
            return theme[this.setting.theme][key];
        }
    }
});
