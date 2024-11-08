/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-10-14 17:59:26
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-08 17:40:25
 * @FilePath: /tdesign-miniprogram-snippets/src/extension.ts
 * @Description: 
 */
import * as vscode from 'vscode';
import { autoConfig, schemes } from './utils';
import { config, getConfig, configActivate, configDeactivate } from './config';
import { hoverListener } from './hover/hoverProvider';
import { WxmlCompletionProvider } from './completionItem/wxmlCompletionProvider';
import { createPageListener, createComponentListener } from './commands/index';
import { jumpCompListener } from './jumpComponent/jumpComponentProvider';
import { highlightCompListener } from './highlightComponent';

const { languages } = vscode;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tdesign-miniprogram-snippets" is now active!');

	vscode.languages.getLanguages().then(resp => {
    console.log(JSON.stringify(resp));
  });

	const wxml = config.documentSelector.map(l => schemes(l));

	// wxml 自动补全
	const wxmlCompletionProvider = languages.registerCompletionItemProvider(wxml, new WxmlCompletionProvider(config), '<', ' '); // 在 < 和空格处触发补全

	// 将注册的 功能 加入插件上下文
	context.subscriptions.push(
		wxmlCompletionProvider
	);

	configActivate((e, configs) => listenFunc(e,configs));

	if (!config.disableAutoConfig) {
    autoConfig();
  }

	// listener 监听
	function listenFunc(e?:vscode.ConfigurationChangeEvent, configs?: any) {
		// console.log("🚀 ~ configActivate ~ config:", configs);
		const {
      enableHover,
      enableCreatePage,
      enableCreateComponent,
      enableJumpComponent,
      enableHighlightComponent,
    } = configs;
    console.log(
      "🚀 ~ listenerFunc ~ : ",
      "1:", enableHover,
			"2:", enableCreatePage,
			"3:", enableCreateComponent,
			"4:", enableJumpComponent,
			"5:", enableHighlightComponent,
    );
		if(!e) {
			return;
		}
		// hover 悬停
		hoverListener(e, enableHover, context);
		// 注册创建页面命令
		createPageListener(e, enableCreatePage, context);
		// 注册创建组件命令
		createComponentListener(e, enableCreateComponent, context);
		// 在 wxml 页面，'alt + 点击自定义组件的标签名'跳转到对应的组件页面
		jumpCompListener(e, enableJumpComponent, context);
		// 高亮组件
		highlightCompListener(e, enableHighlightComponent, context);
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	configDeactivate();
}
