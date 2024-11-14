<img align="right" width="90px" src="https://free2.yunpng.top/2024/10/17/6710e29ecc275.png" alt="TDesign logo" />

# TDesign Miniprogram Snippets

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/septwong.tdesign-miniprogram-snippets?color=brightgreen&label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=septwong.tdesign-miniprogram-snippets)
![Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/septwong.tdesign-miniprogram-snippets)&nbsp;
![Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/septwong.tdesign-miniprogram-snippets)&nbsp;
![Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/septwong.tdesign-miniprogram-snippets)&nbsp;
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/septwong/tdesign-miniprogram-snippets/main/LICENSE)&nbsp;
<a href="https://github.com/septwong/tdesign-miniprogram-snippets">
    <img alt="tdesign-miniprogram-snippets Repo stars" src="https://img.shields.io/github/stars/septwong/tdesign-miniprogram-snippets">
</a>

> A TDesign WeChat MiniProgram code snippets plugin for VS Code.
<!-- providing autocompletion for TDesign components in WeChat MiniProgram projects. -->

一个用于 VS Code 的 TDesign WeChat MiniProgram 代码片段插件。

为微信小程序项目中的 TDesign 组件提供自动补全功能。

<!-- ![TDesign](assets/images/logo.png) -->

## 概述

由 TDesign 官方文档照搬下来的代码片段。  
<!-- 方便自己使用，同时也给需要者提供帮助。 -->

<!-- > 当前适配组件库版本: [`1.6.2` 2024-10-12](https://tdesign.tencent.com/miniprogram/changelog#%F0%9F%8C%88-1-6-1-2024-09-14)   -->
> 官方文档: https://tdesign.tencent.com/miniprogram/overview

## 使用方法

**代码片段：**

- WXML 片段：
  - 输入 `t-button`，`t-icon` 等 `t-` 开头的关键字即可提示代码片段模板
  - 组件中输入 `空格` 可触发属性值自动补全
- JSON 片段：
  - 输入 `t-button`，`t-icon` 等 `t-` 开头的关键字即可提示代码片段模板，适用于 `usingComponents` 中的组件引用
- JS 片段：
  - 输入 `t-dialog`，`t-message` 等 `t-` 开头的关键字即可提示代码片段模板
- WXSS 片段：*待开发*

**其他功能：**

- `wxml`：
  - TDesign 组件标签悬停提示：快捷打开该组件官网
  - 所有标签中输入 `wx:` 开头的关键字即可提示代码片段模板
  - `alt + 点击自定义组件的标签名` 跳转到对应的组件页面 (默认关闭，可在插件 `设置` 中开启) 
- `js`：
  - 输入 `wx-onLoad`, `wx-onShow` 等 `wx-` 开头的关键字即可提示代码片段模板
- 支持`语法高亮`
- 支持`组件高亮` (默认关闭，可在插件 `设置` 中开启) 
- 资源管理器中右键目录，新增两个菜单: `创建小程序页面` , `创建小程序组件` (默认关闭，可在插件 `设置` 中开启) 

## 示例

- WXML 片段

  - `t-` 关键字代码片段

  ![WXML 片段](https://free2.yunpng.top/2024/10/25/671b3e889ec36.gif)

  - 组件属性自动补全

  ![WXML 组件属性](https://free4.yunpng.top/2024/10/30/6721aaa230f20.gif)

- JSON 片段

  ![JSON 片段](https://free2.yunpng.top/2024/10/25/671b3e88a8dc4.gif)

- JS 片段

  ![JS 片段](https://free2.yunpng.top/2024/10/25/671b3e9d84363.gif)

- 组件标签悬停提示

  ![组件标签悬停提示](https://free2.yunpng.top/2024/10/25/671b3e9c3a4e5.gif)

## 联系作者

如果有问题,请联系 septwong@foxmail.com

**🎉 Enjoy!**
