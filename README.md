## Known Issues

### Style System

- Tailwind CSS 与 Ant Design 组件样式存在优先级冲突
- 项目同时使用了 SCSS 和 Tailwind，需要更清晰的样式管理策略

### Layout

- Header 和 Sider 组件的固定定位实现方式不统一
- 布局组件之间的间距和层级关系需要优化

### Configuration

- Sass 使用了即将在 Dart Sass 3.0.0 中移除的 @import 语法
- 需要更新到新的 @use 语法规范

### Development Guidelines Needed

- 缺少统一的样式编写规范
- 需要明确 Tailwind、SCSS 和 Ant Design 样式的使用边界
- 组件样式命名规范待完善
