# Font Gallery

Font Gallery 是一个用于字体展示与比较的 Web 应用，采用原生 HTML、CSS 和 JavaScript 实现，不使用前端框架，以 `index.html` 作为应用入口。

> 当前首页包含七类字体的英文指南，按特点与常见用途整理，采用浅色主题和始终展开的侧边栏。字体预览与比较功能尚未实现。

侧边栏使用原生 HTML 和 CSS，始终显示品牌，小屏幕采用纵向布局，不提供收起功能。

七类字体使用原生 `details` / `summary` 独立展开，支持鼠标和键盘操作，不关联首页说明。当前未添加字体，各分类显示空状态。后续添加字体时，在对应 `data-font-category` 的 `details` 内，将 `.category-empty` 替换为包含已添加字体名称的列表，并同步加入页面字体内容。

## 项目目标

- **字体展示**：呈现字体的视觉效果，方便观察字形与排版风格。
- **字体比较**：帮助对比不同字体的显示效果，为字体选择提供参考。

具体交互与支持的字体范围以后续实现为准。

## 技术栈

| 技术 | 用途 |
| --- | --- |
| HTML | 页面结构与内容 |
| CSS | 页面布局、样式与字体呈现 |
| JavaScript | 页面交互与字体比较逻辑 |

项目使用浏览器原生能力开发，不使用前端框架。当前未配置包管理、构建工具或自动化测试。

## 项目结构

当前仓库包含：

```text
font-gallery/
├── fonts/        # 按字体类型存放所有字体资源
│   ├── serif/
│   ├── sans-serif/
│   ├── script/
│   ├── display/
│   ├── monospace/
│   ├── handwritten/
│   └── decorative/
├── LICENSE       # MIT 许可证
├── index.html    # 应用入口
├── styles.css    # 浅色主题变量与页面基础样式
└── README.md     # 项目说明
```

应用入口为项目根目录下的 `index.html`，通过相对路径引用 `styles.css`，不依赖第三方库。

## 字体存放规则

所有字体文件统一放在项目根目录的 `fonts/` 下，按字体类型存入对应子目录。目录名与页面的 `data-font-category` 标识一致：

| 字体类型 | 存放目录 |
| --- | --- |
| Serif（衬线体） | `fonts/serif/` |
| Sans-serif（无衬线体） | `fonts/sans-serif/` |
| Script（连笔字体） | `fonts/script/` |
| Display（展示字体） | `fonts/display/` |
| Monospace（等宽字体） | `fonts/monospace/` |
| Handwritten（手写体） | `fonts/handwritten/` |
| Decorative（装饰字体） | `fonts/decorative/` |

字体按风格分类，`.woff2`、`.woff`、`.ttf`、`.otf` 等文件格式放在相应类型目录中。例如，衬线字体文件可放在 `fonts/serif/example-regular.woff2`，在根目录的 `styles.css` 中使用 `url("./fonts/serif/example-regular.woff2")` 引用。

当前尚未添加字体文件。添加字体时，将来源说明与许可证一并存入对应分类目录，并同步更新页面中的字体列表与内容。

## 本地运行

可通过以下方式预览：

1. 获取项目并进入项目根目录。
2. 使用浏览器打开 `index.html`。
3. 如字体或其他资源受本地文件访问限制，请改用本地静态服务器访问。

例如，已安装 Python 3 时，可在项目根目录执行：

```bash
python -m http.server 8000
```

随后访问 [本地预览页面](./index.html)。Python 仅用于提供静态文件服务，不是应用的运行依赖。

## 开发约定

- 保持原生 HTML、CSS、JavaScript 技术栈，不引入前端框架。
- 以 `index.html` 为入口，使用相对路径引用样式、脚本及资源。
- 按职责组织页面结构、样式和交互逻辑。
- 添加字体资源时，记录来源并确认其使用与分发授权。
- 功能或运行方式发生变化时，同步更新本说明。

## 许可证

项目采用 [MIT License](LICENSE)。引入的第三方字体或其他资源遵循各自的许可证。
