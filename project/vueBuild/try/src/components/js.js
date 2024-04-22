/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
export default {
  data() {
    return {
      msg: "message",
      number: 1,
      classname: "text",
      idname: "idtext",
      attrObj: {
        attr1: "class1",
        attr2: "id1"
      },
      flag: true,
      type: "B",
      names: ["tag1", "tag2"],
      text: "所见即所得",
      formText: "",
      check: false,
      textContent: "content",
      isActive: "tie",
      classList: {
        'active': true,
        'text-danger': true
      },
      arrActive: "active",
      arrHasError: "text-danger",
      colorActive: "green",
      fontSize: 30
    }
  },
  methods: {
    clickHandler(arg, event) {
      console.log(arg);
      console.log(event);
    },
    addListHandle() {
      //  this.names.push("next")  // 会引起UI自动更新
      //  this.names = this.names.concat(["next"])  // 不会引起UI自动更新
    },
    change() {
      this.msg = this.number % 2 === 0 ? "new message" : "old message"
    },
    changeText() {
      this.$refs.textRef.innerText = "new"
    }
  },
  computed: {  // methods中的方法会被重新加载,但computed中的方法会被缓存

  },
  watch: {
    msg(newValue, oldValue) {  // 类似perporty,此次函数需和变量名相同
      console.log(newValue, oldValue)
    },
    text(n, o) {
      console.log(n, o)
      this.formText = n.length ? `${Array.from(n).join(",")}-${n.length}` : ""
    },
    check(n, o) {
      console.log(n, o)
    }
  }
}
