# Power View Frontend

基于 Next.js 14 构建的设备监控管理系统前端项目。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS + SCSS Modules
- **UI 组件**: shadcn/ui
- **状态管理**: Zustand
- **国际化**: next-intl

## 项目结构

```
src/
├── app/                    # App Router 目录
│   ├── [locale]/          # 多语言路由
│   │   ├── (auth)/       # 认证相关页面
│   │   └── (main)/       # 主应用页面
├── components/            # 公共组件
│   ├── ui/               # UI 基础组件
│   └── ...               # 业务组件
├── i18n/                 # 国际化配置
├── interfaces/           # TypeScript 类型定义
├── lib/                  # 工具函数
├── middleware/          # 中间件
├── sectors/             # 布局区块
├── store/              # 状态管理
└── styles/             # 全局样式
```

## 主要功能

### 设备管理
- 支持表格/卡片两种视图模式
- 统一的搜索过滤功能
- 设备状态实时展示
- 批量操作支持

### 用户系统
- 用户认证与授权
- 个人信息管理
- 权限控制

### 系统配置
- 多语言支持 (中文/英文)
- 主题定制
- 响应式布局

## 开发说明

1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm dev
```

3. 构建生产版本
```bash
pnpm build
```

## 开发规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 组件使用 SCSS Modules 进行样式隔离
- 提交前运行测试确保代码质量

## 部署

项目支持多种部署方式：
- Vercel (推荐)
- Docker
- 静态文件托管

详细部署文档请参考 `docs/deploy.md`
