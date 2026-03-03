export interface ScenarioItem {
  id: string
  title: string
  hook: string
  plainTerms: string
  content: React.ReactNode
}

export interface ScenarioGroup {
  label: string
  items: ScenarioItem[]
}

export const COGNITION_HERO = {
  title: "AgenticCognition",
  subtitle:
    "What happens when AI agents maintain structured thinking processes, chain reasoning steps, evaluate hypotheses, and self-correct through metacognitive reflection in one portable file?",
  artifact: ".acog",
}

export const COGNITION_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Reasoning",
    items: [
      {
        id: "reasoning-chains",
        title: "Reasoning Chains",
        hook: "Step-by-step inference paths with typed premises, logic gates, and confidence propagation",
        plainTerms:
          "Agents do not need to produce answers from a black box. They maintain explicit reasoning chains where each conclusion links back to the premises that support it, with confidence scores that propagate through the chain.",
        content: null,
      },
      {
        id: "hypothesis-evaluation",
        title: "Hypothesis Evaluation",
        hook: "Competing explanations ranked by evidence weight, falsifiability, and prior consistency",
        plainTerms:
          "When an agent faces ambiguity, it generates multiple hypotheses and evaluates each against available evidence. The strongest hypothesis wins, but alternatives are preserved with their scores for future re-evaluation.",
        content: null,
      },
      {
        id: "cognitive-strategies",
        title: "Cognitive Strategies",
        hook: "Selectable reasoning modes — deductive, abductive, analogical, and decomposition",
        plainTerms:
          "Different problems require different thinking styles. The agent selects and records which cognitive strategy it used, so later agents can understand not just what was concluded but how the thinking was structured.",
        content: null,
      },
    ],
  },
  {
    label: "Metacognition",
    items: [
      {
        id: "self-evaluation",
        title: "Self-Evaluation",
        hook: "The agent audits its own reasoning for gaps, circular logic, and unsupported leaps",
        plainTerms:
          "After producing a conclusion, the agent reviews its own reasoning chain for quality. It catches circular arguments, identifies missing evidence, and flags conclusions that rest on assumptions rather than facts.",
        content: null,
      },
      {
        id: "confidence-calibration",
        title: "Confidence Calibration",
        hook: "Predicted confidence vs actual outcomes tracked across sessions for calibration drift",
        plainTerms:
          "An agent that says it is 90% confident should be right 90% of the time. Calibration tracking compares predicted confidence against actual outcomes, revealing whether the agent is overconfident or underconfident.",
        content: null,
      },
      {
        id: "cognitive-load-management",
        title: "Cognitive Load Management",
        hook: "Working memory limits enforced with strategic offloading to persistent storage",
        plainTerms:
          "Agents have practical limits on how many active reasoning threads they can maintain. Cognitive load management tracks active threads, archives completed ones, and prevents the agent from juggling too many open problems at once.",
        content: null,
      },
    ],
  },
  {
    label: "Reasoning Governance",
    items: [
      {
        id: "thought-provenance",
        title: "Thought Provenance",
        hook: "Every conclusion traces back to its source evidence with full audit trail",
        plainTerms:
          "When an agent states a conclusion, anyone can walk the provenance chain back to the original evidence. No unsourced claims, no orphaned conclusions, no reasoning that appeared from nowhere.",
        content: null,
      },
      {
        id: "reasoning-replay",
        title: "Reasoning Replay",
        hook: "Reconstruct the agent's thinking at any point in time from the cognitive log",
        plainTerms:
          "The cognitive log preserves the full sequence of reasoning steps. You can replay the agent's thinking at any historical point, seeing exactly what it knew, what it considered, and why it chose one path over another.",
        content: null,
      },
      {
        id: "acog-artifact",
        title: ".acog Artifact Portability",
        hook: "One file carries reasoning chains, hypotheses, strategies, and metacognitive state",
        plainTerms:
          "The cognition layer stays portable across environments and models. Copy the file, and the reasoning context moves with it.",
        content: null,
      },
    ],
  },
]
