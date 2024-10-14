import * as vscode from 'vscode';
import { hoverData as _hoverData } from './hoverData';

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
    return new vscode.Hover(new vscode.MarkdownString(hoverData[word])); // Markdown 支持
  }

  return undefined;
}
