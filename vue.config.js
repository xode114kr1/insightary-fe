const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static",
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BACKEND_BASE_URL,
        changeOrigin: true,
      },
      "/images": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
