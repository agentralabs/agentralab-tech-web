import type { ModelScenarioItem } from "./scenarios-solen"

export const VERAC_HERO = {
  title: "Verac",
  subtitle:
    "What happens when a financial AI can reconcile your actual invoices, assess real credit risk, and reason about settlement — not just explain accounting concepts?",
  artifact: "model",
}

export const veracScenarios: ModelScenarioItem[] = [
  {
    id: "verac-01",
    question:
      "\"Reconcile the Q3 invoices against our purchase orders and flag discrepancies.\"",
    without:
      "\"I can help you set up a reconciliation process. You'll want to compare each invoice line item against the corresponding PO...\" — provides methodology, not answers.",
    withLabel: "WITH VERAC",
    withAnswer:
      "\"847 invoices matched against 312 POs. 23 discrepancies found: 14 are rounding differences under $0.50 (auto-cleared), 6 are quantity mismatches totaling $14,200 (flagged for AP review), 3 are duplicate invoices from Supplier K totaling $8,400 (blocked). Net exposure: $22,600. All data stayed on-premise. Nothing left your infrastructure.\"",
  },
  {
    id: "verac-02",
    question:
      "\"Should we extend credit terms to this new enterprise customer?\"",
    without:
      "\"Credit decisions depend on many factors including payment history, financial health, and industry standards. I'd recommend reviewing their financial statements...\"",
    withLabel: "WITH VERAC",
    withAnswer:
      "\"Customer credit profile: D&B score 72, 3-year revenue CAGR 18%, current ratio 1.4. Industry benchmark for Net-60: default rate 2.1%. This customer's profile suggests 1.8% estimated default probability at Net-45, rising to 3.2% at Net-60. Recommendation: Net-45 with 2% early payment discount. Expected margin impact: +$34K/year from the account vs $6.2K expected credit loss. Confidence: 0.81. Verify: confirm no pending litigation in PACER.\"",
  },
]
