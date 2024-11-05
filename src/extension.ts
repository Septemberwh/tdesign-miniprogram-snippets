import * as vscode from 'vscode';
import { autoConfig, schemes } from './utils';
import { config, getConfig, configActivate, configDeactivate } from './config';
import { HoverProvider, registerHoverProvider, disposeHoverProvider } from './hover/hoverProvider';
import { WxmlCompletionProvider } from './completionItem/wxmlCompletionProvider';

const { languages } = vscode;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "tdesign-miniprogram-snippets" is now active!');
	configActivate();

	if (!config.disableAutoConfig) {
    autoConfig();
  }

	vscode.languages.getLanguages().then(resp => {
    console.log(JSON.stringify(resp));
  });

	const wxmlCompletionProvider = new WxmlCompletionProvider(config);
	// const hoverProvider = new HoverProvider(config);

	const wxml = config.documentSelector.map(l => schemes(l));

	// 将注册的 功能 加入插件上下文
	context.subscriptions.push(
		// hover
		// languages.registerHoverProvider(wxml, hoverProvider),
 		// 自动补全
		languages.registerCompletionItemProvider(wxml, wxmlCompletionProvider, '<', ' '),// 在 < 和空格处触发补全
	);

	// 初始化时判断是否启用悬停提示
	if (getConfig('enableHover')) {
		registerHoverProvider(context);
	}
	// 监听配置变化，动态启用或禁用悬停提示
	vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('tdesign-miniprogram-snippets.enableHover')) {
			const enableHover = getConfig('enableHover');
			if (enableHover) {
				registerHoverProvider(context);
				// vscode.window.showInformationMessage('悬停提示已启用');
			} else {
				disposeHoverProvider();
				// vscode.window.showInformationMessage('悬停提示已禁用');
			}
		}
	});
}

// This method is called when your extension is deactivated
export function deactivate() {
	configDeactivate();
	disposeHoverProvider(); // 插件停用时销毁悬停提供器
}
