/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-11-07 14:48:49
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-12 13:24:15
 * @FilePath: /tdesign-miniprogram-snippets/src/jumpComponent/jumpComponentProvider.ts
 * @Description: 在 wxml 页面，'alt + 点击自定义组件的标签名'跳转到对应的组件页面
 */
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { wxTags } from "./wxTagsData";
import { config, Config } from "../config";

const appFile = "app.json";
let rootPath = "";

let jumpCompProvider: vscode.Disposable | undefined; // 存储悬停提供器

function lastLevelDir(filePath: string): string {
  return path.dirname(filePath);
}

function findRootPath(path: string): string {
  const dir = lastLevelDir(path);
  const files = fs.readdirSync(dir);

  if (files.includes(appFile)) {
    return dir;
  } else {
    return findRootPath(dir);
  }
}

export class jumpCompDefinitionProvider implements vscode.DefinitionProvider {
  constructor(public config: Config) {}

  provideDefinition(
    doc: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ) {
    const lineText = doc.lineAt(position).text;
    const wordRange = doc.getWordRangeAtPosition(position, /[\w|\-]+\b/);
    const tag = (lineText.match(/(?<=<\/?)[\w|\-]+\b/) || [])[0];
    const word = doc.getText(wordRange);

    if (!tag) {
      return;
    }

    if (tag !== word) {
      return;
    }

    if (wxTags.includes(tag)) {
      return [];
    }

    const filePath = doc.fileName;
    let jsonFile = filePath.replace(".wxml", ".json");

    if (!rootPath) {
      rootPath = findRootPath(filePath);
    }

    let config = JSON.parse(fs.readFileSync(jsonFile).toString());
    let compPath;

    if (config.usingComponents && config.usingComponents[tag]) {
      compPath = config.usingComponents[tag];
    }

    // 页面或者组件没有定义，查找一下全局配置
    if (!compPath) {
      jsonFile = path.join(rootPath, appFile);
      config = JSON.parse(fs.readFileSync(jsonFile).toString());

      if (config.usingComponents && config.usingComponents[tag]) {
        compPath = config.usingComponents[tag];
      }
    }

    const componentPath = path.join(rootPath, `${compPath}.js`);

    return new vscode.Location(
      vscode.Uri.file(componentPath),
      new vscode.Position(0, 0)
    );
  }
}

/**
 *  wxml  'alt + '  Component
 * @param e - The configuration change event.
 * @param enableJumpComponent  Component
 * @param context vscode  context
 */
export function jumpCompListener(
  enableJumpComponent: boolean,
  context: vscode.ExtensionContext,
  e?: vscode.ConfigurationChangeEvent,
) {
  console.log("🚀 ~ affectsConfiguration: enableJumpComponent: ", enableJumpComponent, e &&!e.affectsConfiguration('tdesign-miniprogram-snippets.enableJumpComponent'));
  if (e &&!e.affectsConfiguration('tdesign-miniprogram-snippets.enableJumpComponent')) {
    // console.log("🚀 ~ affectsConfiguration: enableJumpComponent");
    return;
  }
  const { languages } = vscode;
  const wxml = [{ scheme: "file", language: "wxml", pattern: "**/*.wxml" }];
  if (enableJumpComponent) {
    // hover
    if (!jumpCompProvider) {
      // 避免重复注册
      jumpCompProvider = languages.registerDefinitionProvider(
        wxml,
        new jumpCompDefinitionProvider(config)
      );
      context.subscriptions.push(jumpCompProvider);
    }
  } else {
    jumpCompProvider && jumpCompProvider.dispose();
    jumpCompProvider = undefined;
  }
}
