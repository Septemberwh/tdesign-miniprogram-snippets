import * as vscode from 'vscode';
import { autoConfig, schemes } from './utils';
import { config, getConfig, configActivate, configDeactivate } from './config';
import { HoverProvider, registerHoverProvider, disposeHoverProvider } from './hover/hoverProvider';
import { WxmlCompletionProvider } from './completionItem/wxmlCompletionProvider';
import { Commands } from './commands/index';

const { languages } = vscode;

let hoverProvider: vscode.Disposable | undefined; // 存储悬停提供器
let createPageCommand: vscode.Disposable | undefined;
let createComponentCommand: vscode.Disposable | undefined;

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

	configActivate((configs) => listenerFunc(configs));

	if (!config.disableAutoConfig) {
    autoConfig();
  }

	// listener 监听
	function listenerFunc(configs: any) {
			// console.log("🚀 ~ configActivate ~ config:", configs);
			const { enableHover, enableCreatePage, enableCreateComponent } = configs;
			console.log("🚀 ~ listenerFunc ~ :", enableHover, enableCreatePage, enableCreateComponent);
			if (enableHover) { // hover
				if(!hoverProvider) { // 避免重复注册
					hoverProvider = languages.registerHoverProvider(wxml, new HoverProvider(config));
				}
				context.subscriptions.push(hoverProvider);
			} else {
				hoverProvider && hoverProvider.dispose();
				hoverProvider = undefined;
			}
			if (enableCreatePage) { // 注册创建页面命令
				if(!createPageCommand) {
					createPageCommand = vscode.commands.registerCommand(`tdesign-miniprogram-snippets.createPage`, Commands.page);
				}
				context.subscriptions.push(createPageCommand);
			} else {
				createPageCommand && createPageCommand.dispose();
				createPageCommand = undefined;
			}
			if (enableCreateComponent) { // 注册创建组件命令
				if(!createComponentCommand) {
					createComponentCommand = vscode.commands.registerCommand(`tdesign-miniprogram-snippets.createComponent`,Commands.component);
				}
				context.subscriptions.push(createComponentCommand);
			} else {
				createComponentCommand && createComponentCommand.dispose();
				createComponentCommand = undefined;
			}
	}
}

// This method is called when your extension is deactivated
export function deactivate() {
	configDeactivate();
}
