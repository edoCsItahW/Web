// Copyright (c) 2024. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the author's permission. If you have any questions or require
// permission, please contact the author: 2207150234@st.sziit.edu.cn

/*****************************************************
 * @File name: EXTENT
 * @Author: edocsitahw
 * @Version: 1.1
 * @Date: 2024/08/02 上午2:41
 * @Commend:
 *******************************************************/
#include <napi.h>
#include <pybind11/embed.h>
#include <pybind11/pybind11.h>


namespace py = pybind11;


void pyHello() {
	py::scoped_interpreter guard{};

	py::module builtins = py::module::import("builtins");

	py::object printFunc = builtins.attr("print");

	printFunc("Hello from Python!");
}

void hello(const Napi::CallbackInfo& info) {
	Napi::Env env = info.Env();

	pyHello();
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(Napi::String::New(env, "hello"), Napi::Function::New(env, hello));
	return exports;
}


NODE_API_MODULE(addon, Init);
