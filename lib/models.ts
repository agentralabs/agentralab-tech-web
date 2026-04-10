export interface Model {
  key: string
  name: string
  domain: string
  powers: string
  base: string
  license: string
  hfUrl: string
  description: string
  keyCapability: string
}

export const MODELS: Model[] = [
  {
    key: "solen",
    name: "Solen",
    domain: "Supply Chain Management",
    powers: "Nexus Planner",
    base: "Open-weight foundation",
    license: "Apache 2.0",
    hfUrl: "https://huggingface.co/agentralabs/solen-e4b",
    description:
      "Thinks like a supply chain director. Not a chatbot that knows about supply chain. Solen has read nothing but supply chain its entire existence — every research paper, every SEC filing, every court case where a supply chain failure ended in litigation.",
    keyCapability:
      "Tells you exactly what it needs to know and why, before it answers. Reasons through incomplete data with calibrated confidence.",
  },
  {
    key: "verac",
    name: "Verac",
    domain: "Finance / Settlement Operations",
    powers: "ZexRail",
    base: "Open-weight foundation",
    license: "Apache 2.0",
    hfUrl: "https://huggingface.co/agentralabs/verac-e4b",
    description:
      "Every invoice, every reconciliation, every settlement decision stays inside your infrastructure. Verac runs on your servers. Nothing leaves. Data residency by design.",
    keyCapability:
      "On-premise financial reasoning. The condition under which bank adoption becomes possible.",
  },
  {
    key: "axiom",
    name: "Axiom",
    domain: "Financial Markets / Trading",
    powers: "Standalone",
    base: "Open-weight foundation",
    license: "Apache 2.0",
    hfUrl: "https://huggingface.co/agentralabs/axiom-e4b",
    description:
      "Financial markets reasoning with calibrated confidence. Consequence reasoning — reasons forward to second and third order effects before recommending action.",
    keyCapability:
      "Identifies what is missing before answering. Reasons about consequences, not just correlations.",
  },
]

export const TRAINING_CATEGORIES = [
  { name: "Verification", detail: "Show full working and independently confirm the answer" },
  { name: "Incomplete Data", detail: "Identify exactly what is missing before answering" },
  { name: "Error Detection", detail: "Catch the mistake in a scenario that looks correct" },
  { name: "Expert Conflict", detail: "Resolve two valid positions using the data that settles it" },
  { name: "Consequence Reasoning", detail: "Reason forward to second and third order effects" },
  { name: "Failure Pattern Recognition", detail: "Know the shape of wrong thinking before it compounds" },
] as const
