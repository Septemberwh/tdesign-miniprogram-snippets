      {
        "category": "TDesign Miniprogram Snippets",
        "command": "tdesign-miniprogram-snippets.formatWxml",
        "title": "format wxml"
      },

      
      "editor/context": [
        {
          "command": "tdesign-miniprogram-snippets.formatWxml",
          "group": "navigation",
          "when": "editorLangId == wxml"
        }
      ],        
        
        "tdesign-miniprogram-snippets.resolveRoots": {
          "type": "array",
          "description": "解析文件引用关系用的根目录",
          "default": [
            "node_modules",
            "src"
          ],
          "items": {
            "type": "string"
          }
        },
        "tdesign-miniprogram-snippets.disableAutoConfig": {
          "type": "boolean",
          "description": "默认在启动时会自动相关文件关联的配置项，配置成功后会将此配置自动设置成 true，避免下次启动再重新配置",
          "default": true
        },
        "tdesign-miniprogram-snippets.documentSelector": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true,
          "default": [
            "wxml"
          ],
          "description": "关联的文件类型，默认关联 wxml，如可以加上 html，这样在 html 中也可以有 wxml 的功能"
        },
        "tdesign-miniprogram-snippets.enableFormatWxml": {
          "type": "boolean",
          "description": "启用或禁用右键格式化 wxml",
          "default": true
        },
        "tdesign-miniprogram-snippets.createComponentSource": {
          "default": "",
          "description": "新建组件时使用的模板来源，路径必须为目录，至少包含index.js、index.wxml、index.wxss、index.json这四个文件",
          "type": "string"
        },
        "tdesign-miniprogram-snippets.createPageSource": {
          "default": "",
          "description": "新建页面时使用的模板来源，路径必须为目录，至少包含index.js、index.wxml、index.wxss、index.json这四个文件",
          "type": "string"
        },