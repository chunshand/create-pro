// 交互
import prompts from 'prompts'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
// 进程 暂未用到主要是 执行进入目录 执行 npm install 之类的操作
// import spawn from 'cross-spawn'
// 命令行颜色
import {
    reset,
} from 'kolorist'

function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.resolve(srcDir, file)
        const destFile = path.resolve(destDir, file)
        copy(srcFile, destFile)
    }
}
function copy(src: string, dest: string) {
    const stat = fs.statSync(src)
    if (stat.isDirectory()) {
        copyDir(src, dest)
    } else {
        fs.copyFileSync(src, dest)
    }
}
/**处理模板 */
function handleTpl(TplName: string, ProDir: string) {
    const templateDir = path.resolve(
        fileURLToPath(import.meta.url),
        '../..',
        `tpl-${TplName}`
    )
    copy(templateDir, ProDir);
}
async function run() {
    try {
        let result = await prompts([
            {
                /**
                 * text  文本
                 * password 密码
                 * number 数字
                 * confirm 是否
                 * list 输入后返回数组
                 * toggle tab 切换选择
                 * select 可通过上下选择列表
                 * multiselect 同上 但是多选
                 * autocomplete 模糊搜索
                 * date 时间输入
                 * invisible 输入不可见
                 */
                type: 'text',
                name: 'projectName',
                message: reset('Project name:'),
                // 默认值
                initial: "project-name",

            },
            {
                type: 'select',
                name: 'tpl',
                message: reset('选择一个模板:'),
                // 选择列表
                choices: [
                    { title: '模板A', description: '模板A 描述文字', value: 'a' },
                    { title: '模板B', description: '模板A 描述文字', value: 'b' }
                ],
                initial: 1,
            }
        ])
        // 创建文件夹
        fs.mkdirSync("./" + result.projectName, { recursive: true })
        // 拷贝模板
        handleTpl(result.tpl, "./" + result.projectName);
    } catch (error) {
        console.log(error);
    }
}

run();
