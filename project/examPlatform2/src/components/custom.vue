<!--
  - Copyright (c) 2024. All rights reserved.
  - This source code is licensed under the CC BY-NC-SA
  - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
  - This software is protected by copyright law. Reproduction, distribution, or use for commercial
  - purposes is prohibited without the author's permission. If you have any questions or require
  - permission, please contact the author: 2207150234@st.sziit.edu.cn
  -->
<script lang='ts'>
/*****************************************************
 * @file custom.vue
 * @author: edocsitahw
 * @version: 1.1
 * @date: 2024/09/14 下午7:29
 * @summary 题目结构和样式自定义组件
 * @copyright CC BY-NC-SA
 *******************************************************/
import { defineComponent, reactive } from "vue";
import { Store_ } from "@/stores/stores";
import { color, Svg, Func } from "@/assets/global";
import { mapState } from "pinia";
import { sleep } from "jsorigin/src";

// TODO: 实现点击其它空白处关闭弹出框功能
// TODO: 实现宏解析功能
// TODO: 实现设置元素或快要求填写数据功能
// TODO: 实现快自由添加功能

/** @interface Block
 *
 * @desc 区块元素的接口
 * */
interface Block {
    type: string,
    class: string,
    style?: {
        color?: string,
        backgroundColor?: string
    },
    items?: Block[],
    placeholder?: string,
    content?: boolean
}

/** @enum { number } Relation
 *
 * @desc 区块关系枚举
 * */
enum Relation {
    PARENT = 1,
    CHILD = 2
}


