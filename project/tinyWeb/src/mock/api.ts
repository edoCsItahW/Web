interface IApi {
    data: any;
    code: number;
    msg: string;
}


interface IRoute<T> {
    url: string;
    method: string | string[];
    response: T;
}


function stdRes(data: any, code: number = 200, msg: string = 'ok'): IApi {
    return {data, code, msg};
}

function unifi(fn: Function): (...args: any[]) => IApi {
    return function wrap(...args: any[]): IApi {
        const res = fn.apply(this, args);
        if (typeof res !== 'object' || res === null || !['data', 'code','msg'].every(key => key in res))
            return stdRes(res);
        return res;
    }
}

function route(rule: string, method: string | string[] = 'POST'): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const orgFn = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return {url: rule, method, response: orgFn.length === 0 /** 有无参数 */ ? unifi(orgFn).apply(this, args) : unifi(orgFn) /** .apply(this, args) 直接以被装饰函数作为handler */};
        };
    }
}

import respData from '@/assets/data.json';

class Api {
    @route('/api/article')
    static article(): IRoute<IApi> {
        return respData;
    }

    @route('/api/comment')
    static comment(data: Response): IRoute<IApi> {
        console.log(data.body);
        // return null;
    }

    @route('/api/user')
    static user(data: Response<{name: string, type: 'query'}>): IRoute<IApi> {
        data = data.body;
        switch (data.type) {
            case 'query':
                return ['root', 'admin'].includes(data?.name);
        }
    }
}

export default [
    {
        url: '/api',
        method: 'POST',
        response: { data: 'mock available', code: 200, msg: 'ok' }
    },
    Api.article(),
    Api.comment(),
    Api.user()
]
