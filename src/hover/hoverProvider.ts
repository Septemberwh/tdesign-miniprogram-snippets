import * as vscode from 'vscode';
import { Config } from '../config';
import { hoverData as _hoverData } from './hoverData';

let hoverProvider: vscode.Disposable | undefined; // 存储悬停提供器

/**
 * 获取当前光标位置的完整组件名称（支持 `t-button` 等）。
 */
export function getComponentNameAtPosition(
  document: vscode.TextDocument,
  position: vscode.Position
): string {
  const range = document.getWordRangeAtPosition(position, /[a-zA-Z-]+/);
  return range ? document.getText(range) : '';
}

/**
 * 根据组件名称返回对应的悬停提示内容。
 */
export function getTDesignHoverContent(word: string): vscode.Hover | undefined {
  const hoverData: { [key: string]: string } = _hoverData || {};

  if (hoverData[word]) {
    // return new vscode.Hover(hoverData[word]);
    const markdown = new vscode.MarkdownString(hoverData[word]);
    markdown.isTrusted = true; // 允许使用 Markdown 格式
    return new vscode.Hover(markdown);
  }

  return undefined;
}

export class HoverProvider implements HoverProvider {
  constructor(public config: Config) {}

  provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const word = getComponentNameAtPosition(document, position);
    const hoverData = getTDesignHoverContent(word);
    return hoverData;
  }
}

// 注册悬停提供器的函数
export function registerHoverProvider(context: vscode.ExtensionContext) {
  if (!hoverProvider) { // 避免重复注册
    hoverProvider = vscode.languages.registerHoverProvider('wxml', {
      provideHover(document, position) {
        const word = getComponentNameAtPosition(document, position);
        return getTDesignHoverContent(word);
      }
    });

    // 注册到 context.subscriptions，确保插件停用时自动清理
    context.subscriptions.push(hoverProvider);
  }
}

// 销毁悬停提供器的函数
export function disposeHoverProvider() {
  if (hoverProvider) {
    hoverProvider.dispose(); // 销毁提供器
    hoverProvider = undefined;
  }
}

