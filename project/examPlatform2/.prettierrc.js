module.exports = {
    "experimentalTernaries": true,  // 三元组是否使用实验性语法
    "printWidth": 200,  // 单行最大长度
    "tabWidth": 4,  // 缩进长度
    "useTabs": false,  // 是否使用制表符
    "semi": true,  // 语句结尾是否加分号
    "singleQuote": false,  // 字符串是否使用单引号
    "quoteProps": "as-needed",  // 对象属性是否加引号, 如: {a: 1, b: 2}/{'a': 1, 'b': 2}
    "jsxSingleQuote": false,  // JSX属性是否使用单引号
    "trailingComma": "none",  // 结尾是否加逗号, 如: [1, 2, 3]/[1, 2, 3,]
    "bracketSpacing": true,  // 对象字面量中是否加空格, 如: { a: 1 }
    "bracketSameLine": false,  // HTML多属性换行后结尾>是否另起一行
    "arrowParens": "avoid",  // 箭头函数参数是否加括号, 如: (a) => a + 1/a => { return a + 1 }
    "rangeStart": 0,  // 格式化范围开始行, 0表示从第一行开始
    "proseWrap": "preserve",  // 文本是否保持原样, always表示超出换行, never表示折行, preserve表示保持原样
    /** HTML空白敏感度
     *
     * css: 空白敏感，会保留空白符和换行符
     *     如: <div> <span> </span> </div>
     * strict: 空白敏感，会保留空白符和换行符，并在开始和结束标签之间添加空格
     *     如: <div> <span> </span> </div>
     * ignore: 空白不敏感，会忽略空白符和换行符，并在开始和结束标签之间添加空格
     *     如: <div><span></span></div>
     * */
    "htmlWhitespaceSensitivity": "ignore",
    "vueIndentScriptAndStyle": false,  // 是否缩进Vue文件中的<script>和<style>标签
    "endOfLine": "lf",  // 换行符, 可选值: "lf"/"crlf"/"cr"
    "embeddedLanguageFormatting": "auto",
    "singleAttributePerLine": false,
    "plugins": []
}
