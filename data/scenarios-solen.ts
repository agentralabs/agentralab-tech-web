export interface ModelScenarioItem {
  id: string
  question: string
  without: string
  withLabel: string
  withAnswer: string
}

export const SOLEN_HERO = {
  title: "Solen",
  subtitle:
    "What happens when a supply-chain AI can reason about your actual contracts, lead times, and tariff exposure — not just recite textbook logistics?",
  artifact: "model",
}

export const solenScenarios: ModelScenarioItem[] = [
  {
    id: "solen-01",
    question:
      "\"Which supplier should we switch to for component X given the tariff changes?\"",
    without:
      "GPT-4o provides a general overview of tariff impacts and suggests 'considering local suppliers.' No specific analysis of your supply chain data, lead times, or contractual obligations.",
    withLabel: "WITH SOLEN",
    withAnswer:
      "\"Tariff increase on component X from Supplier A is 12.5% effective Q3. Three alternatives: Supplier B (domestic, 8-day lead time, $2.40/unit premium but zero tariff), Supplier C (Mexico, USMCA-exempt, 14-day lead, $0.80 premium), Supplier D (existing secondary, can absorb 60% of volume within 30 days). Recommendation: split between B and C. Confidence: 0.84. Verify: confirm Supplier C USMCA certification is current.\"",
  },
  {
    id: "solen-02",
    question:
      "\"What happens to our delivery timeline if the port of Shanghai has a 2-week closure?\"",
    without:
      "\"Port closures can significantly impact supply chains. You should consider alternative shipping routes and communicate with your suppliers about potential delays.\"",
    withLabel: "WITH SOLEN",
    withAnswer:
      "\"14-day Shanghai closure impacts 3 of your 7 active POs. PO-4412 (arriving Feb 28) reroutes through Ningbo — adds 4 days, $1,200 freight premium. PO-4415 and PO-4418 are pre-loaded and clear before closure. Downstream: Production line B loses 3 days of buffer stock. Recommend: pull forward PO-4420 by 10 days to rebuild buffer. Confidence: 0.79. Sensitivity: if closure extends to 21 days, line B stops.\"",
  },
]