export default defineComponent({
    data() {
        return {
            /** @var { boolean } menuFlag 菜单栏是否展开 */
            menuFlag: false,
            /** @var { Block[] } blockList 区块列表 */
            blockList: [] as Block[],
            /** @var popup 弹出框数据 */
            popup: {
                // 是否显示
                flag: false,
                // 弹出框样式
                style: {
                    top: 0,
                    left: 0,
                    backgroundColor: color('back'),
                    border: `1px solid ${color('font')}`
                },
                // 弹出框目标
                target: null as HTMLElement
            },
            // 记录
            log: {parent: null as number, child: null as number}
        };
    },
    setup() {
        const store = Store_();
        
        // 区块模板
        const blocks = reactive([
            {type: 'input', class: 'custom-input-h1', content: true, style: {color: color('font')}, placeholder: store.content?.custom.title[store.lang]},
            {type: 'textarea', class: 'custom-input-textarea', content: true, style: {color: color('font')}, placeholder: store.content?.custom.paragraph[store.lang]},
            {type: 'list', class: 'custom-input-ul', items: [
                    {type: 'input', class: 'custom-input-p', content: true, style: {color: color('font')}, placeholder: store.content?.custom.paragraph[store.lang]}
                ]},
            {type: 'div', class: 'custom-input-div', content: true, style: {backgroundColor: color('fontl', true)}}
        ]) as Block[];
        
        return { store, color, Svg, blocks, Relation, Func };
    },
    computed: {
        ...mapState(Store_, {
            content: "content",
            lang: "lang"
        })
    },
    methods: {
        /**
         * @function addBlock
         * @summary 新增区块
         * @desc 根据传入的索引和关系类型,新增区块到区块列表中,为父则填入blocklist,为子则填入父元素的items中
         * @param { number } idx 区块索引
         * @param { Relation } relation 区块关系类型
         * */
        addBlock(idx: number, relation: Relation = Relation.PARENT) {
            switch (relation) {
                case Relation.PARENT:
                    this.blockList.push(this.blocks[idx]); break;
                case Relation.CHILD:
                    const parents = this.blockList[this.log.parent];
                    parents.items?.push(parents.items[this.log.child]);
                    break;
            }
        },
        /**
         * @function activePopup
         * @summary 点击弹出框目标激活弹出框
         * @desc 根据点击的目标,激活弹出框,记录父元素和子元素索引,并更新弹出框位置
         * @param { MouseEvent } event 点击事件
         * @param { number[] } args 父元素和子元素索引
         * @example
         * // 点击父元素激活弹出框
         * activePopup(event, 0)
         * // 点击子元素激活弹出框
         * activePopup(event, 0, 0)
         * */
        activePopup(event: MouseEvent, ...args: number[]) {
            const target = event.target as HTMLElement;
            
            const content: boolean = JSON.parse(target.getAttribute("content"));
            
            if (content) {
                this.popup.target = target;
                
                this.log.parent = args[0];
                this.log.child = args[1];
            }
        },
        /** @function updatePopup
         * @summary 更新弹出框位置
         * @desc 根据目标元素或坐标更新弹出框位置
         * @param { (number | HTMLElement)[] } args 目标元素或坐标
         * */
        updatePopup(...args: (number | HTMLElement)[]) {
            const popup = document.getElementById("popup");
            
            const target = args.length === 1 ? (args[0] as HTMLElement).getBoundingClientRect() : args;
            const [top, left] = target instanceof DOMRect ? [target.top, target.left] : (args as number[]);
            
            setTimeout(() => {
                this.popup.style.top = `${top + window.scrollY - popup.offsetHeight}px`;
                this.popup.style.left = `${left + window.scrollX}px`;
            }, 0);
        },
        /** @function remove
         * @summary 删除区块
         * @desc 根据父元素和子元素索引,删除区块,并更新弹出框状态和目标
         * */
        remove() {
            if (this.log.child !== undefined) {  // 不能简单判断为bool,因为0也是false
                this.blockList[this.log.parent].items.splice(this.log.child, 1);
                if (this.blockList[this.log.parent].items.length === 0)
                    this.blockList.splice(this.log.parent, 1);
            }
            else this.blockList.splice(this.log.parent, 1);
            
            this.popup.flag = false;
            this.popup.target = null;
        },
        /** @function move
         * @summary 区块上下移动
         * @desc 根据区块类型和方向,交换区块位置
         * @param { 'up' | 'down' } type 移动方向
         * */
        move(type: 'up' | 'down') {
            // TODO: 解决调换无效问题(可能输入内容并没有写入模板,所以模板顺序可能已被修改,但并不会有视觉效果)
            if (this.log.child !== undefined) {
                const parents = this.blockList[this.log.parent];
                if ((type === "up" && this.log.child > 0) || (type === "down" && this.log.child < parents.items.length - 1))
                    Func.swap(parents.items, this.log.child, this.log.child + (type === "up" ? -1 : 1));
            }
            else if ((type === 'up' && this.log.parent > 0) || (type === 'down' && this.log.parent < this.blockList.length - 1))
                Func.swap(this.blockList, this.log.parent, this.log.parent + (type === "up" ? -1 : 1));
        }
    },
    watch: {
        menuFlag: {
            /**
             * @function handler
             * @summary 菜单栏展开/收起切换
             * @desc 根据菜单栏展开/收起状态,更新区块列表样式,更新按钮图标,更新弹出框状态和目标
             * @param { boolean } val 菜单栏展开/收起状态
             * */
            handler(val: boolean) {
                const addBtn = document.getElementById("add-btn");
                const content = document.getElementById("custom-content-left");
                const left = document.getElementById("custom-content-left-list");
                
                this.popup.flag = false;
                this.popup.target = null;
                
                if (addBtn && content) {
                    if (val) {
                        content.style.flex = "2";
                        addBtn.style.rotate = "45deg";
                        sleep(500).then(() => left.style.display = "flex");
                    } else {
                        content.style.flex = "0";
                        left.style.display = "none";
                        addBtn.style.rotate = "none";
                    }
                }
            },
            deep: true,
            immediate: true
        },
        // 控制弹出框移到和消失
        "popup.target": {
            /**
             * @function handler
             * @summary 弹出框目标更新
             * @desc 根据弹出框目标更新弹出框位置,更新弹出框状态和目标
             * @param { HTMLElement } nval 弹出框目标
             * */
            handler(nval: HTMLElement) {
                if (nval) {
                    this.updatePopup(nval);
                    this.popup.flag = true;
                }
            },
            deep: true,
            immediate: true
        }
    }
});
</script>

