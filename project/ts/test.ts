/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */

/**
 * @file test.ts
 * @author edocsitahw
 * @version 1.1
 * @date 2024/10/26 ÉÏÎç11:00
 * @desc
 * */

function decorator(method: Function) {
    return function(this: any, ...args: any[]): any {
        return method.apply(this, args);
    }
}

function staticmethod(method: Function) {
    return function(...args: any[]): any {
        return method.apply(null, args);
    }
}

function classmethod(method: Function) {
    return function(this: any, ...args: any[]): any {
        return method.apply(this.constructor, args);
    }
}

class Test {
    @decorator
    public testMethod(name: string) {
        console.log(`Hello, ${name}!`);
    }
    
    @staticmethod
    static testStaticMethod(name: string) {
        console.log(`Hello, ${name}!`);
    }
    
    @classmethod
    testClassMethod(this: Test, name: string) {
        console.log(`Hello, ${name}!`);
    }
}


const test = new Test();
test.testMethod('World');
Test.testStaticMethod('World');
test.testClassMethod('World');
