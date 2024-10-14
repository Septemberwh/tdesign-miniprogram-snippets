// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getComponentNameAtPosition, getTDesignHoverContent } from './hover';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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

	// 注册 HTML 文件中的悬停提示
	// const htmlHoverProvider = vscode.languages.registerHoverProvider('html', {
	// 	provideHover(document, position, token) {
	// 		const word = document.getText(document.getWordRangeAtPosition(position));
	// 		return getTDesignHoverContent(word);
	// 	}
	// });

	// 注册 WXML 文件中的悬停提示
	const wxmlHoverProvider = vscode.languages.registerHoverProvider('wxml', {
		provideHover(document, position) {
			const word = getComponentNameAtPosition(document, position);
			return getTDesignHoverContent(word);
		}
	});

	// 将注册的 功能 加入插件上下文
	context.subscriptions.push(disposable, wxmlHoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() { }
