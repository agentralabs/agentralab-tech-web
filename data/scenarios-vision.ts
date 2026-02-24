import type { ScenarioGroup } from "./scenarios-memory"

export const VISION_HERO = {
  title: "AgenticVision",
  subtitle: "What happens when an AI agent can see, remember what it saw, and reason about visual change over time?",
  artifact: ".avis",
}

export const VISION_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Perception Capabilities",
    items: [
      {
        id: "avis-format",
        title: "Persistent Visual Evidence Store",
        hook: "The .avis format — a photo album with perfect recall, not ephemeral screenshots.",
        plainTerms:
          "The .avis format gives the agent a photo album with perfect recall. Instead of forgetting every screenshot between conversations, it keeps a searchable, timestamped visual history — like security camera footage for your UI.",
        content: null,
      },
      {
        id: "vision-query",
        title: "vision_query",
        hook: "Retrieving past visual states — filtered by time, quality, labels, and description.",
        plainTerms:
          "vision_query is a search engine for your agent's visual memory. Instead of hoping someone took a screenshot, the agent retrieves exactly the visual state you need — filtered by time, quality, and labels — like searching a photo library by date and tag.",
        content: null,
      },
      {
        id: "vision-capture",
        title: "vision_capture",
        hook: "Structured screenshot with CLIP embedding, quality scoring, and metadata redaction.",
        plainTerms:
          "vision_capture is a structured witness. It doesn't just take a photo — it indexes it, scores its quality, strips sensitive data, and files it where you can find it later. Your agent builds a visual evidence chain, not a pile of screenshots.",
        content: null,
      },
      {
        id: "ui-state-blindness",
        title: "UI-State Blindness Coverage",
        hook: "Seeing what the language model can't describe — visual evidence beyond text.",
        plainTerms:
          "Vision capture covers the gap between what the model can describe in words and what actually appears on screen. When a UI problem is visual rather than structural, the agent has photographic evidence to reason about — even when it can't put the colors into words.",
        content: null,
      },
    ],
  },
  {
    label: "Comparison Capabilities",
    items: [
      {
        id: "vision-compare",
        title: "vision_compare",
        hook: "Side-by-side state comparison — automated before-and-after verification.",
        plainTerms:
          "vision_compare is an automated before-and-after check. Instead of trusting that a CSS refactor is purely cosmetic, the agent verifies it by comparing visual snapshots — like overlaying two photos to find what moved.",
        content: null,
      },
      {
        id: "vision-diff",
        title: "vision_diff",
        hook: "Pixel-level change detection with region identification — under 1ms.",
        plainTerms:
          "vision_diff is a magnifying glass that pinpoints exactly what changed between two visual states. Instead of playing spot-the-difference, the agent highlights the changed regions and tells you precisely where to look.",
        content: null,
      },
      {
        id: "vision-similar",
        title: "vision_similar",
        hook: "Finding visually similar past states — visual déjà vu with precision.",
        plainTerms:
          "vision_similar is visual déjà vu with precision. When something looks familiar, the agent searches its entire visual history to find the closest match — like a facial recognition system, but for UI states.",
        content: null,
      },
    ],
  },
  {
    label: "Quality & Memory Bridge",
    items: [
      {
        id: "quality-score",
        title: "quality_score",
        hook: "Visual evidence reliability — a credibility rating for screenshots.",
        plainTerms:
          "Quality scoring is a credibility rating for visual evidence. Like a court evaluating the reliability of a witness photograph — resolution, provenance, and context all matter. The agent tells you when its eyes aren't trustworthy.",
        content: null,
      },
      {
        id: "vision-health",
        title: "vision_health",
        hook: "Diagnostic checks — an audit for visual memory integrity.",
        plainTerms:
          "vision_health is a visual memory audit. It tells you how well the agent is maintaining its visual evidence — like a librarian checking that books are shelved, cataloged, and cross-referenced, not just piled on the floor.",
        content: null,
      },
      {
        id: "vision-link",
        title: "vision_link",
        hook: "Binding visual evidence to cognitive memory nodes — footnotes with proof.",
        plainTerms:
          "vision_link is a footnote that connects an argument to its visual evidence. Instead of saying \"trust me, I saw it,\" the agent says \"here's the exact screenshot that supports my conclusion\" — visual evidence with a paper trail.",
        content: null,
      },
      {
        id: "non-text-signal",
        title: "Non-Text Signal Quality",
        hook: "Decisions weighted by visual confidence — the agent knows how much to trust its own eyes.",
        plainTerms:
          "Visual confidence lets the agent weigh what it sees against how well it can see. A blurry screenshot gets low confidence; a crisp capture gets high confidence. The agent doesn't just look — it knows how much to trust its own eyes.",
        content: null,
      },
    ],
  },
  {
    label: "Parameter Safety",
    items: [
      {
        id: "parameter-safety",
        title: "Strict Validation",
        hook: "Every input checked at the gate — no silent failures, no garbage-in-garbage-out.",
        plainTerms:
          "Parameter safety means the visual memory system fails loudly and clearly rather than silently doing the wrong thing. Every input is validated at the gate — like a bouncer who checks IDs rather than letting everyone in and hoping for the best.",
        content: null,
      },
    ],
  },
]
