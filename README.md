# 真白萌 RPG 游戏前端

## 开发规范（没那么严格啦）
1. 注释
  - 函数（或对象方法）必须写注释，其他随缘.
  - 注释可以写中文（Cerallin 写英语是因为她懒得切输入法）.
2. 缓存
  - 使用 web storage 技术而不是 cookie.
  - 尽量使用 [cache provider](./src/providers/cache.js).
  - cache provider 将缓存转义成 base64 字符串存储.
3. HTTP 请求
  - 所有 HTTP 请求都应该在 `@/src/api` 文件夹下封装.
5. Botstrap
  - 尽量使用 flex 布局
  - 慎用 BootstrapVue 的 HTML 组件（components），vue 实例中的 js 方法则不用顾忌.

## 依赖
- Vue (MVVM 框架)
- Vue Router (前端路由)
- Bootstrap (前端样式)
- BootstrapVue (Vue 的一个插件)
- Axios (HTTP 请求)

## TODOs
- [X] dropdown menu for user info
- [X] collapse navbar

## 安装
```
npm install
```

### 编译并启动热修改监听服务器
```
npm run serve
```

### 编译线上版本
```
npm run build
```
