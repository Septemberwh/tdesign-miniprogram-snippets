import * as vscode from 'vscode';
import * as path from 'path';

let listener: vscode.Disposable;

export interface Config {
  getResolveRoots: (doc: vscode.TextDocument) => string[]
  resolveRoots: string[], // 解析自定义组件的根目录
  enableHover: boolean, // 启用或禁用悬停提示
  /** 默认在启动时会自动相关文件关联的配置项，配置成功后会将此配置自动设置成 true，避免下次启动再重新配置 */
  disableAutoConfig: boolean,
  /** 关联类型 */
  documentSelector: string[],
}

export const config: Config = {
  getResolveRoots,
  resolveRoots: [],
  enableHover: true,
  disableAutoConfig: false,
  documentSelector: ['wxml'],
};

function getAllConfig() {
  const TMS = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets');
  config.enableHover = TMS.get('enableHover', true);
  config.resolveRoots = TMS.get('resolveRoots', ['src', 'node_modules']);
  config.disableAutoConfig = TMS.get('disableAutoConfig', false);
  config.documentSelector = TMS.get('documentSelector', ['wxml']);
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

export function configActivate() {
  listener = vscode.workspace.onDidChangeConfiguration(getAllConfig);
  getAllConfig();
}

export function configDeactivate() {
  listener.dispose();
}