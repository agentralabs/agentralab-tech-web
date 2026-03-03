export const DOCS_LANGUAGE_COOKIE = "agentra_docs_lang"
export const DOCS_LANGUAGE_STORAGE = "agentra_docs_lang"

export type DocsLanguage = "en" | "zh"

export function normalizeDocsLanguage(value: string | undefined | null): DocsLanguage {
  return value === "zh" ? "zh" : "en"
}

export function stripDocsLocalePrefix(path: string): string {
  return path.replace(/^\/docs\/(?:en|zh)(?=\/|$)/, "/docs")
}

export function localizeDocsHref(href: string, lang: DocsLanguage): string {
  if (!href.startsWith("/docs")) return href
  const normalized = stripDocsLocalePrefix(href)
  const suffix = normalized.slice("/docs".length)
  return `/docs/${lang}${suffix}`
}

const LABEL_ZH: Record<string, string> = {
  "Public Documentation": "公开文档",
  Documentation: "文档",
  Guides: "指南",
  Operations: "运维",
  Architecture: "架构",
  "API reference": "API 参考",
  "API Reference": "API 参考",
  Website: "官网",
  GitHub: "GitHub",
  "Search documentation...": "搜索文档...",
  "Search docs": "搜索文档",
  "No matching pages.": "没有匹配的页面。",
  "Get started": "入门",
  "Get Started": "入门",
  Overview: "总览",
  Workspace: "工作区",
  "Deep Dive": "深度解析",
  Playbooks: "用例",
  Security: "安全",
  Performance: "性能",
  Reference: "参考",
  "On this page": "本页内容",
  "Getting Started": "开始使用",
  Welcome: "欢迎",
  "What you can run today": "今日可运行项",
  "Quick links": "快速链接",
  Notes: "说明",
  "Runtime screenshots": "运行截图",
  Quickstart: "快速开始",
  Installation: "安装",
  Integrations: "集成",
  "Feedback and Community": "反馈与社区",
  "Operations: Autonomic + Backup": "运维：自治与备份",
  "Troubleshooting Matrix": "故障排查矩阵",
  "System Architecture": "系统架构",
  "Use-Case Playbooks": "用例手册",
  "Security and Data Boundaries": "安全与数据边界",
  "Benchmarks and Methodology": "基准测试与方法",
  "Ecosystem Feature Reference": "生态功能参考",
  "Server Runtime Auth and Artifact Sync": "服务端鉴权与工件同步",
  "Runtime Operations Update": "运行与运维更新",
  "Workspace How-To": "Workspace 操作手册",
  "Sister Docs Catalog": "姐妹文档目录",
  "Ecosystem Canonical Contracts": "生态规范契约",
  "AgenticMemory Canonical Contract": "AgenticMemory 规范契约",
  "AgenticCodebase Canonical Contract": "AgenticCodebase 规范契约",
  "AgenticVision Canonical Contract": "AgenticVision 规范契约",
  "AgenticMemory Architecture": "AgenticMemory 架构",
  "AgenticCodebase Architecture": "AgenticCodebase 架构",
  "AgenticVision Architecture": "AgenticVision 架构",
  "AgenticMemory Docs": "AgenticMemory 文档总览",
  "AgenticCodebase Docs": "AgenticCodebase 文档总览",
  "AgenticVision Docs": "AgenticVision 文档总览",
  AgenticMemory: "AgenticMemory",
  AgenticCodebase: "AgenticCodebase",
  AgenticVision: "AgenticVision",
  AgenticCognition: "AgenticCognition",
  "AgenticCognition Canonical Contract": "AgenticCognition 规范契约",
  "AgenticCognition Architecture": "AgenticCognition 架构",
  "AgenticCognition Docs": "AgenticCognition 文档总览",
  "AgenticCognition Overview": "AgenticCognition 总览",
  "Why Teams Adopt AgenticCognition": "为什么团队采用 AgenticCognition",
  "Server Runtime Auth And Artifact Sync": "服务端鉴权与工件同步",
  "Docs Navigation": "文档导航",
  "Install, integrate, and run the Agentra ecosystem.": "安装、集成并运行 Agentra 生态。",
  Sections: "章节",
  Note: "说明",
  Hint: "提示",
  Warning: "警告",
  Success: "成功",
  "Installation Guide": "安装指南",
  "Command Surface": "命令面",
  "Runtime, Install Output, and Sync Contract": "运行、安装输出与同步契约",
  "Integration Guide": "集成指南",
  "Core Concepts": "核心概念",
  "Python API Reference": "Python API 参考",
  "Rust API Reference": "Rust API 参考",
  ".amem File Format Specification": ".amem 文件格式规范",
  "File Format Specification": "文件格式规范",
  "Frequently Asked Questions": "常见问题",
  "Canonical Sister Kit (Agentra)": "标准 Sister 套件（Agentra）",
  "AgenticCodebase Overview": "AgenticCodebase 总览",
  "AgenticVision Overview": "AgenticVision 总览",
  "Why Teams Adopt AgenticMemory": "为什么团队采用 AgenticMemory",
  "Why Teams Adopt AgenticCodebase": "为什么团队采用 AgenticCodebase",
  "Why Teams Adopt AgenticVision": "为什么团队采用 AgenticVision",
  Concepts: "概念",
  FAQ: "常见问题",
  "Known Limitations": "已知限制",
  "Agentra Workspace How-To": "Agentra 工作区操作手册",
  "Agentra Runtime + Operations Update": "Agentra 运行时与运维更新",
  "On This Page": "本页内容",
  "You should see this": "你应该看到这个",
}

export function localizeDocsLabel(label: string, lang: DocsLanguage): string {
  if (lang === "en") return label
  return LABEL_ZH[label] ?? label
}

export function docsUi(lang: DocsLanguage) {
  if (lang === "zh") {
    return {
      docsTitle: "Agentra Labs 文档",
      docsSubtitle: "公开文档",
      sidebarTitle: "文档导航",
      sidebarSubtitle: "安装、集成并运行 Agentra 生态。",
      searchPlaceholder: "搜索文档...",
      searchLabel: "搜索文档",
      closeSearch: "关闭搜索",
      noSearchResults: "没有匹配的页面。",
      onThisPage: "本页内容",
      nav: {
        docs: "文档",
        guides: "指南",
        operations: "运维",
        architecture: "架构",
        reference: "API 参考",
      },
      links: {
        website: "官网",
        github: "GitHub",
      },
    }
  }

  return {
    docsTitle: "Agentra Labs Docs",
    docsSubtitle: "Public Documentation",
    sidebarTitle: "Docs Navigation",
    sidebarSubtitle: "Install, integrate, and run the Agentra ecosystem.",
    searchPlaceholder: "Search documentation...",
    searchLabel: "Search docs",
    closeSearch: "Close search",
    noSearchResults: "No matching pages.",
    onThisPage: "On this page",
    nav: {
      docs: "Documentation",
      guides: "Guides",
      operations: "Operations",
      architecture: "Architecture",
      reference: "API reference",
    },
    links: {
      website: "Website",
      github: "GitHub",
    },
  }
}
