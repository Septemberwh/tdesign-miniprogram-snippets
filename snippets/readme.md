# 定义 TDesign 的代码片段

- `prefix` 是用户在输入时触发代码补全的关键字，例如 td-button。
- `body` 是当用户选择补全时插入的代码内容。支持变量和占位符 ${1}、${2}，也支持选择项 ${1|option1,option2|}。
- `description` 是对代码片段的简短描述。

```json
{
  "TDesign Button": {
    "prefix": "td-button",
    "body": [ // body 是一个数组，每一项代表代码片段中的一行。
      // ${1|primary,secondary,danger|}：表示 type 属性的占位符，用户可以在 primary、secondary 和 danger 之间进行选择。
      // ${2|medium,small,large|}：表示 size 属性的占位符，用户可以在 medium、small、large 之间选择。
      // ${3:Button Text}：光标将会移动到 ${3} 的位置，用户可以直接输入按钮的文本。
      "<button class='t-button' type='${1|primary,secondary,danger|}' size='${2|medium,small|}'>${3:Button}</button>",
    ],
    "description": "TDesign Button 组件"
  },
  "TDesign Icon": {
    "prefix": "td-icon",
    "body": [
      "<icon class='t-icon-${1:home}' size='${2|small,medium,large|}' />"
    ],
    "description": "TDesign Icon 组件"
  },
  "TDesign Dialog": {
    "prefix": "td-dialog",
    "body": [
      // \"：在 JSON 中表示引号，必须进行转义。
      // ${1:true}：表示 visible 的默认值是 true，光标会停留在这里供用户修改。
      "<dialog class=\"t-dialog\" visible=\"{{${1:true}}}\">",
      "  <view slot=\"header\">${2:Header}</view>",
      "  <view slot=\"body\">${3:Dialog body content}</view>",
      "  <view slot=\"footer\">",
      "    <button class=\"t-button\" type=\"primary\">${4:Confirm}</button>",
      "    <button class=\"t-button\" type=\"secondary\">${5:Cancel}</button>",
      "  </view>",
      "</dialog>"
    ],
    "description": "TDesign Dialog 组件"
  }
}
```
