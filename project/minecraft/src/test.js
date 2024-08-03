/*
 * Copyright (c) 2024. All rights reserved.
 * This source code is licensed under the CC BY-NC-SA
 * (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 * This software is protected by copyright law. Reproduction, distribution, or use for commercial
 * purposes is prohibited without the author's permission. If you have any questions or require
 * permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
class TaskRunner {
    constructor() {
        this.isRunning = [];
        this.intervalId = null;
    }

    // 开始执行任务
    startTask(arg) {
        if (this.isRunning.length) {
            console.log('Task stop.');
            return;
        }

        this.isRunning.push(arg);
        this.intervalId = setInterval(() => {
            // 这里是你要循环执行的任务
            this.doTask();

            // 检查是否需要停止
            if (!this.isRunning.length) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        }, 1000); // 假设每秒钟执行一次
    }

    // 停止执行任务
    stopTask() {
        this.isRunning = [];
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // 这里是你的任务逻辑
    doTask() {
        console.log(this.isRunning);
        // ... 你的代码逻辑 ...
    }
}

// 使用示例
const taskRunner = new TaskRunner();
taskRunner.startTask('begin'); // 开始执行任务

new Promise(resolve => { setTimeout(resolve, 5000); })
    .then(() => {
        console.log(taskRunner.isRunning.pop());
        return new Promise(resolve => setTimeout(resolve, 5000))
    })
    .then(() => {
        console.log("等待结束");
        taskRunner.stopTask(); // 在等待结束后停止任务
    });
