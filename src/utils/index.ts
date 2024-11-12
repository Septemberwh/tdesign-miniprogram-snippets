/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-11-05 13:08:32
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-12 13:45:43
 * @FilePath: /tdesign-miniprogram-snippets/src/utils/index.ts
 * @Description: 
 */
import { workspace } from 'vscode';

export function autoConfig() {
  let c = workspace.getConfiguration();
  const updates: { key: string; map: any }[] = [
    {
      key: 'files.associations',
      map: {
        '*.cjson': 'jsonc',
        '*.wxss': 'css',
        '*.wxs': 'javascript',
      },
    },
    {
      key: 'emmet.includeLanguages',
      map: {
        wxml: 'html',
      },
    },
  ];
  updates.forEach(({ key, map }) => {
    let oldMap = c.get(key, {}) as any;
    let appendMap: any = {};
    Object.keys(map).forEach(k => {
      if (!oldMap.hasOwnProperty(k)) {
        appendMap[k] = map[k];
      }
    });
    if (Object.keys(appendMap).length) {
      c.update(key, { ...oldMap, ...appendMap }, true);
    }
  });
  c.update('tdesign-miniprogram-snippets.others.disableAutoConfig', true, true);
}
export function schemes(key: string) {
  return { scheme: 'file', language: key };
}

/**
 * 防抖函数
 * 适用于在事件频繁触发的情况下，仅在事件触发结束后执行一次操作。
 * @param func 
 * @param delay 
 * @returns 
 */
export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout | null;
  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * 节流函数
 * 通常用于限制事件触发的频率，比如滚动、窗口缩放等频繁触发的操作。
 * @param func 
 * @param delay 
 * @returns 
 */
export function throttle(func: Function, delay: number) {
  let timer: NodeJS.Timeout | null;
  return function (this: any, ...args: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}