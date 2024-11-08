/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-11-06 11:39:45
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-08 15:55:56
 * @FilePath: /tdesign-miniprogram-snippets/src/config/index.ts
 * @Description: 配置项
 */
import * as vscode from 'vscode';
import * as path from 'path';

let listener: vscode.Disposable;

export interface Config {
  getResolveRoots: (doc: vscode.TextDocument) => string[];
  resolveRoots: string[]; // 解析自定义组件的根目录
  disableAutoConfig: boolean; // /** 默认在启动时会自动相关文件关联的配置项，配置成功后会将此配置自动设置成 true，避免下次启动再重新配置 */
  documentSelector: string[]; /** 关联类型 */
  enableFormatWxml: boolean;
  //
  enableHover: boolean; // 启用或禁用悬停提示
  //
  createPageSource: string;
  createComponentSource: string;
  enableCreatePage: boolean;
  enableCreateComponent: boolean;
  //
  enableJumpComponent: boolean;
  // 组件高亮
  editTagName: object;
  enableHighlightComponent: Boolean;
  ignoreHighlightComponentArray: string[];
  cache: Boolean;
}

export const config: Config = {
  getResolveRoots,
  resolveRoots: [],
  disableAutoConfig: false,
  documentSelector: ['wxml'],
  enableFormatWxml: false,
  //
  enableHover: true,
  //
  createPageSource: '',
  createComponentSource: '',
  enableCreatePage: false,
  enableCreateComponent: false,
  //
  enableJumpComponent: false,
  // 组件高亮
  editTagName: {},
  enableHighlightComponent: false,
  ignoreHighlightComponentArray: [],
  cache: false,
  //
};

function getAllConfig(e?: vscode.ConfigurationChangeEvent, cb?: ((config: Config) => void) | undefined) {
  // if (e && !e.affectsConfiguration('tdesign-miniprogram-snippets')) {
  //   console.log("🚀 ~ getAllConfig ~ No affectsConfiguration: tdesign-miniprogram-snippets");
  //   return;
  // }
  const TMS = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets');
  //
  config.resolveRoots = TMS.get('resolveRoots', ['src', 'node_modules']);
  config.disableAutoConfig = TMS.get('disableAutoConfig', false);
  config.documentSelector = TMS.get('documentSelector', ['wxml']);
  config.enableFormatWxml = TMS.get('enableFormatWxml', false);
  //
  config.enableHover = TMS.get('enableHover', true);
  //
  config.createPageSource = TMS.get('createPageSource', '');
  config.createComponentSource = TMS.get('createComponentSource', '');
  config.enableCreatePage = TMS.get('enableCreatePage', false);
  config.enableCreateComponent = TMS.get('enableCreateComponent', false);
  //
  config.enableJumpComponent = TMS.get('enableJumpComponent', false);
  //
  config.editTagName = TMS.get('highlightComponent.editTagName', {});
  config.enableHighlightComponent = TMS.get('highlightComponent.enableHighlightComponent', false);
  config.ignoreHighlightComponentArray = TMS.get('highlightComponent.ignoreHighlightComponentArray', []);
  config.cache = false;

  // console.log("🚀 ~ getAllConfig ~ config:", JSON.stringify(config));
  cb && cb(config);
}

export function getConfig(key: string) {
  const TMS = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets');
  const value = TMS.get(key);
  return value;
}

function getResolveRoots(doc: vscode.TextDocument) {
  let root = vscode.workspace.getWorkspaceFolder(doc.uri) as vscode.WorkspaceFolder;
  return root ? config.resolveRoots.map(r => path.resolve(root.uri.fsPath, r)) : [];
}

export function configActivate(cb?: (config: Config) => void) {
  listener = vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
    getAllConfig(e, cb);
  });
  getAllConfig();
}

export function configDeactivate() {
  listener.dispose();
}