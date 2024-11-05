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
  enableFormatWxml: boolean,
  createPageSource: string,
  createComponentSource: string,
  enableCreatePage: boolean,
  enableCreateComponent: boolean,
}

export const config: Config = {
  getResolveRoots,
  resolveRoots: [],
  enableHover: true,
  disableAutoConfig: false,
  documentSelector: ['wxml'],
  enableFormatWxml: true,
  createPageSource: '',
  createComponentSource: '',
  enableCreatePage: true,
  enableCreateComponent: true,
};

function getAllConfig(e?: vscode.ConfigurationChangeEvent, cb?: ((config: Config) => void) | undefined) {
  const TMS = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets');
  config.enableHover = TMS.get('enableHover', true);
  config.resolveRoots = TMS.get('resolveRoots', ['src', 'node_modules']);
  config.disableAutoConfig = TMS.get('disableAutoConfig', false);
  config.documentSelector = TMS.get('documentSelector', ['wxml']);
  config.enableFormatWxml = TMS.get('enableFormatWxml', true);
  config.createPageSource = TMS.get('createPageSource', '');
  config.createComponentSource = TMS.get('createComponentSource', '');
  config.enableCreatePage = TMS.get('enableCreatePage', true);
  config.enableCreateComponent = TMS.get('enableCreateComponent', true);

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
  listener = vscode.workspace.onDidChangeConfiguration(event => {
    getAllConfig(event, cb);
  });
  getAllConfig();
}

export function configDeactivate() {
  listener.dispose();
}