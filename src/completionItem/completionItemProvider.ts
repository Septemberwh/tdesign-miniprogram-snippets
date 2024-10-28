import * as vscode from 'vscode';
import { CompletionData } from './completionItemData';

/**
 * 判断光标是否在指定标签内。
 */
function isInsideTag(
  document: vscode.TextDocument, 
  position: vscode.Position, 
  tagName: string
): boolean {
  const text = document.getText();
  const tagRegex = new RegExp(`<${tagName}[^>]*>`, 'g');
  let match;
  while ((match = tagRegex.exec(text)) !== null) {
    const tagStart = document.positionAt(match.index);
    const tagEnd = document.positionAt(match.index + match[0].length);
    if (position.isAfter(tagStart) && position.isBefore(tagEnd)) {
      console.log(`Inside tag: ${tagName}`); // 打印日志
      return true;
    }
  }
  return false;
}

/**
 * 判断光标是否在自定义组件标签内。
 */
function getTagNameAtPosition(
  document: vscode.TextDocument, 
  position: vscode.Position
): string | null {
  const text = document.getText();
  const tagRegex = /<([\w-]+)[^>]*>/g; // 匹配组件标签名
  let match;

  while ((match = tagRegex.exec(text)) !== null) {
    const tagStart = document.positionAt(match.index);
    const tagEnd = document.positionAt(match.index + match[0].length);

    if (position.isAfter(tagStart) && position.isBefore(tagEnd)) {
      console.log(`Detected tag: ${match[1]}`); // 打印检测到的标签名
      return match[1]; // 返回标签名称
    }
  }
  return null;
}

/**
 * 创建 CompletionItem 实例。
 */
function createCompletionItem(
  label: string,
  detail: string,
  documentation: string
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Property);
  item.detail = detail;
  item.documentation = new vscode.MarkdownString(documentation);
  return item;
}

/**
 * 提供 WXML 组件属性补全。
 */
export const registerCompletionItemProvider: vscode.CompletionItemProvider = {
  provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
    const tagName: string = getTagNameAtPosition(document, position) ?? '';

    if (tagName && tagName in CompletionData) {

      console.log(`Providing completion for: ${tagName}`); // 打印日志
      const tagData = CompletionData[tagName as keyof typeof CompletionData];

      const completionItems: vscode.CompletionItem[] = [];

      for (const attr of tagData.attrs) {
        if (attr.name) {
          completionItems.push(createCompletionItem(attr.name, attr.content, attr.desc));
        }
      }
      console.log(`Providing ${completionItems.length} completion items`); // 打印日志
      return completionItems;
    }
  }
};