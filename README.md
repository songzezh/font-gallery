# Font Gallery

Font Gallery 是一个用于字体展示与比较的 Web 应用，采用原生 HTML、CSS 和 JavaScript 实现，不使用前端框架，以 `index.html` 作为应用入口。

> 当前首页包含七类字体的英文指南，按特点与常见用途整理，采用浅色主题和始终展开的侧边栏。已支持字体预览，字体比较功能尚未实现。

侧边栏使用原生 HTML、CSS 和 JavaScript，始终显示品牌，小屏幕采用纵向布局，不提供收起功能。

七类字体使用原生 `details` / `summary` 独立展开，支持鼠标和键盘操作，不关联首页说明。展开分类后显示该类型下已有字体的名称，名称取自各字体文件夹内 `METADATA.pb` 的顶层 `name` 字段；同一字体的不同字重与斜体只显示一个字体家族名称。没有字体的分类继续显示空状态。当前已收录 Sans-serif 分类的 Ubuntu Sans，点击字体名称后，主体显示真实字体的预览，支持编辑文字、调整字号、切换字重和正体／斜体，并展示字符表与段落样张。字号、样式和字重控件位于侧边栏下方，仅在选中字体时显示；首页隐藏该区域。主体仅保留可编辑字体样张、字符表与段落效果。点击侧边栏现有品牌（Font Gallery）返回首页。

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
├── sidebar.js    # 侧边栏字体列表
├── preview.js    # 字体加载与预览交互
├── scripts/
│   └── build-font-catalog.mjs # 扫描字体元数据并生成 fonts/catalog.js
├── docs/
│   └── font-metadata.md # Google Fonts 元数据补充说明与收录要求
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

每个字体家族在类型目录下建立独立文件夹，里面存放文本格式的 `METADATA.pb`、字体文件、来源说明及许可证。例如：`fonts/sans-serif/UbuntuSans/METADATA.pb` 与 `fonts/sans-serif/UbuntuSans/UbuntuSans[wdth,wght].ttf`。分类以所在目录为准，显示名称、字体文件与样式取自元数据；可变字重范围取自 `wght` 轴。扫描时检查元数据引用的字体文件是否存在，预览时按需加载字体。

**所有收录字体必须按照 [字体元数据补充说明](docs/font-metadata.md) 提供 `METADATA.pb`，不得仅添加字体文件。** 每个字体家族共用一份元数据，其中每个字体文件（含各字重与斜体）均须有对应的 `fonts` 块；可变字体还须声明对外提供的轴及范围。该要求适用于现有与新增字体。字段含义、文件命名、字符子集和验收步骤详见补充说明。

新增、删除或修改字体元数据后，在项目根目录运行（需要 Node.js）：

```bash
node scripts/build-font-catalog.mjs
```

脚本会扫描各分类的直接子文件夹，生成 `fonts/catalog.js`，刷新页面即可显示最新列表。缺少元数据的文件夹会提示并跳过，缺少有效名称则报错并保留原清单。生成清单需随项目一起提交；浏览器运行无需 Node.js，也无需依赖服务器目录索引。空分类目录即使未被 Git 保留，也会按空分类处理。

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
- 所有字体必须遵循 [字体元数据补充说明](docs/font-metadata.md)，同步维护家族目录内的 `METADATA.pb` 和生成的 `fonts/catalog.js`。脚本跳过缺少元数据的目录不代表允许其入库。
- 功能或运行方式发生变化时，同步更新本说明。

## 许可证

项目采用 [MIT License](LICENSE)。引入的第三方字体或其他资源遵循各自的许可证。
