/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
// @ts-nocheck
//import { testObj1 } from './testObj1';
//import testObj2 from './testObj2';
//import * as testObj3 from './testObj3';
//import type { testObj4 } from './testObj4';
//import { type testObj5, testClass4 } from './testObj5';

//function testFunc1(): A {
//    testObj1();
//}
//
//
//class TestClass1 {}
//
//
//class TestClass2 extends TestClass1, testClass4 implements testObj5 {}
//
//
//interface TestInterface1 {}
//
//
//class TestClass3 implements TestInterface1 {}
//
//
//() => {
//
//}
function testExport() {}

class testExportClass {}

export function parseAim() {}

export class A {}

export const a = 1;

export type B = number;

export interface C {}

export enum D {}

export namespace E {}

const testExport2 = 1;

export {
    testExport,
    testExportClass,
    testExport2
}
