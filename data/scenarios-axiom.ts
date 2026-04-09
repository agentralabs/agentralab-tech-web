import type { ModelScenarioItem } from "./scenarios-solen"

export const AXIOM_HERO = {
  title: "Axiom",
  subtitle:
    "What happens when a markets AI can trace second-order consequences through your actual portfolio — not just recite textbook finance?",
  artifact: "model",
}

export const axiomScenarios: ModelScenarioItem[] = [
  {
    id: "axiom-01",
    question:
      "\"What is the second-order impact of a Fed rate cut on our portfolio?\"",
    without:
      "\"Rate cuts generally benefit equities and bonds. Growth stocks typically outperform in low-rate environments...\" — textbook answer, no portfolio-specific reasoning.",
    withLabel: "WITH AXIOM",
    withAnswer:
      "\"First order: your fixed income allocation gains ~2.3% on duration. Second order: your REIT exposure (12% of portfolio) benefits from cap rate compression, estimated +4-6% over 6 months. Third order: your USD-denominated emerging market holdings face currency headwind as dollar weakens — estimated drag of 1.2%. Net portfolio impact: +1.8% over 6 months. Sensitivity: if the cut is 50bp instead of 25bp, the EM currency drag doubles to 2.4%. Confidence: 0.73. Verify: confirm current hedging positions on EM exposure.\"",
  },
]
