import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    // 需要构建的
    entries: ['src/index'],
    // 构建前是否删除已有
    clean: true,
    outDir: "dist",
    rollup: {
        inlineDependencies: true,
        esbuild: {
            // 减少大小
            minify: true
        },
    },
    // 别名
    alias: {
        // we can always use non-transpiled code since we support 14.18.0+
        prompts: 'prompts/lib/index.js'
    },
})