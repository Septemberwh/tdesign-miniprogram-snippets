/*
 * @Author: Wong septwong@foxmail.com
 * @Date: 2024-11-05 18:26:31
 * @LastEditors: Wong septwong@foxmail.com
 * @LastEditTime: 2024-11-08 17:46:30
 * @FilePath: /tdesign-miniprogram-snippets/src/commands/index.ts
 * @Description: 指令
 */
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';
import { config } from '../config';

let createPageCommand: vscode.Disposable | undefined;
let createComponentCommand: vscode.Disposable | undefined;

const types = {
  page: '页面',
  component: '组件',
};

type Type = keyof typeof types; // Create a type that is a union of the keys in types

const copyFile = function(pageDir:any, pageSource:any, type:Type) {
  // console.log('copyFile: ', pageDir, pageSource, type);
  
  // 目录不存在时，使用默认模板
  if (!fs.pathExistsSync(pageDir)) {
    // 页面/组件所在目录不存在
    vscode.window.showErrorMessage(`${types[type]}所在目录不存在！`);
    return;
  }

  if (!fs.pathExistsSync(pageSource)) {
    // 页面/组件模板不存在
    vscode.window.showErrorMessage(`${types[type]}模板不存在！`);
    return;
  }

  // 预设路径为当前目录
  vscode.window
    .showInputBox({
      placeHolder: `请输入${types[type]}目录名称`,
      prompt: `请输入${types[type]}目录名称`,
    })
    .then((pageName) => {
      if (pageName) {
        const targetPath = path.join(pageDir, pageName);
        fs.ensureDirSync(targetPath);
        fs.copySync(pageSource, targetPath);
      } else {
        vscode.window.showErrorMessage('名称不能为空！');
      }
    });
};

const createPage = function(type: Type, url: any) {
  let pageSource = '';
  // console.log('createPage: ', type, url);
  
  if (type === 'page') {
    pageSource = config.createPageSource;
  } else {
    pageSource = config.createComponentSource;
  }

  // 目录不存在时，使用默认模板
  if (!fs.pathExistsSync(pageSource)) {
    pageSource = path.join(path.dirname(__filename), `../../templates/${type}`);
  }
  // console.log('pageSource: ', pageSource);

  if (!url) {
    // const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    let rootPath = '';
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    } else {
      // 处理没有打开任何工作区文件夹的情况
    }
    const { activeTextEditor } = vscode.window;
    let currentFileDir = '';

    if (activeTextEditor) {
      const currentFilePath = activeTextEditor.document.fileName;
      currentFileDir = path.dirname(currentFilePath);
    }

    vscode.window
      .showInputBox({
        placeHolder: `请输入${types[type]}所在目录路径`,
        prompt: `请输入${types[type]}所在目录路径`,
        value: currentFileDir || rootPath,
      })
      .then((pageDir) => {
        if (pageDir) {
          copyFile(pageDir, pageSource, type);
        } else {
          vscode.window.showErrorMessage('路径不能为空！');
        }
      });

    return;
  }

  copyFile(url.fsPath, pageSource, type);
};

export const Commands = {
  page: function(url:any) {
    // console.log('page url: ', url);
    return createPage('page', url);
  },
  component: function(url:any) {
    // console.log('component url: ', url);
    return createPage('component', url);
  },
};

/**
 * Registers or disposes the create page command based on the configuration.
 * If `enableCreatePage` is true, it registers the command to create a page,
 * otherwise, it disposes of the command if it exists.
 * 
 * @param e - The configuration change event.
 * @param enableCreatePage - A boolean indicating whether to enable the create page command.
 * @param context - The VSCode extension context for managing disposables.
 */
export function createPageListener(
  e: vscode.ConfigurationChangeEvent,
  enableCreatePage: boolean,
  context: vscode.ExtensionContext
) {
  if (!e.affectsConfiguration('tdesign-miniprogram-snippets.enableCreatePage')) {
    console.log("🚀 ~ affectsConfiguration: enableCreatePage");
    return;
  }
  if (enableCreatePage) {
    // 注册创建页面命令
    if (!createPageCommand) {
      vscode.commands.executeCommand(
        "setContext",
        "tdesign-miniprogram-snippets.showCreatePageCommand",
        true
      );
      createPageCommand = vscode.commands.registerCommand(
        `tdesign-miniprogram-snippets.createPage`,
        Commands.page
      );
      context.subscriptions.push(createPageCommand);
    }
  } else {
    vscode.commands.executeCommand(
      "setContext",
      "tdesign-miniprogram-snippets.showCreatePageCommand",
      false
    );
    createPageCommand && createPageCommand.dispose();
    createPageCommand = undefined;
  }
}

/**
 * Registers or disposes the create component command based on the configuration.
 * If `enableCreateComponent` is true, it registers the command to create a component,
 * otherwise, it disposes of the command if it exists.
 * 
 * @param e - The configuration change event.
 * @param enableCreateComponent - A boolean indicating whether to enable the create component command.
 * @param context - The VSCode extension context for managing disposables.
 */
export function createComponentListener(
  e: vscode.ConfigurationChangeEvent,
  enableCreateComponent: boolean,
  context: vscode.ExtensionContext
) {
  if (!e.affectsConfiguration('tdesign-miniprogram-snippets.enableCreateComponent')) {
    console.log("🚀 ~ affectsConfiguration: enableCreateComponent");
    return;
  }
  if (enableCreateComponent) {
    // 注册创建组件命令
    if (!createComponentCommand) {
      vscode.commands.executeCommand(
        "setContext",
        "tdesign-miniprogram-snippets.showCreateComponentCommand",
        true
      );
      createComponentCommand = vscode.commands.registerCommand(
        `tdesign-miniprogram-snippets.createComponent`,
        Commands.component
      );
      context.subscriptions.push(createComponentCommand);
    }
  } else {
    vscode.commands.executeCommand(
      "setContext",
      "tdesign-miniprogram-snippets.showCreateComponentCommand",
      false
    );
    createComponentCommand && createComponentCommand.dispose();
    createComponentCommand = undefined;
  }
}