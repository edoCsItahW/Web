import { defineStore } from "pinia";
import { Theme, Svg, ISvg, _Svg, Lang,  } from "@/assets/global";
import { LangCell } from "@/assets/types";
import { reactive } from "vue";
import content from "@/assets/content.json";

export const Store_ = defineStore("store", {
    state() {
        return {
            // 主题控制
            color: reactive(Theme.Color(Number.parseInt(localStorage.getItem("mode")) || Theme.Mode.LIGHT)),
            /**
             * @access private
             * @desc 待初始化的svg
             * */
            _svg: null as ISvg & _Svg | null,
            lang: Lang.ZH,
            content: content,
            /**
             * @desc 选项卡索引
             * */
            optIdx: 0,
            user: { name: null },  // anonym
            controlOnly: false
        };
    },
    getters: {
        /**
         * @desc 获取当前主题下的svg
         * */
        svg(state): _Svg & ISvg {
            if (state._svg) return state._svg;
            return state._svg = Svg(state.color);
        }
    },
    actions: {
        /**
         * @desc 切换主题
         *
         * */
        changeColor() {
            this.color.mode = Theme.Mode.LIGHT ^ Theme.Mode.DARK ^ this.color.mode;
            localStorage.setItem("mode", this.color.mode.toString());
        },
        changeLang() { this.lang = this.lang === Lang.ZH ? Lang.EN : Lang.ZH; },
        format(key: LangCell): string { return key[this.lang]; }
    }
});
