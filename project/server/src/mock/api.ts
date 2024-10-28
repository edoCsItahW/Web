/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { IUser, IProj } from "@/assets/types";


function stdResp(data: any, code: number = 200, msg: string = "ok") {
    return { code, msg, data };
}

export default [
    {
        url: "/api",
        method: "POST",
        response: {
            code: 200,
            msg: "ok",
            data: "Hello, World!"
        }
    },
    {
        url: "/api/user",
        method: "POST",
        response: stdResp({
            name: "edocsitahw",
            imgUrl: "https://avatars.githubusercontent.com/u/139570866?v=4"
        } as IUser)
    },
    {
        url: "/api/proj",
        method: "POST",
        response: stdResp([
            {
                name: { en: "Exam Platform", zh: "考试平台" },
                desc: { en: "A platform for exams management", zh: "考试管理平台" },
                url: "https://github.com/edoCsItahW/ExamPlatform",
                docUrl: "https://github.com/edoCsItahW/ExamPlatform",
                intro: "# Exam Platform" +
                    "\n" +
                    "\n" +
                    "This is a platform for exams management." +
                    "\n" +
                    "-------"
            },
            {
                name: { en: "Project 1", zh: "项目1" },
                desc: { en: "A project for testing", zh: "测试项目" },
                url: "https://github.com/edoCsItahW/Project1"
            },
            {
                name: { en: "Project 2", zh: "项目2" },
                desc: { en: "A project for testing", zh: "测试项目" },
                url: "https://github.com/edoCsItahW/Project2"
            }
        ] as IProj[])
    }
];
