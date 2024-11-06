/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-10-14 17:59:26
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-06 11:14:59
 * @FilePath: /tdesign-miniprogram-snippets/src/extension.ts
 * @Description: 
 */
import * as vscode from 'vscode';
import { autoConfig, schemes } from './utils';
import { config, getConfig, configActivate, configDeactivate } from './config';
import { hoverListener } from './hover/hoverProvider';
import { WxmlCompletionProvider } from './completionItem/wxmlCompletionProvider';
import { createPageListener, createComponentListener } from './commands/index';

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

	configActivate((configs) => listenFunc(configs));

	if (!config.disableAutoConfig) {
    autoConfig();
  }

	// listener 监听
	function listenFunc(configs: any) {
			// console.log("🚀 ~ configActivate ~ config:", configs);
			const { enableHover, enableCreatePage, enableCreateComponent } = configs;
			console.log("🚀 ~ listenerFunc ~ :", enableHover, enableCreatePage, enableCreateComponent);
			
			hoverListener(enableHover, context); // hover 悬停

			createPageListener(enableHover, context); // 注册创建页面命令

			createComponentListener(enableHover, context); // 注册创建组件命令
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	configDeactivate();
}
