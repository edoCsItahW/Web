// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/codeSpace/codeSet/web/project/tinyWeb/node_modules/.pnpm/vite@5.4.9_@types+node@20.16.14_sass@1.80.3/node_modules/vite/dist/node/index.js";
import { viteMockServe } from "file:///E:/codeSpace/codeSet/web/project/tinyWeb/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.4.9_@types+node@20.16.14_sass@1.80.3_/node_modules/vite-plugin-mock/dist/index.mjs";
import vue from "file:///E:/codeSpace/codeSet/web/project/tinyWeb/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.9_@types+node@20.16.14_sass@1.80.3__vue@3.5.12_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///E:/codeSpace/codeSet/web/project/tinyWeb/node_modules/.pnpm/vite-plugin-vue-devtools@7.5.2_rollup@4.24.0_vite@5.4.9_@types+node@20.16.14_sass@1.80.3__vue@3.5.12_typescript@5.5.4_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///E:/codeSpace/codeSet/web/project/tinyWeb/vite.config.ts";
var vite_config_default = defineConfig({
  esbuild: {
    target: "es2020"
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: "modern-compiler"
      }
    }
  },
  plugins: [
    vue({
      script: {
        babelParserPlugins: ["decoratorAutoAccessors"]
      }
    }),
    vueDevTools(),
    viteMockServe({
      mockPath: "./src/mock"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  assetsInclude: ["**/*.svg"],
  server: {
    host: "0.0.0.0",
    port: 7265,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxjb2RlU3BhY2VcXFxcY29kZVNldFxcXFx3ZWJcXFxccHJvamVjdFxcXFx0aW55V2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxjb2RlU3BhY2VcXFxcY29kZVNldFxcXFx3ZWJcXFxccHJvamVjdFxcXFx0aW55V2ViXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9jb2RlU3BhY2UvY29kZVNldC93ZWIvcHJvamVjdC90aW55V2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgZXNidWlsZDoge1xuICAgICAgICB0YXJnZXQ6IFwiZXMyMDIwXCJcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzYXNzOiB7XG4gICAgICAgICAgICAgICAgYXBpOiAnbW9kZXJuLWNvbXBpbGVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIHZ1ZSh7XG4gICAgICAgICAgICBzY3JpcHQ6IHtcbiAgICAgICAgICAgICAgICBiYWJlbFBhcnNlclBsdWdpbnM6IFtcImRlY29yYXRvckF1dG9BY2Nlc3NvcnNcIl1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHZ1ZURldlRvb2xzKCksXG4gICAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICAgICAgbW9ja1BhdGg6IFwiLi9zcmMvbW9ja1wiLFxuICAgICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGFzc2V0c0luY2x1ZGU6IFtcIioqLyouc3ZnXCJdLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgICAgcG9ydDogNzI2NSxcbiAgICAgICAgb3BlbjogdHJ1ZVxuICAgIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLGVBQWUsV0FBVztBQUV6VixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHFCQUFxQjtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFMMkssSUFBTSwyQ0FBMkM7QUFRcFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLEtBQUs7QUFBQSxNQUNUO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNKLG9CQUFvQixDQUFDLHdCQUF3QjtBQUFBLE1BQ2pEO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsTUFDVixVQUFVO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLGVBQWUsQ0FBQyxVQUFVO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1Y7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
