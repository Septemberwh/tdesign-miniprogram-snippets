// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerHoverProvider, disposeHoverProvider } from './hover/hoverProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// 获取配置
	const config = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets');

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tdesign-miniprogram-snippets" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('tdesign-miniprogram-snippets.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from tdesign-miniprogram-snippets!');
	});

	// 将注册的 功能 加入插件上下文
	context.subscriptions.push(disposable);

	// 初始化时判断是否启用悬停提示
	if (config.get<boolean>('enableHover')) {
		registerHoverProvider(context);
	}

	// 监听配置变化，动态启用或禁用悬停提示
	vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('tdesign-miniprogram-snippets.enableHover')) {
			const enableHover = vscode.workspace.getConfiguration('tdesign-miniprogram-snippets').get<boolean>('enableHover');
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
	disposeHoverProvider(); // 插件停用时销毁悬停提供器
}
