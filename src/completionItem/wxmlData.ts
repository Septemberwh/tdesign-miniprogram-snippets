/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-11-04 14:37:38
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-12-05 11:21:28
 * @FilePath: /tdesign-miniprogram-snippets/src/completionItem/wxmlData.ts
 * @Description: 
 */
// https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/
import { type Attributes } from "./types";

export const WxmlDataList: Attributes[] = [
  {
    name: '{{}}',
    type: "",
    default: "",
    desc: "Reference: 数据绑定",
    required: "",
    body: '{{${1:value}}}',
  },
  {
    name: 'wx:for',
    type: "",
    default: "",
    desc: "Reference: 列表渲染",
    required: "",
    body: 'wx:for="{{${1:array}}}"',
  },
  {
    name: 'wx:for-index',
    type: "",
    default: "",
    desc: "Reference: 列表渲染 index",
    required: "",
    body: 'wx:for-index="${1:idx}"',
  },
  {
    name: 'wx:for-item',
    type: "",
    default: "",
    desc: "Reference: 列表渲染 item",
    required: "",
    body: 'wx:for-item="${1:itemName}"',
  },
  {
    name: 'wx:key',
    type: "",
    default: "",
    desc: "Reference: 列表渲染 key",
    required: "",
    body: 'wx:key="${1:index}"',
  },
  {
    name: 'wx:for-index-item',
    type: "",
    default: "",
    desc: "Reference: 列表渲染 index item",
    required: "",
    body: 'wx:for="{{${1:array}}}" wx:for-index="${2:idx}" wx:for-item="${3:itemName}"',
  },
  {
    name: 'wx:if',
    type: "",
    default: "",
    desc: "Reference: 条件渲染",
    required: "",
    body: 'wx:if="{{${1:condition}}}"',
  },
  {
    name: 'wx:elif',
    type: "",
    default: "",
    desc: "Reference: 条件渲染 elif",
    required: "",
    body: 'wx:elif="{{${1:condition}}}"',
  },
  {
    name: 'wx:else',
    type: "",
    default: "",
    desc: "Reference: 条件渲染 else",
    required: "",
    body: 'wx:else',
  },
];