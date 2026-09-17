# 字体元数据补充说明

本说明根据[*Google Fonts METADATA File Specification*](https://github.com/googlefonts/gf-docs/tree/main/METADATA)整理，原文注明于 2020 年更新，不代表 Google Fonts 最新规范。以下“项目要求”是本工程的收录约定；其他内容为附件规范的核心摘要。

## 项目要求

**所有收录的字体都必须按照本说明添加元数据，不得仅提交字体文件。** 此要求适用于已有字体、新增字体，以及后续新增的字重、斜体或可变字体文件。

- 每个字体家族建立独立目录，并提供一个 UTF-8 编码、Protocol Buffers 文本格式的 `METADATA.pb`。
- 每个实际收录的字体文件必须有对应的 `fonts { ... }` 块；同一家族的不同字重和斜体共用家族元数据。
- 填写家族级 `name`、`designer`、`license`、`category` 和经来源确认的 `date_added`；声明实际支持的 `subsets`，可变字体还须声明对外提供的 `axes`。
- 每个 `fonts` 块填写 `name`、`style`、`weight`、`filename`、`post_script_name`、`full_name`、`copyright`，并与实际字体文件核对。
- 优先保留来源提供的元数据和扩展字段，例如现有 Ubuntu Sans 的 `source`。不得为了套用示例而编造设计师、版权、许可证、字符覆盖或轴范围。
- `date_added` 表示首次在 Google Fonts 发布的日期，不得用加入本项目的日期代替。未在 Google Fonts 发布或来源信息不足时，应在来源说明中记录不适用或待确认的原因；不适用字段可省略，未确认信息须核实后再完成收录。
- 字体目录同时保留来源说明及实际许可证文本；`license` 字段不能替代许可证文件。

## 文件结构与家族级字段

`METADATA.pb` 描述一个字体家族，用于字体目录展示和分发。家族级信息与单个文件信息分开存放，字段顺序不严格限定，但应保持稳定，减少无意义的差异。

| 字段 | 含义与规则 |
| --- | --- |
| `name` | 家族名称，用于 Google Fonts API 调用及目录展示 |
| `designer` | 设计师或机构；多人用逗号分隔，主要设计者放在首位 |
| `license` | 附件列出的值为 `APACHE2`、`OFL`、`UFL` |
| `category` | `SERIF`、`SANS_SERIF`、`DISPLAY`、`HANDWRITING`、`MONOSPACE` |
| `date_added` | 首次在 Google Fonts 发布的日期，格式 `YYYY-MM-DD`；上线后通常不得修改 |
| `fonts` | 每个字体文件一个信息块，可重复 |
| `subsets` | API 提供的字符子集，每个值单独声明，可重复 |
| `axes` | 可变字体轴，每个轴一个信息块，包含 `tag`、`min_value`、`max_value` |

原文“每个顶层字段只能出现一次”的表述与示例存在冲突；本工程按示例将 `fonts`、`subsets`、`axes` 视为可重复字段，其余上述家族级字段只声明一次。

本项目有七类存放目录，而附件只定义五个 `category` 值。**目录分类与元数据分类分别维护**：页面分类以目录为准，`category` 保留来源中的合法分类。不得直接将 `script`、`handwritten` 或 `decorative` 目录名作为新的枚举值；缺少来源分类时，根据字体特征在上述五个值中核实选择。

## 字体文件字段

| 字段 | 含义与一致性要求 |
| --- | --- |
| `name` | 必须等于顶层 `name`；通常对应字体内部 `name` 表 ID 16，不存在时对应 ID 1 |
| `style` | CSS `font-style`，仅 `normal` 或 `italic` |
| `weight` | CSS `font-weight`；附件规定为 100～900、步长 100，通常匹配 `OS/2.usWeightClass` |
| `filename` | 当前家族目录中的实际字体文件名，区分大小写 |
| `post_script_name` | 对应字体内部 `name` 表 ID 6 |
| `full_name` | 对应字体内部 `name` 表 ID 4 |
| `copyright` | 通常匹配许可证中的版权声明和字体内部 `name` 表 ID 0 |

同一相关名称 ID 存在多条记录时，其值应一致。按附件规则，正体的 `head.macStyle` 第 1 位为 0、`post.italicAngle` 为 0；斜体对应为 1 和负角度。

可变字体的 `weight` 对应 `glyf` 表基础轮廓设计的字重，不代表完整字重范围；可变范围由 `wght` 轴声明。

## 文件命名

- 静态字体：`家族名-样式.ttf`，例如 `ExampleSans-Regular.ttf`、`ExampleSans-SemiBoldItalic.ttf`。
- 静态样式包括 `Thin`、`ExtraLight`、`Light`、`Regular`、`Medium`、`SemiBold`、`Bold`、`ExtraBold`、`Black` 及对应斜体。常规斜体命名为 `Italic`。
- 大小写必须准确，例如 `SemiBold` 不能写为 `Semibold`。
- 可变字体：`家族名[轴列表].ttf`，轴标签按字母顺序排列并用逗号分隔，例如 `ExampleSans[wdth,wght].ttf`。
- 独立的可变斜体文件在家族名后加 `-Italic`，例如 `ExampleSans-Italic[wdth,wght].ttf`。

## 字符子集与可变轴

附件列出以下 29 个子集名称：

```text
arabic, bengali, chinese-simplified, cyrillic, cyrillic-ext,
devanagari, ethiopic, greek, greek-ext, gujarati, gurmukhi,
hebrew, japanese, kannada, khmer, korean, lao, latin, latin-ext,
malayalam, menu, myanmar, oriya, sinhala, tamil, telugu,
thai, tibetan, vietnamese
```

`menu` 是特殊子集，只包含字体家族名称所需字符，用于字体选择器以该字体展示自身名称。不能仅凭字体名称或语言印象推断子集，必须核实实际覆盖。

可变轴声明示例（仅展示语法，数值须取自实际字体及分发范围）：

```protobuf
axes {
  tag: "wght"
  min_value: 300.0
  max_value: 700.0
}
axes {
  tag: "opsz"
  min_value: 10.0
  max_value: 144.0
}
```

元数据声明的是对外提供的能力，不必穷尽字体文件的全部能力：实际文件可以包含未声明的轴，也可以支持比声明更大的范围。声明内容必须在实际文件能力以内；按 Google Fonts 分发规则声明的轴及范围还应符合 Google Fonts Axis Registry。

## 添加与验收流程

1. 将字体文件、来源说明、许可证及 `METADATA.pb` 放入对应类型下的家族目录。可参考现有 [Ubuntu Sans 元数据](../fonts/sans-serif/UbuntuSans/METADATA.pb)，但不得照抄其属性值。
2. 检查家族目录中的所有字体文件均已列入 `fonts`，引用路径和大小写准确，每个文件的名称、样式、字重和版权信息一致。
3. 核对声明的字符覆盖、可变轴及范围不超过实际文件支持能力。附件建议使用 FontBakery 校验；本工程尚未集成该工具。
4. 在项目根目录运行 `node scripts/build-font-catalog.mjs`，更新并提交 `fonts/catalog.js`。
5. 打开页面检查家族名称、字体加载、正体／斜体与字重预览。

当前清单脚本的检查不能替代完整规范验收：缺少元数据时的提示并跳过行为，不代表允许无元数据字体入库。

如已安装 gftools，可使用 `gftools add-font ../ofl/newfamily` 部分生成元数据；该命令来自附件示例，实际使用时应替换为字体家族目录，并人工核对生成结果。
