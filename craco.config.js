const { loaderByName } = require("@craco/craco");
const CracoLessPlugin = require("craco-less");
//
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

//
const lessModuleRegex = /\.m\.less$/;

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 更改antd默认样式
            // https://github.com/ant-design/ant-design/blob/4.x-stable/components/style/themes/default.less
            modifyVars: {
              // '@primary-color': '#0052d9',
              "@primary-1": "#f7f8fa", // select, active
              "@item-hover-bg": "#F7F8FA",
              "@error-color": "#e34d59",
              "@background-color-light": "#f7f8fa",
              "@btn-default-bg": "#ffffff",
              "@input-placeholder-color": "#C9CDD4",
              "@menu-item-height": "48px",
              "@menu-inline-toplevel-item-height": "48px",
              "@menu-item-color": "#86909c",
              "@item-active-bg": "#f7f8fa",
              "@table-header-color": "#86909c",
              "@border-radius-base": "8px",
              "@border-color-base": "#C9CDD4",
              "@progress-default-color": "#165dff",
              // 自定义的颜色规范
              "@success-color": "#00B42A",
              "@danger-color": "#f53f3f",
              "@warn-color": "#FF7D00",
              "@disabled-color": "#C9CDD4",
              "@primary-color": "#165DFF", // 常规主题色
              "@primary-color-hover": "#4080FF", //悬浮
              "@primary-color-bg": "#DBE8FE",
              "@primary-color-focus": "#0E42D2", // 点击等
              "@primary-color-disabled": "#94BFFF", // 一般禁用
              "@primary-color-text-disabled": "#BEDAFF", // 文字禁用
              "@primary-color-light": "#F3F8FE", // 浅主题色
              "@primary-color-warn": "#FF7D00", // 警告色
              "@bg-color": "#F2F3F5", // 一般填充色
              "@bg-color-light": "#F7F8FA", // 浅色填充色，白色背景
              "@bg-color-hover": "#F1F7FC", // 背景悬浮填充色，非白色背景
              "@bg-color-dark": "#C9CDD4",
              "@bg-color-white": "#FFFFFF",
              "@text-color": "#1D2129", // 强调/正文标题
              "@text-color-secondary": "#4E5969", // 次强调文字
              "@text-color-gray": "#C9CDD4", //置灰文字
              "@text-color-info": "#86909C", // 文字次要信息
              "@text-color-white": "#FFFFFF", // 纯白文字
              "@border-color": "#F2F3F5", // 边框颜色
              "@font-size": "14px",
              "@border-radius": "8px",
              "@input-box-shadow": "0 0 0 2px rgba(22, 93, 255, 0.2)",
              "@box-shadow-base": "0px 6px 20px rgba(0, 55, 98, 0.2)",
              "@box-shadow-button": "0px 4px 8px #CFE4F6",
              "@box-shadow": "0px 6px 20px rgba(0, 55, 98, 0.2)",

              // 悬浮色
              "@hover-color-white": "#F7F8FA", // 白色背景下
              "@hover-color-light": "#E7F1FA99", // 透明背景下
              // 选中/激活色
              "@active-color": "#F3F8FE",
              // Form
              "@form-item-label-font-size": "14px",
              // Input
              "@input-icon-color": "#86909C",
              "@input-border-color": "#E5E6EB",
              "@input-hover-border-color": "#165DFF",
              // Picker
              "@picker-basic-cell-hover-color": "#F3F8FE",
              "@picker-date-hover-range-color": "#F3F8FE",
              // Select
              "@select-border-color": "#E5E6EB",

              // Button
              "@btn-primary-shadow": "none",

              // Tag
              "@tag-border-radius": "8px",

              // Modal
              "@modal-border-radius": "24px",

              // Radio
              "@radio-button-color": "#165DFF",
              "@radio-button-active-color": "#f1f6ff",
              "@radio-button-checked-bg": "#f1f6ff",
              // table
              "@table-background-color": "#F7FCFE",
            },
            javascriptEnabled: true,
          },
        },
        modifyLessRule(lessRule) {
          lessRule.exclude = lessModuleRegex;
          return lessRule;
        },
        modifyLessModuleRule(lessModuleRule) {
          lessModuleRule.test = lessModuleRegex;
          const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
          cssLoader.options.modules = {
            localIdentName: "[local]_[hash:base64:5]",
          };
          return lessModuleRule;
        },
      },
    },
  ],
};
