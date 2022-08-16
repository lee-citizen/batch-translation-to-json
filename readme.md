# 批量翻译生成JSON
![batch-translation-to-json](https://socialify.git.ci/lee-citizen/batch-translation-to-json/image?description=1&descriptionEditable=%E4%B8%80%E4%B8%AA%E5%9F%BA%E4%BA%8Evite%2Bvue3%E7%9A%84%E6%89%B9%E9%87%8F%E7%BF%BB%E8%AF%91%E7%94%9F%E6%88%90json%E5%B7%A5%E5%85%B7&font=Inter&language=1&owner=1&pattern=Floating%20Cogs&stargazers=1&theme=Light)
使用技术：
- 框架：vue-next
- 构建工具：vite
- 原子化css：uno.css
- 请求库：axios
- 在线地址：[http://json.wdxdd.top](http://json.wdxdd.top)
- github仓库：[仓库](https://github.com/lee-citizen/batch-translation-to-json)

# 使用场景
- 可用于i18n.js国际化项目，自动批量翻译
# 私有部署
```
npm run build
```
# 效果

- PC ![pc端](/img/demo1.jpg)
- 移动 ![手机端](/img/demo2.jpg)
## 内部搭建配置（纯js）：
修改src/config/index.js
```javascript
// 有道应用配置
export const YD_APP_KEY = "78ab6bc4c8f5e1a5"
export const YD_KEY ='jYOJPLr0Mu9rCp77YAMWGYX1GirBe92w'
// 百度应用配置
export const BD_APP_ID = '20200811000539625'
export const BD_KEY = 'qoLUfDJ1scEIdj3RitFC'
```
# 计划中
-  ✅️支持多语言选择
-  ✅️可设置需要的命名方式
-  ✅️支持百度有道翻译
-  ✅️JSON格式化支持复制
# 更新日志
## 2022年8月15日
- 首次提交


