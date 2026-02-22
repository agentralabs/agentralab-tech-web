export const DOCS_LANGUAGE_COOKIE = "agentra_docs_lang"
export const DOCS_LANGUAGE_STORAGE = "agentra_docs_lang"

export type DocsLanguage = "en" | "zh"

export function normalizeDocsLanguage(value: string | undefined | null): DocsLanguage {
  return value === "zh" ? "zh" : "en"
}

const LABEL_ZH: Record<string, string> = {
  "Public Documentation": "公开文档",
  Documentation: "文档",
  Guides: "指南",
  Operations: "运维",
  Architecture: "架构",
  "API reference": "API 参考",
  Website: "官网",
  GitHub: "GitHub",
  "Search documentation...": "搜索文档...",
  "Search docs": "搜索文档",
  "No matching pages.": "没有匹配的页面。",
  "Get started": "入门",
  "Get Started": "入门",
  "Deep Dive": "深度解析",
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