<template>
    
    <div class="custom" :style="{ backgroundColor: color('back') }">
        
        <!-- 头部 -->
        <header class="custom-header" :style="{ borderBottom: `1px solid ${color('font')}` }">
            
            <div class="custom-header-logo">
                
                <img src="../../public/logo.svg" alt="logo" style="width: 50px; height: 50px;">
            
            </div>
            
            <div class="custom-header-tools">
                
                <div class="custom-header-tools-add">
                    
                    <div id="add-btn" v-html="Svg.add(color('font'))" @click="menuFlag = !menuFlag"></div>
                
                </div>
            
            </div>
        
        </header>
        
        <!-- 内容 -->
        <div class="custom-content">
            
            <!-- 左侧菜单栏 -->
            <div id="custom-content-left" :style="{borderRight: `1px solid ${color('font')}`}" class="custom-content-left">
                
                <ul id="custom-content-left-list" class="custom-content-left-list">
                    
                    <li v-for="(item, idx) in content?.custom.menu" @click="addBlock(idx)" class="custom-content-left-list-item" :style="{ color: color('font'), backgroundColor: color('fontl', true) }">{{ item[lang] }}</li>
                
                </ul>
            
            </div>
            
            <!-- 编辑区 -->
            <div class="custom-content-middle">
                
                <!-- 弹出框 -->
                <div id="popup" v-show="popup.flag" :style="popup.style">
                    
                    <!-- 弹出框(菜单图标) -->
                    <div class="popup-menu" v-html="Svg.menu(color('font'))"></div>
                    
                    <!-- 弹出框(移到) -->
                    <div class="popup-order" style="display: flex; flex-direction: column;">
                        
                        <!-- 弹出框(上移) -->
                        <div class="popup-order-up" @click="move('up')">
                            
                            <svg viewBox="0 0 1024 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18" style="transform: scale(1, 0.5)">
                                <path d="M96.196 671.807l415.804-415.632 415.803 415.632-63.616 63.445-352.209-352.017-352.102 352.017z" />
                            </svg>
                            
                        </div>
                        
                        <!-- 弹出框(下移) -->
                        <div class="popup-order-down" @click="move('down')">
                            
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18" style="transform: scale(1, 0.5)">
                                <path d="M927.804 352.193l-415.804 415.632-415.803-415.632 63.616-63.445 352.209 352.017 352.102-352.017z" />
                            </svg>
                            
                        </div>
                        
                    </div>
                    
                    <!-- 弹出框(添加) -->
                    <div class="popup-add" v-html="Svg.add(color('font'))" @click="addBlock(0, Relation.CHILD)"></div>
                    
                    <!-- 弹出框(删除) -->
                    <div class="popup-delete" v-html="Svg.remove(color('font'))" @click="remove"></div>
                    
                </div>
                
                <!-- 区块展示区 -->
                <template v-for="(item, index) in blockList" :key="index">
                    <component v-if="item.type !== 'list'" :is="item.type" :class="item.class" v-bind:style="item.style" v-bind:placeholder="item.placeholder" :content="item.content" @click="activePopup($event, index)"></component>
                    <ul v-else :class="item.class">
                        <li v-for="(i, idx) in item.items" :key="idx">
                            <component :is="i.type" :class="i.class" v-bind:style="i.style" v-bind:placeholder="i.placeholder" :content="i.content" @click.stop="activePopup($event, index, idx)"></component>
                        </li>
                    </ul>
                </template>
                
            </div>
            
            <div class="custom-content-right">
            
            
            </div>
        
        </div>
    
    </div>
    
</template>

<style lang='sass'>
@font-face
    font-family: "JetBrains Mono"
    src: url("../assets/JetBrainsMono-Bold.ttf")
    

#popup
    position: absolute
    display: flex
    flex-direction: row
    border-radius: 5px
    align-items: center
    justify-content: center
    gap: 5px


.custom
    height: 100%
    
    &-header
        display: flex
        flex-direction: row
        align-items: center
    
    &-content
        display: flex
        flex-direction: row
        height: 100%
        
        &-left
            flex: 0
            height: 100%
            transition: all 0.5s ease-in-out
            
            &-list
                display: none
                flex-direction: column
                list-style: none
                margin: 0
                padding: 0
                
                &-item
                    margin: 5px
                    padding: 10px
                    cursor: pointer
                    border-radius: 5px
        
        &-middle
            flex: 3
            display: flex
            flex-direction: column
            padding: 10px 20px 0 20px
            
    &-input
        &-h1
            display: inline-block
            border: none
            outline: none
            font-size: 40px
            width: 100% !important
            &::placeholder
                font-size: 40px
                font-style: italic
                opacity: 0.8
        &-textarea, &-p
            display: inline-block
            border: none
            outline: none
            font-size: 20px
            width: 150% !important
            &::placeholder
                font-size: 20px
                font-style: italic
                opacity: 0.8
                
        &-div
            display: flex
            flex-direction: column
            min-height: 20%
            border-radius: 10px

#add-btn
    transition: all 0.2s ease-in-out
</style>