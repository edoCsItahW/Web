// Copyright (c) 2024. All rights reserved.
// This source code is licensed under the CC BY-NC-SA
// (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
// This software is protected by copyright law. Reproduction, distribution, or use for commercial
// purposes is prohibited without the author's permission. If you have any questions or require
// permission, please contact the author: 2207150234@st.sziit.edu.cn

/*****************************************************
 * @File name: REACTIVE
 * @Author: edocsitahw
 * @Version: 1.1
 * @Date: 2024/08/01 下午6:28
 * @Commend:
 *******************************************************/
#include "E:\codeSpace\codeSet\web\project\ts\ast\node_modules\node-addon-api\napi-inl.h"
#include <functional>
#include <iostream>

using namespace Napi;


template<typename T, typename... Args>
class Decorator {
	private:
		std::function<T(Args...)> _func;
		Env _env;

	public:
		Decorator(Env& env): _env(env) {}

		T wrapper(Args... args) {
			try {
				return _func(args...);
			}
			catch (Error& e) {
				std::cout << "JS Error: ";
				e.ThrowAsJavaScriptException();
			}
			catch (std::exception& e) {
				std::cout << "C++ Error: ";
				Error::New(_env, e.what()).ThrowAsJavaScriptException();
			}

			return T();
		}

		std::function<T(Args...)> operator()(std::function<T(Args...)> func) {
			_func = func;
			return [this](Args... args) -> T { return this->wrapper(args...); };
		}
};

namespace cpp {}

namespace js {
	Boolean intanceOf(const CallbackInfo &info) {
		if (info.Length() < 2) {
			TypeError::New(info.Env(), "intanceof() requires at least 2 arguments and " + std::to_string(info.Length()) + " given!").ThrowAsJavaScriptException();
			return Boolean::New(info.Env(), false);
		}

		Napi::Value arg0 = info[0];
		Napi::Value arg1 = info[1];

		if (!arg1.IsFunction()) {
			TypeError::New(info.Env(), "intanceof() second argument must be a function!").ThrowAsJavaScriptException();
			return Boolean::New(info.Env(), false);
		}

		try {

			if (!arg0.IsObject())
				return Boolean::New(info.Env(), false);

			return Boolean::New(info.Env(), info[0].As<Object>().InstanceOf(arg1.As<Function>()));
		}
		catch (Error& e) {
			std::cout << "JS Error - return port: ";
			e.ThrowAsJavaScriptException();
		}

	}
} // namespace js


Object Init(Env env, Object exports) {
    exports.Set(String::New(env, "intanceOf"), Function::New(env, Decorator<Boolean, const CallbackInfo&>(env)(js::intanceOf)));
	return exports;
}


NODE_API_MODULE(baseFunc, Init);
