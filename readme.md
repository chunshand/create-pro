# 创建项目

简单实现 create-vite 根据模板创建项目


- bin 设置脚手架执行文件
  - key create-[name] `npm create name`
  - value 文件

- files 决定哪些文件要发布出去


## 开发依赖

- cross-spawn 可以帮助我们开启多个进程，干更多的事情 (暂未使用)
  - 进入目录 执行npm install
- kolorist 为命令行添加颜色，更好的使用的体验
- minimist 轻量级的命令参数解析，就是可以获获取 mode=dev 之类的
- prompts 命令交互提示，例如：单选 多选 输入等
- unbuild 基于rollup的构建工具

## 调试

两种方式调试

第一种 直接执行 `npm fun dev` 当前项目会创建项目目录 需注意

第二种 使用软连接调试

- `npm run build`
- 包目录 `npm link`
- 在新的文件夹下 `npm create pro`



最后：
- index.js 增加了 `#!/usr/bin/env node` 否则会报错
- `npm link` 前 需要`npm run build` 