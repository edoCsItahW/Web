/*
 - Copyright (c) 2024. All rights reserved.
 - This source code is licensed under the CC BY-NC-SA
 - (Creative Commons Attribution-NonCommercial-NoDerivatives) License, By Xiao Songtao.
 - This software is protected by copyright law. Reproduction, distribution, or use for commercial
 - purposes is prohibited without the author's permission. If you have any questions or require
 - permission, please contact the author: 2207150234@st.sziit.edu.cn
 */
import { describe, it, expect, test } from "vitest";

import { flushPromises, mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { Store_ } from "@/stores/stores";
import { vi } from "vitest";
import { CONTENT } from "@/mock/api";
import home from "@/components/home.vue";

vi.mock("@/api/content", () => ({ content: vi.fn() }));

describe("Home.vue", () => {
    it("", async () => {
        const wrapper = mount(home, {
            global: {
                plugins: [
                    createTestingPinia({
                        createSpy: vi.fn(),
                    }),
                ],
            },
        });

        const store = Store_();

        store.updateUser = vi.fn();

        (CONTENT as any).mockResolvedValue({
            data: CONTENT,
        });

        await flushPromises();

        expect(wrapper.text()).toContain("Exam Platform");

        await wrapper.find("button").trigger("click");

        expect(store.lang).toBe("zh");

        expect(wrapper.text()).toContain("zh");
    });
});
