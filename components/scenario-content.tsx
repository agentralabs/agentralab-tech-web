"use client"

import { type ReactNode } from "react"

/* ────────────────────────────────────────────
   Reusable prose primitives that match the
   Agentra design-system (mono, sharp, orange)
   ──────────────────────────────────────────── */

function P({ children }: { children: ReactNode }) {
  return <p className="text-xs lg:text-sm font-mono text-muted-foreground leading-relaxed mt-3">{children}</p>
}

function B({ children }: { children: ReactNode }) {
  return <strong className="text-foreground">{children}</strong>
}

function Agent({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-4 border-l-2 border-[#ea580c] pl-4 py-2 bg-foreground/[0.03]">
      <p className="text-xs font-mono text-muted-foreground leading-relaxed italic">{children}</p>
    </blockquote>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#ea580c] mt-5 mb-1">{children}</p>
  )
}

/* ─────────────────────────────── MEMORY ── */

export function CausedByContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're three sessions deep into a migration from PostgreSQL to CockroachDB. The agent recommended CockroachDB in session one. Now it's session four, and <B>latency numbers are worse than expected</B>. You ask: "Why did you recommend CockroachDB in the first place?"
      </P>
      <P>
        Without CAUSED_BY edges, the agent stares blankly. It doesn't remember session one. It doesn't know what facts led to that decision. It might <B>hallucinate a justification</B>, or worse, confidently restate the recommendation without acknowledging the latency problem. You're left forensically reading chat logs, trying to reconstruct a reasoning chain that no longer exists in any machine-readable form.
      </P>

      <SectionLabel>With CAUSED_BY edges</SectionLabel>
      <P>
        The agent traverses its own reasoning graph backwards. It finds the Decision node <B>"Chose CockroachDB for multi-region deployment"</B> and follows three CAUSED_BY edges to the supporting facts: "Team requires sub-100ms reads across US-East and EU-West," "CockroachDB supports follower reads," and "PostgreSQL Citus extension lacks transparent geo-routing." The traversal takes <B>3.4 milliseconds</B> across 847 nodes.
      </P>
      <Agent>
        I recommended CockroachDB because of three facts I recorded in session 1: your team needed sub-100ms multi-region reads, CockroachDB supports follower reads natively, and Citus lacked transparent geo-routing. Given the latency regression you're seeing, the second fact may need revisiting — follower reads have consistency trade-offs I didn't weight heavily enough.
      </Agent>
      <P>
        The agent doesn't just remember <B>what</B> it decided. It remembers <B>why</B>, and it can critically re-examine the chain when new evidence arrives.
      </P>
    </>
  )
}

export function SupersedesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your team's primary language was Python when the agent first learned about the project in January. By March, you've migrated critical services to Rust. You never explicitly told the agent to "forget Python" — you just started talking about Rust codebases and cargo build times.
      </P>
      <P>
        Without supersedes chains, the agent holds <B>contradictory beliefs simultaneously</B>. It might suggest a Python testing framework for your Rust service. Every old fact persists with equal authority, and the agent has no mechanism to distinguish "currently true" from "was once true."
      </P>

      <SectionLabel>With SUPERSEDES + RESOLVE</SectionLabel>
      <P>
        When the agent learns "Primary language is now Rust," it creates a Correction node that <B>supersedes</B> the original Fact. The old fact isn't deleted — it's still there, timestamped, auditable. But when any query touches "primary language," the resolve chain follows the supersedes edge in <B>under 1 millisecond</B> and returns the canonical current answer: Rust.
      </P>
      <Agent>
        Your primary language is Rust (corrected in session 15). Previously, I recorded Python as your primary language in session 1. The correction was triggered when you described migrating payment-service and auth-service to Rust.
      </Agent>
    </>
  )
}

export function CognitiveTypesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You ask the agent to analyze a production incident. It reads logs, makes inferences, forms a hypothesis, decides on a remediation plan, and documents a reusable runbook.
      </P>
      <P>
        Without typed events, all of this reasoning gets stored as <B>undifferentiated text blobs</B>. The agent can't distinguish between "something I observed" and "something I concluded" and "something I decided." Facts, guesses, and conclusions blur together.
      </P>

      <SectionLabel>With six cognitive event types</SectionLabel>
      <P>
        Each piece of reasoning gets a type tag at creation: <B>Fact</B>, <B>Decision</B>, <B>Inference</B>, <B>Correction</B>, <B>Skill</B>, <B>Episode</B>. The production incident analysis produces: 3 Facts ("CPU spiked to 94% at 14:32 UTC"), 2 Inferences ("Likely a slow query cascade"), 1 Decision ("Increase connection pool to 400"), and 1 Skill ("When CPU spikes without deployment, check slow query log first").
      </P>
      <P>
        Later, <B>memory_query</B> with <code className="text-[#ea580c]">event_types: ["decision"]</code> instantly returns only the decisions. A pattern query for all Skills gives you a growing library of reusable runbooks.
      </P>
      <Agent>
        Found 1 decision related to the March 12 incident: "Increase connection pool to 400, add 30s query timeout." Supporting inferences: slow query cascade (confidence 0.85). Want me to show the full reasoning chain?
      </Agent>
    </>
  )
}

export function CrossSessionContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're building a complex microservices architecture over six weeks. Each conversation is a new context window. <B>Every Monday morning is Groundhog Day.</B> You re-explain the architecture. You re-state your preferences. By the third week, you've spent more time re-briefing the agent than actually building.
      </P>

      <SectionLabel>With cross-session persistence</SectionLabel>
      <P>
        The agent opens last session's <B>.amem</B> file in 3.7 milliseconds (10,000 nodes) and has instant access to every fact, decision, inference, and correction from all prior sessions. Session 12 knows what session 1 established.
      </P>
      <Agent>
        Resuming from session 11 (last Tuesday). Your architecture has 7 services. We left off designing the notification service. You preferred webhook delivery over polling. The payment-service Stripe integration is still pending the idempotency key refactor we discussed.
      </Agent>
      <P>
        Storage is <B>8 MB per 10,000 nodes</B>. A decade of daily agent use fits in 240 MB. Your agent's lifetime memory costs less than a single high-resolution photo.
      </P>
    </>
  )
}

export function SemanticSearchContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You remember discussing a "scaling bottleneck" three weeks ago, but you can't remember the exact words. Was it "scaling bottleneck"? "Performance ceiling"? "Throughput limit"? A text search for "scaling bottleneck" <B>misses the node</B> where you said "the database can't handle more than 10K writes per second."
      </P>

      <SectionLabel>With semantic search</SectionLabel>
      <P>
        The query "database scaling problems" finds all semantically related nodes in <B>9 milliseconds</B> across 100,000 nodes. Cosine similarity doesn't care about word choice — it matches meaning.
      </P>
      <Agent>
        Found 4 memories related to "database scaling problems": a fact about the 10K write/s ceiling (session 3, confidence 0.92), an inference about connection pool saturation (session 5, confidence 0.78), a decision to evaluate CockroachDB (session 7), and a correction noting higher-than-expected latency (session 9).
      </Agent>
    </>
  )
}

export function HybridSearchContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're looking for "the Stripe webhook handler decision." A keyword search for "Stripe" returns <B>47 nodes</B> — every time Stripe was mentioned. A semantic search for "webhook processing decisions" might miss the specific Stripe context. Neither approach alone gives you the needle.
      </P>

      <SectionLabel>With hybrid search</SectionLabel>
      <P>
        Both BM25 text matching and vector similarity run simultaneously and merge via <B>Reciprocal Rank Fusion</B>. The fusion takes 10.83 milliseconds. The exact Decision node was ranked 12th by BM25 alone and 8th by vector alone, but RRF fusion pushed it to <B>rank 1</B>.
      </P>
      <Agent>
        Top result (hybrid score 0.91): Decision from session 8 — "Implement Stripe webhook handler with idempotency keys and 3-retry exponential backoff." BM25 matched on "Stripe," vector matched on "webhook processing decision pattern."
      </Agent>
    </>
  )
}

export function TemporalQueriesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A production incident happened on February 15th. You need to understand what the agent believed <B>at that time</B>, not what it believes now after three corrections. Without temporal queries, the agent can only show the current state. Post-hoc rationalization becomes indistinguishable from pre-incident understanding.
      </P>

      <SectionLabel>With temporal queries</SectionLabel>
      <P>
        <B>memory_temporal</B> comparing February 1-14 against February 15-28 shows: 3 facts added after the incident, 2 corrections applied to pre-incident beliefs, and 1 decision unchanged. The pre-incident state is fully reconstructable.
      </P>
      <Agent>
        At February 15th, your memory contained: 142 nodes across 8 sessions. Key belief: connection pool at 200 was adequate (confidence 0.88). This was corrected on February 20th to "connection pool needs 400 minimum." The correction was CAUSED_BY the incident finding.
      </Agent>
    </>
  )
}

export function PatternQueriesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're onboarding a new team member and want every architectural decision about authentication over 30 sessions. Without pattern queries, you keyword-search for "auth" and get a mix of facts, inferences, tangential mentions, and actual decisions. <B>20 minutes of manual filtering.</B>
      </P>

      <SectionLabel>With pattern queries</SectionLabel>
      <P>
        <B>memory_query</B> with <code className="text-[#ea580c]">event_types: ["decision"]</code> combined with semantic similarity to "authentication" returns 7 Decision nodes in <B>40 milliseconds</B>, chronologically ordered, each with CAUSED_BY links to supporting facts.
      </P>
      <Agent>
        Found 7 authentication decisions across sessions 3-28. The narrative arc: JWT for internal auth → refresh tokens → OAuth 2.1 for users → rate limiting post-incident. Each decision links to 2-4 supporting facts. Want me to generate a decision log document?
      </Agent>
    </>
  )
}

export function CausalAnalysisContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You just discovered that <B>latency benchmark numbers were wrong</B> — the tool had a configuration error inflating measurements by 40%. What decisions were made based on those bad numbers? Without causal analysis, the blast radius of a bad fact is invisible.
      </P>

      <SectionLabel>With causal analysis</SectionLabel>
      <P>
        <B>memory_causal</B> traverses all downstream edges from the bad fact in 30 milliseconds: 2 Inferences using the fact as evidence, 1 Decision that followed, and 3 further nodes depending on that decision. Total blast radius: <B>6 nodes, 2 high-confidence Decisions needing re-evaluation</B>.
      </P>
      <Agent>
        If the latency benchmarks were wrong, 6 downstream memories are affected: 2 inferences (Service X performance assessment), 1 decision (caching layer addition), and 3 dependent design choices. Recommend re-running benchmarks and using memory_correct to update the chain.
      </Agent>
    </>
  )
}

export function MemoryQualityContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent has been running for 6 months — 12,000 nodes across 180 sessions. <B>How healthy is its knowledge base?</B> A low-confidence inference from session 2 carries the same weight as a well-established fact from session 150. Knowledge debt accumulates silently.
      </P>

      <SectionLabel>With memory quality scoring</SectionLabel>
      <P>
        <B>memory_quality</B> runs a comprehensive audit: 23 nodes with confidence below 0.45, 7 orphan nodes, 4 decisions without supporting edges, and 31 stale nodes. Health score: <B>0.87 out of 1.0</B>.
      </P>
      <Agent>
        Memory health audit: 12,847 nodes, 31,204 edges. Health score: 0.87. Concerns: 4 decisions lack supporting evidence (highest risk), 23 low-confidence nodes, 31 stale nodes. The unsupported decisions are about caching strategy, retry policy, timeout values, and rate limiting.
      </Agent>
    </>
  )
}

export function ContradictionContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Over 50 sessions, different team members gave the agent conflicting information. Alice said the API rate limit is <B>1,000 req/min</B>. Bob said it's <B>500</B>. Both recorded as Facts. The agent might use either depending on which retrieval path activates first.
      </P>

      <SectionLabel>With contradiction detection</SectionLabel>
      <P>
        The consolidation query's <B>LinkContradictions</B> operation identifies 3 contradiction pairs in 25 milliseconds. The rate limit contradiction is flagged with strength <B>0.89</B>.
      </P>
      <Agent>
        Found contradiction: "API rate limit is 1,000 req/min" (session 12, Alice, confidence 0.80) conflicts with "API rate limit is 500 req/min" (session 34, Bob, confidence 0.75). These can't both be true. Should I verify with the API documentation?
      </Agent>
    </>
  )
}

export function BudgetPolicyContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent has been running for 2 years. The memory file is approaching <B>150 MB</B>. Every fact, inference, and tangential observation accumulates forever without budget governance. Eventually disk limits or performance degrade.
      </P>

      <SectionLabel>With storage budget policy</SectionLabel>
      <P>
        With <code className="text-[#ea580c]">AMEM_STORAGE_BUDGET_MODE=auto-rollup</code>, when the file reaches 85% of the 2 GB budget, the consolidation engine activates: near-duplicates merge, stale Episodes compress, low-decay orphan nodes are archived. The <B>2 GB budget accommodates roughly 2.5 million nodes</B> — a lifetime of continuous use.
      </P>
      <Agent>
        Storage health: 147 MB / 2 GB (7.3%). Projected 20-year usage: 890 MB. Budget status: healthy. Auto-rollup has compressed 312 low-value episode nodes this quarter. All decisions and corrections preserved.
      </Agent>
    </>
  )
}

export function PrivacyRedactionContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent captures decisions and facts automatically. But some conversations contain <B>API keys, email addresses, customer names</B>. Without privacy controls, an API key mentioned in passing becomes a permanent fixture of the memory graph.
      </P>

      <SectionLabel>With AMEM_AUTO_CAPTURE controls</SectionLabel>
      <P>
        With <code className="text-[#ea580c]">AMEM_AUTO_CAPTURE_MODE=safe</code> and <code className="text-[#ea580c]">AMEM_AUTO_CAPTURE_REDACT=true</code>, the agent applies regex-based redaction before any content is persisted. Emails become <B>[redacted-email]</B>. API keys become <B>[redacted-secret]</B>. The safe mode only captures structured reasoning and skips raw conversation content.
      </P>
      <Agent>
        Captured 8 nodes this session. Redaction applied: 2 email addresses removed, 1 API key removed. Mode: safe (structured reasoning only). Raw conversation content: not captured.
      </Agent>
    </>
  )
}

export function RuntimeSyncContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Three agents work on different parts of the same project. Agent A designed the database schema. Agent B builds the API. <B>Each agent is an island.</B> Context transfer is manual, lossy, and time-consuming. Important decisions fall through the cracks.
      </P>

      <SectionLabel>With runtime-sync episodes</SectionLabel>
      <P>
        <B>amem runtime-sync</B> scans Agent A's memory file and creates a compressed Episode node: 12 Decisions about table design, 3 Corrections, and 5 key Facts about foreign key constraints. This episode becomes a handoff artifact that Agent B can ingest.
      </P>
      <Agent>
        Runtime-sync episode created: "Database Schema Design (sessions 1-15)." Contains 12 decisions, 3 corrections, 5 key facts. Workspace changes detected: 4 new migration files, 2 modified models. Episode ready for cross-agent handoff.
      </Agent>
    </>
  )
}

/* ─────────────────────────────── VISION ── */

export function AvisFormatContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're debugging a CSS layout issue. You reproduce it, describe it to the agent, but the agent <B>doesn't actually see the problem</B>. It has your text description, which omits the subtle 3-pixel overlap. Every visual debugging session starts from scratch.
      </P>

      <SectionLabel>With the .avis format</SectionLabel>
      <P>
        Every captured screenshot becomes a permanent visual observation: a JPEG thumbnail, a <B>512-dimensional CLIP ViT-B/32 embedding</B>, a quality score, metadata labels, and a timestamp — all packed into roughly <B>4.26 KB per capture</B>. A gigabyte holds 250,000 visual observations. The file is portable and opens in under 5 milliseconds.
      </P>
      <Agent>
        Loaded visual memory: 847 observations across 23 sessions. Oldest capture: January 15th (login page redesign). Most recent: today's cart badge regression. Storage: 3.6 MB.
      </Agent>
    </>
  )
}

export function VisionQueryContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're reviewing a design change from two weeks ago. The Git history shows <B>CSS modifications</B>, but you can't visualize the before state from a diff of <code className="text-[#ea580c]">margin-top: 16px</code> to <code className="text-[#ea580c]">margin-top: 24px</code>.
      </P>

      <SectionLabel>With vision_query</SectionLabel>
      <P>
        The agent queries <code className="text-[#ea580c]">after: Feb 1, before: Feb 14, labels: ["dashboard"]</code> and returns 12 captures sorted by recency. The highest-quality capture (score <B>0.82</B>) shows the pre-redesign layout.
      </P>
      <Agent>
        Found 12 dashboard captures from February 1-14. Best quality capture (0.82): session 15, February 8th, labeled "dashboard main view," 1280x720 resolution. Showing the pre-redesign layout with the compact header and 16px card margins.
      </Agent>
    </>
  )
}

export function VisionCaptureContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent is monitoring a long-running deployment. You step away for 30 minutes. <B>The deployment log scrolled past critical error messages</B> that appeared for 10 seconds and then were replaced. The visual evidence is gone.
      </P>

      <SectionLabel>With vision_capture</SectionLabel>
      <P>
        The agent processes screenshots through a rigorous pipeline: JPEG thumbnail, <B>CLIP ViT-B/32 embedding in 47ms</B>, quality scoring (resolution 35%, metadata 40%, model confidence 25%), and metadata sanitization — emails, API keys, and filesystem paths are all redacted automatically.
      </P>
      <Agent>
        Captured 4 deployment states while you were away. Key event: health check failure on pod-3 at minute 18 (capture #1247, quality 0.78). System recovered automatically at minute 23. Full visual timeline available.
      </Agent>
    </>
  )
}

export function UiBlindnessContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your checkout page's "Place Order" button has a disabled state that looks <B>almost identical</B> to its enabled state. The model says "I see a blue button" in both cases. The color contrast ratio is only 1.3:1 — well below WCAG guidelines. The accessibility problem is <B>invisible to text-based reasoning</B>.
      </P>

      <SectionLabel>With vision capture</SectionLabel>
      <P>
        The agent takes screenshots of both states. The CLIP embeddings produce <B>0.94 cosine similarity</B> — nearly identical, confirming the problem numerically. The agent can reason about visual evidence even when it can't articulate the exact color difference.
      </P>
      <Agent>
        Captured enabled and disabled button states. Visual similarity: 0.94 — these states are nearly indistinguishable visually. The disabled state lacks sufficient visual contrast. This may be an accessibility issue (color contrast ratio likely below WCAG 2.1 AA threshold of 3:1).
      </Agent>
    </>
  )
}

export function VisionCompareContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A CSS refactoring PR says "no visual changes." With <B>47 unique routes</B>, comprehensive visual regression testing by eye is impractical. A subtle 2-pixel navigation bar shift goes unnoticed until a user reports it.
      </P>

      <SectionLabel>With vision_compare</SectionLabel>
      <P>
        The agent compares captures across key pages using <B>512-dimensional CLIP embeddings</B>. Home page: 0.99. Product page: 0.98. Checkout: 0.97. User profile: <B>0.89 — below the 0.95 threshold</B>. Flagged immediately.
      </P>
      <Agent>
        Compared 12 pages pre-merge vs post-merge. 11 pages visually identical (similarity &gt; 0.95). 1 regression detected: user profile page (similarity 0.89). The profile page header has shifted — likely a CSS specificity change affecting .profile-header margins.
      </Agent>
    </>
  )
}

export function VisionDiffContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The profile page regression has been flagged. Now you need to know <B>exactly where</B> the change occurred on a complex page with header, avatar, bio, activity feed, and sidebar. You're doing visual spot-the-difference by eye on a 1280x720 page.
      </P>

      <SectionLabel>With vision_diff</SectionLabel>
      <P>
        Per-pixel absolute difference with an 8x8 grid analysis completes in <B>under 1 millisecond</B>. Result: 3.4% of pixels changed, concentrated in 2 regions — the profile header area and the header-bio gap.
      </P>
      <Agent>
        Pixel diff: 3.4% of pixels changed. 2 regions affected: profile header area (120, 24, 340x48) and header-bio gap (120, 80, 340x16). The header appears to have shifted down, increasing the gap above the bio section. Consistent with a margin-top change on .profile-header.
      </Agent>
    </>
  )
}

export function VisionSimilarContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your user reports: "The login page looks weird. It looked like this before." <B>They don't send a screenshot of "before."</B> If the login page changed three months ago and you have 500 captures, this is a needle-in-a-haystack problem.
      </P>

      <SectionLabel>With vision_similar</SectionLabel>
      <P>
        The current page's CLIP embedding is compared against all <B>847 stored observations</B>. Top match (similarity: 0.96) is from February 3rd, before the redesign. The agent now has a precise visual baseline.
      </P>
      <Agent>
        Found 3 similar visual states. Closest match: capture #412 from February 3rd (similarity 0.96, pre-redesign). The current page closely resembles the pre-redesign version. This suggests the recent CSS deployment may have accidentally reverted login page styles.
      </Agent>
    </>
  )
}

export function QualityScoreContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent has 200 captures. Some are full-resolution with detailed labels. Others are <B>quick 320x240 crops with no metadata</B>, captured in fallback mode. You're about to make a critical decision based on visual comparisons. Which captures can you trust?
      </P>

      <SectionLabel>With quality_score</SectionLabel>
      <P>
        Every capture receives a composite metric: <B>resolution (35%)</B>, label completeness (20%), description presence (20%), and <B>model confidence (25%)</B>. A full-resolution capture scores 0.85+. A fallback capture scores 0.35. Comparisons are automatically weighted by quality.
      </P>
      <Agent>
        Visual comparison confidence adjusted: baseline capture quality 0.42 (low resolution, no labels, fallback mode). Recommend recapturing at full resolution before making design decisions.
      </Agent>
    </>
  )
}

export function VisionHealthContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Visual memory has grown to 500 captures. Without health diagnostics, <B>unlabeled captures become unsearchable</B>, stale captures pollute similarity searches, and captures disconnected from memory nodes represent evidence that's never linked to reasoning.
      </P>

      <SectionLabel>With vision_health</SectionLabel>
      <P>
        Configurable thresholds flag low-quality (&lt;0.45), stale (&gt;7 days), unlabeled, and unlinked captures. Status logic is strict: <B>&gt;50% low-quality or &gt;70% unlinked triggers "fail."</B>
      </P>
      <Agent>
        Vision health: WARN. 500 captures across 14 sessions. 32 low-quality (6.4%), 147 stale (29.4%), 89 unlabeled (17.8%), 312 unlinked (62.4%). Primary concern: 312 captures not linked to memory nodes.
      </Agent>
    </>
  )
}

export function VisionLinkContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent made a Decision: "The new checkout flow is better." But <B>where's the evidence?</B> The before/after screenshots that motivated the decision are orphaned in visual memory with no traceable connection.
      </P>

      <SectionLabel>With vision_link</SectionLabel>
      <P>
        The agent creates explicit connections with typed relationships: <B>observed_during</B>, <B>evidence_for</B>, <B>screenshot_of</B>. Linked captures are protected from storage budget pruning — evidence that supports decisions is never automatically deleted.
      </P>
      <Agent>
        Linked capture #834 (old checkout, quality 0.87) and #835 (new checkout, quality 0.91) to Decision node "New checkout flow is better." Relationship: evidence_for. These captures are now protected from storage pruning.
      </Agent>
    </>
  )
}

export function NonTextSignalContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The DOM says everything is fine. But the visual capture shows a <B>clear overlap between two elements</B> that only manifests at a specific viewport width. The agent signs off on the release. The overlap ships to production.
      </P>

      <SectionLabel>With visual confidence scoring</SectionLabel>
      <P>
        The agent combines capture quality (both above <B>0.80</B>), diff severity (<B>12% change</B> where 0% was expected), and DOM analysis into a confidence-weighted assessment.
      </P>
      <Agent>
        Visual regression severity: HIGH. Pixel diff ratio 12% in the header region at 1366px viewport. Both captures high quality (0.83 and 0.87). DOM inspection shows no structural issues — this is a purely visual regression invisible to text-based analysis. Recommend blocking release.
      </Agent>
    </>
  )
}

export function ParameterSafetyContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A poorly formatted API call passes <code className="text-[#ea580c]">min_quality: 1.5</code> to vision_query. Another passes negative coordinates. A third requests vision_similar with <B>both capture_id and embedding set simultaneously</B>. Without validation, these produce undefined behavior.
      </P>

      <SectionLabel>With strict validation</SectionLabel>
      <P>
        Every parameter is checked before execution. <code className="text-[#ea580c]">min_quality</code> must be in [0.0, 1.0]. <code className="text-[#ea580c]">after</code> must be ≤ <code className="text-[#ea580c]">before</code>. vision_similar requires <B>exactly one</B> of capture_id or embedding. Every validation error returns a <B>specific, actionable message</B>. No silent failures.
      </P>
      <Agent>
        Error: vision_query parameter validation failed. min_quality value 1.5 is outside valid range [0.0, 1.0]. Adjust to a value between 0.0 and 1.0 (e.g., 0.80 for high-quality captures only).
      </Agent>
    </>
  )
}

/* ────────────────────────────── CODEBASE ── */

export function ImpactEdgesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You rename <B>calculateTotal</B> in the payment module. Quick text search finds 8 references. But a webhook handler in a completely different service imports it <B>dynamically via a string-based loader</B>. Your rename just broke payment processing for 40,000 users.
      </P>

      <SectionLabel>With IMPACT edges</SectionLabel>
      <P>
        <B>impact_analysis</B> returns the full dependency tree in 1.46 microseconds. Direct dependents: 8 callers. Transitive dependents: <B>23 additional code units across 7 files</B>. Risk summary: 4 high-risk, 8 medium-risk, 19 low-risk.
      </P>
      <Agent>
        Impact analysis for calculateTotal: 31 total dependents across 10 files. 4 high-risk paths: webhook/processor.ts (dynamic import, stability 0.38), reports/monthly.ts (8 callers deep), api/v2/checkout.ts (public endpoint), batch/reconcile.ts (nightly job).
      </Agent>
    </>
  )
}

export function CalledByContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You need to understand what <B>process_order</B> does in a 200,000-line legacy codebase. It calls 12 functions, some call 8 more, those call 5 more. The call tree is <B>6 levels deep</B>. Reading linearly would take hours.
      </P>

      <SectionLabel>With CALLS / CALLED_BY edges</SectionLabel>
      <P>
        Bidirectional call graph traversal at <B>1.27 microseconds</B> for depth 3. Forward: 47 functions called directly or transitively. The agent identifies the critical path through the database. Reverse: 3 distinct entry points, each with different error handling requirements.
      </P>
      <Agent>
        Call graph for process_order (depth 3): 47 callees across 6 levels. Critical database path: process_order → validate_inventory → check_warehouse_stock → query_inventory_db. 3 callers: REST handler, batch job, GraphQL resolver. The batch job doesn't implement retry logic.
      </Agent>
    </>
  )
}

export function TestsEdgesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You refactored <B>UserAuthentication</B> to extract a TokenValidator. All 47 tests pass. But <B>43 of those tests exercise parts you didn't touch</B>. Only 4 test the extracted logic, and 2 use mocks that bypass the new validation path.
      </P>

      <SectionLabel>With TESTS edges</SectionLabel>
      <P>
        The agent maps which tests cover which code units and cross-references against the change set. Net real coverage of the refactored code: <B>2 tests</B>. The 2 mocked tests are flagged as false positives.
      </P>
      <Agent>
        Test coverage for TokenValidator: 4 tests reference this code. However, 2 tests use mocked validators that bypass your extracted logic. Real coverage: 2 tests. Recommend adding tests for: invalid signature handling, token rotation, and the new validation error path.
      </Agent>
    </>
  )
}

export function ContainsEdgesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You need to find where user profile logic lives in a monorepo with <B>12 packages, 340 modules, 2,800 symbols</B>. Grep for "profile" returns 287 hits across 43 files — primary implementations mixed with tangential references.
      </P>

      <SectionLabel>With CONTAINS edges</SectionLabel>
      <P>
        The structural hierarchy reveals: <code className="text-[#ea580c]">packages/user/</code> contains 14 modules, <code className="text-[#ea580c]">shared/models/</code> has the core data model, <code className="text-[#ea580c]">api/handlers/</code> has REST endpoints, and <code className="text-[#ea580c]">legacy/compat/</code> has backward-compatibility shims. <B>Full structural picture, not a flat list of text matches.</B>
      </P>
      <Agent>
        User profile logic spans 4 packages: user/ (primary, 14 modules), shared/models/ (data model, 1 class), api/handlers/ (REST endpoints, 3 functions), legacy/compat/ (v1 compatibility, 2 functions).
      </Agent>
    </>
  )
}

export function CouplesWithContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        There's no explicit dependency between <B>pricing/calculator.py</B> and <B>notifications/email_templates.py</B>. Different packages, no shared imports. But every time someone changes pricing, someone changes templates within 48 hours. <B>This pattern has repeated 7 times.</B>
      </P>

      <SectionLabel>With COUPLES_WITH edges</SectionLabel>
      <P>
        Git history analysis finds these files co-change in <B>89% of commits</B> touching either file. Coupling type: <B>Hidden</B> (no code-level dependency). The agent flags this during impact analysis.
      </P>
      <Agent>
        Hidden coupling detected: pricing/calculator.py and notifications/email_templates.py co-change 89% of the time (12 of 13 commits). No code-level dependency — this is business logic coupling. Recommend extracting shared pricing constants or adding a CI check.
      </Agent>
    </>
  )
}

export function ProphecyContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A file has been modified <B>23 times in 30 days</B>. Of those, 9 were bugfixes. Complexity doubled. Three authors. Nobody noticed because each change was small. <B>The trend lines point toward imminent failure.</B>
      </P>

      <SectionLabel>With PROPHECY</SectionLabel>
      <P>
        The agent analyzes temporal patterns weighted by velocity (30%), bugfix trend (30%), complexity growth (15%), and coupling risk (25%). The file scores <B>risk 0.91</B> — one of the highest in the repository.
      </P>
      <Agent>
        PROPHECY alert: services/payment/refund_handler.py — risk score 0.91 (BugRisk). 23 changes in 30 days, 39% bugfix ratio, complexity doubled, 3 authors. Prediction: high probability of production bug within 2 weeks. Recommend: freeze non-essential changes, add integration tests.
      </Agent>
    </>
  )
}

export function StabilityScoringContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're choosing which module to build on. Two candidates: <B>services/auth/</B> (feels stable) and <B>services/payments/</B> (actively evolving). "Stable" and "volatile" are vibes, not measurements.
      </P>

      <SectionLabel>With stability scoring</SectionLabel>
      <P>
        Five weighted factors: change frequency (25%), bugfix ratio (25%), recent activity (20%), author concentration (15%), and code churn (15%). Auth scores <B>0.87</B>. Payments scores <B>0.23</B>. The gap is quantified, not guessed.
      </P>
      <Agent>
        Stability comparison: auth/session_manager.py scores 0.87 (stable). payments/refund_handler.py scores 0.23 (volatile). Building on auth gives you a 3.8x more stable foundation.
      </Agent>
    </>
  )
}

export function ChangeVelocityContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Sprint planning is based on ticket descriptions and developer intuition. Nobody mentions that the payment service has been changing <B>4 times per week</B> and is likely to have merge conflicts with 2 other in-flight PRs.
      </P>

      <SectionLabel>With change velocity</SectionLabel>
      <P>
        The agent quantifies acceleration: payments at <B>4.2 changes/week</B> (up 3.8x), notifications decelerating (2.1, down from 3.5), auth stable (0.3/week). These trends inform planning.
      </P>
      <Agent>
        Velocity report: payments/ is accelerating (4.2 changes/week, up 3.8x). notifications/ is decelerating (2.1/week, down from 3.5). auth/ is stable (0.3/week). Recommend serializing payment PRs or designating a single owner for the sprint.
      </Agent>
    </>
  )
}

export function ConceptEdgesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You search for "auth" and get <B>287 results</B>. Some are authentication, some are authorization (different concept), some are test helpers, config files, comments. 30 minutes of manual filtering.
      </P>

      <SectionLabel>With CONCEPT edges</SectionLabel>
      <P>
        The "authentication" concept maps to semantically identified units across packages: <B>AuthMiddleware</B> in api/, <B>TokenValidator</B> in shared/, <B>OAuth2Provider</B> in integrations/, <B>SessionStore</B> in data/. Sub-concepts: token validation (3 units), session management (5 units), OAuth integration (4 units).
      </P>
      <Agent>
        Concept map for "authentication": 19 code units across 5 packages. Sub-concepts: token validation (3 units), session management (5 units), OAuth integration (4 units), permission checking (7 units). Entry point: AuthMiddleware.authenticate().
      </Agent>
    </>
  )
}

export function SymbolLookupContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Documentation references <B>PaymentService.processRefund</B>. You need to find it among 2,800 exported symbols across 12 packages. Searching "processRefund" returns 14 matches — you scan them visually to find the definition.
      </P>

      <SectionLabel>With symbol lookup</SectionLabel>
      <P>
        Exact match in <B>14.3 microseconds</B> — O(1) hash-based lookup. Returns the definition with metadata: file path, complexity, stability score, caller count. Prefix, contains, and fuzzy modes handle typos and partial names.
      </P>
      <Agent>
        Symbol: PaymentService.processRefund — packages/payments/src/service.ts:145. Public async function, complexity 12, stability 0.67. 23 direct callers, 3 covering tests.
      </Agent>
    </>
  )
}

export function TypeHierarchyContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're refactoring <B>BaseRepository</B>, extended by 7 subclasses. Grep for "extends BaseRepository" finds 5 — but <B>2 subclasses extend intermediate classes</B> that extend BaseRepository. They don't appear in a direct text search.
      </P>

      <SectionLabel>With type hierarchy</SectionLabel>
      <P>
        INHERITS, IMPLEMENTS, and OVERRIDES edges reveal the full tree: <B>5 direct children, 2 grandchildren</B>. Method overrides mapped: findById overridden 3 times, save overridden 2 times. Trait implementations tracked across the hierarchy.
      </P>
      <Agent>
        Type hierarchy for BaseRepository: 5 direct subclasses, 2 grandchildren via CachedRepository. Method overrides: findById (3), save (2), delete (1). Changing findById signature affects 3 overrides and their 23 combined callers.
      </Agent>
    </>
  )
}

export function FfiBindsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your Python web server calls a Rust library via PyO3 for text processing. A bug report says <B>normalization is dropping Unicode characters</B>. Python IDE doesn't know about Rust. Rust IDE doesn't know about Python callers.
      </P>

      <SectionLabel>With FFI_BINDS edges</SectionLabel>
      <P>
        The PyO3 binding is detected during compilation. Python call at <code className="text-[#ea580c]">text.py:34</code> connects via FFI_BINDS edge to Rust at <code className="text-[#ea580c]">lib.rs:67</code>. Impact analysis <B>crosses the language boundary</B> — changing the Rust function shows 12 Python callers.
      </P>
      <Agent>
        FFI trace: Python text_processor.normalize() → PyO3 → Rust fn normalize(). The Unicode bug is in the Rust implementation: input.chars().filter() at line 72 filters by ASCII range. 12 Python callers affected.
      </Agent>
    </>
  )
}

export function MultiLanguageContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        TypeScript frontend, Python API, Rust performance library. Garbled text appears. You debug <B>each layer independently</B> — console.logs, print statements, dbg! macros. If the bug is at a boundary, you might miss it because <B>each layer looks correct in isolation</B>.
      </P>

      <SectionLabel>With cross-language tracing</SectionLabel>
      <P>
        The agent traces the data flow: TypeScript → HTTP → Python → PyO3 → Rust. It identifies that Rust returns UTF-8 <B>Vec&lt;u8&gt;</B>, but Python decodes as ASCII instead of UTF-8. The encoding error is at the Python-Rust boundary.
      </P>
      <Agent>
        Cross-language trace: Frontend fetchText() → API get_text_handler() → Rust process_text(). Bug at Python-Rust boundary: Rust returns UTF-8, Python decodes as ASCII at api/handlers/text.py:45. Fix: change .decode('ascii') to .decode('utf-8').
      </Agent>
    </>
  )
}

export function PatternSharingContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're using <B>sqlx</B> in Rust for the first time. You use <code className="text-[#ea580c]">.unwrap()</code> on the database result. Your codebase doesn't demonstrate the correct error handling pattern, so the agent has no reference for "good."
      </P>

      <SectionLabel>With pattern sharing</SectionLabel>
      <P>
        The collective registry has established patterns from open-source codebases (<B>your private code never leaves your machine</B>). For sqlx: "Always handle sqlx::Error via ? or match — never .unwrap()." Confidence <B>0.94</B>, observed across 12,000+ codebases.
      </P>
      <Agent>
        Common mistake: .unwrap() on sqlx::query() at src/db/users.rs:34. Established pattern (confidence 0.94): propagate with ? or handle with match. Using .unwrap() will panic on any database error.
      </Agent>
    </>
  )
}

export function CommonMistakeContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You're writing a Go HTTP handler and <B>forget to call resp.Body.Close()</B>. Tests pass. In production under load, you exhaust file descriptors and the service crashes.
      </P>

      <SectionLabel>With common mistake detection</SectionLabel>
      <P>
        The pattern hash matches a known LibraryMistake for Go's <code className="text-[#ea580c]">net/http</code> with confidence <B>0.91</B>. Flagged immediately, before tests, code review, or deployment.
      </P>
      <Agent>
        Common Go mistake: HTTP response body not closed at handlers/proxy.go:67. Must call defer resp.Body.Close() immediately after error check. Without this, each request leaks a file descriptor. #2 most common net/http mistake (confidence 0.91).
      </Agent>
    </>
  )
}

export function LibraryGuidanceContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You create a <code className="text-[#ea580c]">tokio::runtime::Runtime</code> inside an existing async context. This compiles. Tests might pass. But <B>creating a runtime inside a runtime panics in production</B>.
      </P>

      <SectionLabel>With library-specific guidance</SectionLabel>
      <P>
        The collective registry flags: "Never create Runtime::new() inside an existing async context — use <B>tokio::task::spawn_blocking()</B> for synchronous work." Confidence <B>0.93</B>.
      </P>
      <Agent>
        Tokio anti-pattern: Runtime::new() called inside async function at src/services/worker.rs:89. Creating a tokio runtime inside an existing runtime will panic. Use tokio::task::spawn_blocking() instead. Known footgun (confidence 0.93).
      </Agent>
    </>
  )
}

export function AcbGateContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your CI merges PRs that pass tests. But tests don't catch <B>architectural risk</B> — a PR adding a dependency on a module with stability 0.12 and 47 dependents merges just as easily as one modifying a stable utility.
      </P>

      <SectionLabel>With acb gate</SectionLabel>
      <P>
        CI runs <code className="text-[#ea580c]">acb gate --max-risk 0.60 --require-tests</code>. The gate checks stability, dependency count, test coverage, and complexity against thresholds. Non-zero exit code <B>blocks the PR with a specific explanation</B>.
      </P>
      <Agent>
        Gate BLOCKED: PR modifies payment/refund_handler (risk 0.78, threshold 0.60). Reasons: stability 0.23, 31 dependents, 2 covering tests (minimum: 5). To unblock: add 3 tests covering the refund calculation path.
      </Agent>
    </>
  )
}

export function AcbBudgetContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        After 18 months of compiling code graphs, storage approaches <B>15 GB across 200 files</B>. Nobody knows which graphs are still relevant. Disk usage becomes an infrastructure conversation.
      </P>

      <SectionLabel>With acb budget</SectionLabel>
      <P>
        <code className="text-[#ea580c]">ACB_STORAGE_BUDGET_MODE=auto-rollup</code> with a 2 GB budget per graph. At 85% capacity, the engine compresses merged-branch graphs, archives historical snapshots, and preserves latest graphs for active branches.
      </P>
      <Agent>
        Storage audit: 200 graphs, 14.7 GB total. 142 from merged branches. Auto-rollup would compress to 3.2 GB. Active graphs (58): 4.8 GB, within 20-year budget projections.
      </Agent>
    </>
  )
}

export function TestGapContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You shipped a feature. <B>82% line coverage.</B> But the uncovered 18% is concentrated in error handling for your most critical functions — payment retry, database failover, circuit breaker timeout. The aggregate metric <B>hides the actual risk</B>.
      </P>

      <SectionLabel>With test-gap detection</SectionLabel>
      <P>
        The agent cross-references coverage against risk scores. Payment retry: risk <B>0.72, 0 tests</B>. Database failover: risk 0.65, 1 mocked test. Circuit breaker: risk 0.58, 0 tests. These 3 paths account for <B>67% of production incident risk</B>.
      </P>
      <Agent>
        Test gap analysis: 82% coverage overall, but 3 high-risk paths uncovered. Payment retry (risk 0.72, 0 tests), database failover (risk 0.65, 1 mocked), circuit breaker (risk 0.58, 0 tests). These account for 67% of incident risk.
      </Agent>
    </>
  )
}

export function HealthDiagnosticsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your codebase grew from 50K to 200K lines over 2 years. "Deploys feel slower." "Code review takes longer." These observations are real but <B>not quantified and don't point to specific causes</B>.
      </P>

      <SectionLabel>With acb health</SectionLabel>
      <P>
        Comprehensive report: systemic stability <B>(weighted average across all units)</B>, test coverage ratio, hotspot concentration, coupling density, and prophecy alerts. Not just "unhealthy" — specifically <B>which module and why</B>.
      </P>
      <Agent>
        Codebase health: stability 0.71 (down from 0.78). 3 hotspot files causing 34% of bugfixes. Coupling density up 23% (hidden coupling in payments/ ↔ notifications/). Test coverage in high-velocity modules: 79% (was 85%). 5 files at risk &gt; 0.70.
      </Agent>
    </>
  )
}

/* ─────────────── ALL TOGETHER NOW ─────── */

export function MemoryAllTogetherContent() {
  return (
    <>
      <P>
        It's Tuesday. Your production monitoring triggers an alert: the payment service is returning <B>500 errors at a rate of 12%</B> of all requests. You engage the agent.
      </P>

      <SectionLabel>Session 1: Triage (10:00 AM)</SectionLabel>
      <P>
        The agent records initial facts: "Payment service 500 error rate: 12%", "No deployments in the last 24 hours." It creates an <B>Inference</B>: "Likely not a code regression" (confidence 0.72, CAUSED_BY the "no deployments" fact). It finds a <B>Skill</B> node from 3 months ago: "When payment errors spike without deployment, check Stripe API status first." Stripe status: operational. Second Inference: "If not code and not Stripe, likely database or connection issue" (confidence 0.65). <B>Decision</B>: "Investigate database connection pool next."
      </P>

      <SectionLabel>Session 2: Investigation (11:30 AM)</SectionLabel>
      <P>
        Memory loads in <B>3.7 milliseconds</B>. New facts from database metrics: "Connection pool utilization: 198/200 (99%)", "Average query time: 340ms (normal: 45ms)", "3 queries &gt; 5 seconds." New Inference: "Connection pool exhaustion caused by slow queries" (confidence <B>0.88</B>). A <B>Correction</B> supersedes the vaguer inference from session 1. Decision: "Add 30s query timeout, increase pool to 400, identify slow queries."
      </P>

      <SectionLabel>Session 3: Remediation (2:00 PM)</SectionLabel>
      <P>
        Outcome facts: "Pool increased to 400 — error rate dropped to 2%", "3 slow queries identified." The agent finds a <B>semantically similar Skill</B> from 2 months ago via memory_similar (9ms, similarity 0.87): "Aggregation queries on large tables benefit from materialized views." Decision: "Optimize the 3 slow queries."
      </P>

      <SectionLabel>Session 4: Postmortem (Wednesday)</SectionLabel>
      <P>
        The agent loads all sessions. <B>memory_query</B> finds 4 Decisions, 1 Correction, 11 Facts. <B>memory_causal</B> traces the complete dependency tree from the initial alert: 11 facts → 4 inferences → 3 corrections → 4 decisions → 1 skill applied. <B>Belief revision</B> with the hypothetical "slow query monitoring was in place" identifies 2 decisions that would have been unnecessary. The postmortem is recorded as an <B>Episode</B>, with a new Skill: "Add slow query alerting to prevent connection pool cascades."
      </P>

      <Agent>
        Postmortem complete. Root cause chain: 3 slow queries → connection pool exhaustion → 12% error rate. Resolution: pool increase (immediate), query timeout (mitigation), query optimization (permanent). New skill recorded: slow query alerting prevents cascade. Belief revision shows this could have been a 30-minute fix with proper monitoring.
      </Agent>

      <P>
        Four sessions. Seventeen memory nodes. Twenty-three edges. Every decision traceable to evidence, every correction preserving history, every skill reusable in future incidents. <B>The agent didn't just solve the problem — it built institutional knowledge that makes the next incident faster.</B>
      </P>
    </>
  )
}

export function VisionAllTogetherContent() {
  return (
    <>
      <P>
        It's Wednesday morning. A QA engineer reports: "The product detail page looks broken on mobile. <B>The 'Add to Cart' button is hidden behind the image carousel.</B> It was fine last week."
      </P>

      <SectionLabel>Step 1: Capture the broken state</SectionLabel>
      <P>
        <B>vision_capture</B> at mobile viewport (375x812). CLIP embedding computed in 47ms. Quality score: <B>0.84</B>. Labels: "product-detail-mobile-broken." Session token in URL redacted to [redacted-secret]. Capture ID: #1089.
      </P>

      <SectionLabel>Step 2: Find the last known good state</SectionLabel>
      <P>
        <B>vision_similar</B> searches 847 observations in 1.5ms. Top match: capture #1034 (similarity <B>0.88</B>, from last Tuesday). Selected as baseline.
      </P>

      <SectionLabel>Step 3: Pixel-level diff</SectionLabel>
      <P>
        <B>vision_diff</B> in under 1ms. Result: <B>18% of pixels changed</B>. Three regions: carousel area expanded (+120px), Add to Cart button shifted and overlapping, product description pushed down.
      </P>

      <SectionLabel>Step 4: Compare with baseline</SectionLabel>
      <P>
        <B>vision_compare</B>: broken vs good = 0.88 similarity. Good vs two-weeks-ago = <B>0.97</B> — the page was stable before. Regression happened between Tuesday and today.
      </P>

      <SectionLabel>Step 5: Link to cognitive memory</SectionLabel>
      <P>
        Decision node created in cognitive memory. <B>vision_link</B> connects both captures as <code className="text-[#ea580c]">evidence_for</code>. Protected from storage pruning. CAUSED_BY edge to the pixel diff fact.
      </P>

      <SectionLabel>Step 6: Quality-weighted confidence</SectionLabel>
      <P>
        Both captures above <B>0.80 quality</B>. Pixel diff unambiguous. CLIP similarity drop (0.97 → 0.88) confirms genuine regression. Confidence: <B>0.92</B>.
      </P>

      <Agent>
        Diagnosis (confidence: 0.92): Mobile product detail page regression. Image carousel height increased ~120px, pushing "Add to Cart" below the fold at 375px. Visual evidence: 18% pixel diff. The page was stable for 2 prior weeks (0.97 similarity). Both evidence captures high quality (0.81 and 0.84). Recommend checking carousel CSS changes — likely a max-height or aspect-ratio change.
      </Agent>

      <P>
        Seven steps. Two captures compared. Three regions identified. One diagnosis with <B>0.92 confidence</B>, backed by quality-scored visual evidence linked to cognitive memory. The entire workflow took <B>under 200 milliseconds</B> of computation.
      </P>
    </>
  )
}

export function CodebaseAllTogetherContent() {
  return (
    <>
      <P>
        The tech lead says: "Refactor <B>PaymentProcessor.processPayment()</B> — it's a 400-line god method. Break it into smaller functions. Don't break anything."
      </P>

      <SectionLabel>Symbol lookup + Structural understanding</SectionLabel>
      <P>
        Found in <B>14.3μs</B>. Public async, complexity 34, stability <B>0.31</B>. CONTAINS edges show 14 methods in the class, inside the payments package.
      </P>

      <SectionLabel>Impact analysis</SectionLabel>
      <P>
        <B>47 dependents</B> across 12 files. 23 callers. 3 high-risk: webhook handler (stability 0.22, dynamic import), batch reconciler (nightly job), GraphQL resolver (public API). 5 test files cover this method.
      </P>

      <SectionLabel>Hidden coupling</SectionLabel>
      <P>
        COUPLES_WITH: <code className="text-[#ea580c]">processor.ts</code> and <code className="text-[#ea580c]">payment_confirmation.ts</code> co-change <B>82% of the time</B>. No code dependency. Business logic coupling — pricing changes require template updates.
      </P>

      <SectionLabel>Call graph + Concept mapping</SectionLabel>
      <P>
        10 internal calls spanning 5 responsibilities: input validation (2), pricing calculation (2), payment execution (1), post-payment fulfillment (3), observability (2). Each concept suggests a <B>natural extraction boundary</B>.
      </P>

      <SectionLabel>Prophecy + Stability</SectionLabel>
      <P>
        Risk score <B>0.87</B> — 3rd highest. 19 changes in 45 days, 37% bugfix ratio, complexity doubled, 4 authors. Stability <B>0.31</B>. The refactor isn't premature — it's overdue.
      </P>

      <SectionLabel>Test gaps + FFI + Type hierarchy</SectionLabel>
      <P>
        Discount path: <B>0 dedicated tests</B>. Webhook path: 0 tests. FFI_BINDS: <code className="text-[#ea580c]">calculateTotal()</code> calls Rust pricing engine via N-API — must preserve call convention. INHERITS: 2 subclasses (<B>SubscriptionPaymentProcessor</B>, <B>RefundPaymentProcessor</B>) override this method. Interface <B>IPaymentHandler</B> must also update.
      </P>

      <SectionLabel>The gate + The plan</SectionLabel>
      <P>
        <B>acb gate</B>: risk 0.87, above threshold 0.60. But the refactor itself is the fix. The agent synthesizes all 10 analyses:
      </P>
      <P>
        Add 3 tests first. Extract <B>validateAndCalculate()</B>, <B>executePayment()</B>, and <B>fulfillOrder()</B>. Keep processPayment as orchestrator. Update 2 subclass overrides. Update the interface. Verify N-API compatibility. Update the email template (hidden coupling). Run full suite.
      </P>

      <Agent>
        Refactoring plan: 400 lines → 4 focused methods. Impact: 47 dependents, 3 high-risk callers, 2 subclass overrides, 1 interface update, 1 FFI boundary, 1 hidden coupling. Test gaps: 3 paths need coverage first. Risk: 0.87 → projected 0.45 after decomposition. No breaking API changes if orchestrator signature preserved.
      </Agent>

      <P>
        Eleven analyses. One comprehensive plan. Every dependency mapped. Every risk quantified. Every hidden coupling surfaced. <B>The god method doesn't stand a chance.</B>
      </P>
    </>
  )
}

/* ─────────────────────────────── IDENTITY ── */

export function IdentityAnchorsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent deploys code, calls APIs, and approves transactions. But when something goes wrong, there is <B>no cryptographic proof</B> of which agent acted. API keys are shared secrets — they prove a key was used, not who used it. OAuth tokens expire and carry no action history.
      </P>

      <SectionLabel>With identity anchors</SectionLabel>
      <P>
        Each agent gets a unique <B>Ed25519 key pair</B> as its identity anchor. The public key is the agent's verifiable identity — anyone can confirm "this is agent deploy-bot-7." The private key stays with the agent and signs every action it takes. No central authority required.
      </P>
      <Agent>
        My identity anchor is a3f8...c2 (Ed25519). I generated it deterministically from my seed. You can verify any receipt I produce using only my public key — no network call, no server, no trust assumptions.
      </Agent>
    </>
  )
}

export function ActionReceiptsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Agents act constantly — deploying, querying, modifying data — but the record of those actions lives in <B>mutable logs</B> that can be tampered with, truncated, or lost. There is no tamper-evident record of what happened.
      </P>

      <SectionLabel>With action receipts</SectionLabel>
      <P>
        Every operation produces a <B>signed receipt</B>: the action type, payload hash, timestamp, and the agent's Ed25519 signature. The receipt is immutable — if anyone changes a single byte, the signature breaks. Verification requires only the public key.
      </P>
      <Agent>
        Receipt #1847: action=deploy, target=staging-us-east, payload_hash=7a3b...f1, timestamp=2026-02-25T14:32:07Z, signature=valid. Anyone with my public key can verify this receipt independently.
      </Agent>
    </>
  )
}

export function ReceiptChainsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Individual log entries exist in isolation. There is no guarantee of completeness — entries can be deleted from the middle without detection. <B>Audit trails have gaps</B> and no one can prove they don't.
      </P>

      <SectionLabel>With receipt chains</SectionLabel>
      <P>
        Each receipt includes the <B>hash of the previous receipt</B>, forming an ordered chain. If any receipt is removed or modified, every subsequent hash breaks visibly. The chain provides a complete, verifiable, tamper-evident audit trail.
      </P>
      <Agent>
        Receipt chain for deploy-bot-7: 47 receipts, all hashes valid, no gaps. The chain traces from initial anchor creation through today's deployment. Full provenance in one traversal.
      </Agent>
    </>
  )
}

export function KeyDerivationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Complex agents need different identities for different subsystems, but managing multiple independent key pairs creates <B>key sprawl</B> with no clear relationship between identities.
      </P>

      <SectionLabel>With key derivation</SectionLabel>
      <P>
        A master anchor can derive <B>hierarchical child keys</B> for isolated subsystems. The deploy subsystem gets its own key, the monitoring subsystem gets another — but all trace back to the same root identity through deterministic derivation paths.
      </P>
      <Agent>
        Derived key deploy/staging from master anchor a3f8...c2 at path m/0/1. The child key is independently verifiable and can be revoked without affecting the master or sibling keys.
      </Agent>
    </>
  )
}

export function TrustGrantsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Agent-to-agent delegation is ad hoc. One agent gives another an API key or token with <B>no scope limits, no expiry, and no audit trail</B>. If the delegated agent misbehaves, there is no cryptographic record of what was authorized.
      </P>

      <SectionLabel>With trust grants</SectionLabel>
      <P>
        Trust grants are <B>signed delegation tokens</B> from one identity anchor to another. Each grant specifies exact scope (deploy:staging but not deploy:prod), a TTL, and revocation conditions. The grant itself is a signed receipt — fully verifiable.
      </P>
      <Agent>
        Trust grant: ops-lead (91b2...e4) → deploy-bot-7 (a3f8...c2). Scope: deploy:staging, deploy:prod. TTL: 24h. Granted at 2026-02-25T08:00:00Z. Signature: valid.
      </Agent>
    </>
  )
}

export function TrustDelegationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Multi-agent systems need chains of trust — the CTO trusts the ops lead, who trusts the deploy bot. But <B>there is no way to verify the chain</B> without asking each party individually.
      </P>

      <SectionLabel>With trust delegation</SectionLabel>
      <P>
        Delegation chains are sequences of signed trust grants. Each hop is independently verifiable. Anyone can walk the chain from the deploy bot back to the CTO and confirm every grant is <B>valid, in-scope, and unexpired</B> — without contacting any party.
      </P>
      <Agent>
        Delegation chain: CTO → ops-lead → deploy-bot-7. 2 hops. All signatures valid. Scope narrows at each hop: full-admin → deploy:* → deploy:staging,deploy:prod. TTL: 24h at final hop.
      </Agent>
    </>
  )
}

export function TrustRevocationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Revoking an agent's access means rotating shared secrets, updating configurations, and <B>hoping the agent checks back</B> before acting on stale credentials.
      </P>

      <SectionLabel>With trust revocation</SectionLabel>
      <P>
        Revocation is a signed receipt that invalidates a trust grant. The revoked grant <B>stops validating immediately</B> — any receipt signed under that grant after revocation is cryptographically invalid. No waiting for expiry, no configuration changes.
      </P>
      <Agent>
        Revocation receipt issued for grant ops-lead → deploy-bot-7. Any action receipts signed by deploy-bot-7 under this grant after 2026-02-25T16:00:00Z will fail verification.
      </Agent>
    </>
  )
}

export function ReceiptVerificationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Verifying that an agent really performed an action requires <B>trusting the logging infrastructure</B>, the database, and the network between them. Any point in the chain can be compromised.
      </P>

      <SectionLabel>With receipt verification</SectionLabel>
      <P>
        Verification requires <B>only the public key</B>. No network, no server, no central authority. The receipt contains the signature, the payload hash, and the signer's public key reference. Verification is a single Ed25519 check — offline, instant, and trustless.
      </P>
      <Agent>
        Verified receipt #1847: signature matches public key a3f8...c2, payload hash matches content, timestamp within chain sequence. Verification completed offline in 12 microseconds.
      </Agent>
    </>
  )
}

export function MultiLlmPortabilityContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Agent identity is <B>locked to the platform</B>. Switch from Claude to GPT and your agent starts from zero — no history, no trust relationships, no audit trail.
      </P>

      <SectionLabel>With multi-LLM portability</SectionLabel>
      <P>
        The <code className="text-[#ea580c]">.aid</code> artifact is LLM-agnostic. The same identity anchor, trust grants, and receipt history work across <B>Claude, GPT, Gemini, and any MCP-compatible runtime</B>. Agent identity belongs to the agent, not the vendor.
      </P>
      <Agent>
        Loading .aid artifact from previous Claude session. Identity anchor a3f8...c2 verified. 47 receipts in chain. 3 active trust grants. Now running on GPT-4 with full identity continuity.
      </Agent>
    </>
  )
}

export function AidFileFormatContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Agent credentials are scattered across environment variables, config files, and key stores. There is <B>no single portable artifact</B> that contains an agent's complete identity.
      </P>

      <SectionLabel>With the .aid file format</SectionLabel>
      <P>
        The <code className="text-[#ea580c]">.aid</code> file contains the identity anchor, all trust grants, and the complete receipt history in one <B>portable, encrypted artifact</B>. Copy it to another machine and the agent's full identity travels with it.
      </P>
      <Agent>
        .aid artifact summary: anchor=a3f8...c2, receipts=47, trust_grants=3 (2 active, 1 expired), encrypted=AES-256-GCM, size=12.4KB. Portable to any compatible runtime.
      </Agent>
    </>
  )
}

export function EncryptedAtRestContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Private keys stored on disk are <B>one file read away from compromise</B>. Most agent systems store credentials in plaintext environment variables or unencrypted config files.
      </P>

      <SectionLabel>With encrypted at rest</SectionLabel>
      <P>
        The .aid file is encrypted with <B>AES-256-GCM</B> when saved to disk. The private key never exists in plaintext outside of memory. Even if someone copies the file, they cannot extract the key or forge receipts without the encryption passphrase.
      </P>
      <Agent>
        .aid file encrypted at rest with AES-256-GCM. Private key decrypted only in memory during signing operations. File-level integrity verified by GCM authentication tag.
      </Agent>
    </>
  )
}

export function IdentityParameterSafetyContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Identity operations deal with multiple key types, IDs, and signatures that <B>look similar as strings</B>. Mixing up a public key with a private key, or an anchor ID with a receipt ID, causes silent failures or security holes.
      </P>

      <SectionLabel>With parameter safety</SectionLabel>
      <P>
        The type system makes it <B>structurally impossible</B> to confuse parameter types. Public keys, private keys, anchor IDs, receipt IDs, and signatures are all distinct types at compile time. Misuse is caught before the code runs.
      </P>
      <Agent>
        Type safety enforced: AnchorId, ReceiptId, PublicKey, PrivateKey, Signature are all distinct newtypes. Attempting to pass a PublicKey where a PrivateKey is expected is a compile error, not a runtime bug.
      </Agent>
    </>
  )
}

export function IdentityAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: production deployment audit</SectionLabel>
      <P>
        A production deployment fails at 2 AM. The incident team needs to know: which agent deployed, who authorized it, what exactly was deployed, and whether the authorization was valid at deployment time. With AgenticIdentity, every answer is <B>one receipt-chain traversal away</B>.
      </P>

      <SectionLabel>Identity anchor</SectionLabel>
      <P>
        Deploy-bot-7 (anchor <code className="text-[#ea580c]">a3f8...c2</code>) is cryptographically identified. Not "a token was used" — <B>this specific agent acted</B>.
      </P>

      <SectionLabel>Trust chain</SectionLabel>
      <P>
        Delegation: CTO → ops-lead → deploy-bot-7. Scope narrowed at each hop: full-admin → deploy:* → deploy:staging,deploy:prod. <B>All 3 grants valid at deployment time</B>. TTL: 24h, 6h remaining when deploy executed.
      </P>

      <SectionLabel>Receipt chain</SectionLabel>
      <P>
        Receipt #1847: action=deploy, target=prod-us-east, commit=af7c2e3, timestamp=02:14:07Z. Previous receipt: #1846 (staging deploy, same commit, 01:58:22Z). <B>Full chain: 47 receipts, no gaps, all signatures valid</B>.
      </P>

      <SectionLabel>Verification</SectionLabel>
      <P>
        The incident team verifies everything offline with deploy-bot-7's public key. No server needed. No logs to trust. No authority to contact. The <B>cryptographic evidence speaks for itself</B>.
      </P>

      <Agent>
        Incident audit complete: deploy-bot-7 deployed commit af7c2e3 to prod-us-east at 02:14:07Z. Authorization chain: CTO → ops-lead → deploy-bot-7, all valid. Receipt chain: 47 entries, zero gaps. Staging deploy preceded production by 16 minutes. All signatures verified offline.
      </Agent>
    </>
  )
}

/* ─────────────────────────────── TIME ── */

export function DeadlinesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent is managing a sprint. Three features are due Friday, a compliance report is due Thursday, and a database migration has a hard cutoff at midnight Saturday. You ask: "What's at risk this week?"
      </P>
      <P>
        Without deadline tracking, the agent treats all tasks equally. It has no concept of <B>hard vs soft deadlines</B>, no awareness of consequences for missing them, and no automatic status transitions. It might cheerfully suggest starting the migration on Friday afternoon.
      </P>

      <SectionLabel>With deadline tracking</SectionLabel>
      <P>
        Each deadline is stored as a typed entity: <B>hard</B> (compliance report — regulatory penalty), <B>soft</B> (feature delivery — stakeholder disappointment), or <B>hard</B> (migration cutoff — data loss window). The agent queries all deadlines within 7 days, sorts by consequence severity, and flags the compliance report as highest priority.
      </P>
      <Agent>
        Risk assessment: 3 deadlines within 7 days. CRITICAL: compliance report due Thursday (hard, regulatory penalty). HIGH: DB migration cutoff Saturday 00:00 UTC (hard, data loss window). MEDIUM: 3 feature deliveries due Friday (soft, stakeholder impact). Recommend prioritizing compliance report immediately.
      </Agent>
    </>
  )
}

export function SchedulesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your team has daily standups at 9 AM, weekly retros on Friday at 3 PM, and bi-weekly deploys on Tuesdays. You ask the agent to schedule a 2-hour planning session this week.
      </P>
      <P>
        Without recurring schedule awareness, the agent suggests Tuesday at 2 PM — <B>right when the deploy window opens</B>. It doesn't know about the retro, the standup, or any recurring commitment.
      </P>

      <SectionLabel>With recurring schedules</SectionLabel>
      <P>
        All recurring events are modeled with cron-style recurrence patterns, priority levels, and conflict detection. The agent evaluates all active schedules before suggesting a time slot. It finds that <B>Wednesday 10 AM - 12 PM</B> is the only clean 2-hour window.
      </P>
      <Agent>
        Schedule analysis: Tuesday blocked by bi-weekly deploy (14:00-18:00). Wednesday 10:00-12:00 is clear — no standups overlap, no deploy window, no retro. Thursday after standup also works but leaves less buffer before Friday compliance deadline.
      </Agent>
    </>
  )
}

export function SequencesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A database migration requires 6 ordered steps: backup, schema change, data migration, validation, index rebuild, and cutover. The agent starts helping on step 3 but has <B>no memory of which steps are complete</B>.
      </P>

      <SectionLabel>With step sequences</SectionLabel>
      <P>
        Each step is tracked as a sequence entity with status: <B>completed</B>, <B>active</B>, <B>pending</B>, or <B>skipped</B>. The agent knows step 1 (backup) and step 2 (schema change) are complete, step 3 (data migration) is active, and steps 4-6 are pending. It resumes exactly where you left off.
      </P>
      <Agent>
        Migration progress: steps 1-2 complete (backup: 14:02 UTC, schema: 14:18 UTC). Step 3 (data migration) in progress — 67% complete. Steps 4-6 pending. Estimated completion for remaining steps: 2.5 hours (PERT). Recommend proceeding with step 3 completion before validation.
      </Agent>
    </>
  )
}

export function DurationEstimatesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You ask: "How long will the migration take?" The agent guesses "about 3 hours" based on nothing. If it goes 6 hours, everyone is surprised. If it takes 1 hour, you over-allocated resources.
      </P>

      <SectionLabel>With PERT estimation</SectionLabel>
      <P>
        The agent uses three-point estimation: <B>optimistic</B> (best case), <B>expected</B> (most likely), and <B>pessimistic</B> (worst case). The PERT formula weighs the expected value 4x: (O + 4M + P) / 6. For a migration with O=1h, M=3h, P=8h, the PERT estimate is <B>3.5 hours</B> with a standard deviation of 1.17h.
      </P>
      <Agent>
        PERT estimate for DB migration: optimistic 1.0h, expected 3.0h, pessimistic 8.0h. Weighted estimate: 3.5h. Standard deviation: 1.17h. 95% confidence interval: 1.2h - 5.8h. Recommend scheduling a 6-hour window to cover the 95th percentile.
      </Agent>
    </>
  )
}

export function DecayModelsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your agent recommends a library version that was current 6 months ago. It has no concept that <B>information relevance degrades over time</B>. A breaking news alert from January is treated identically to one from today.
      </P>

      <SectionLabel>With temporal decay</SectionLabel>
      <P>
        Three decay functions model how information loses relevance: <B>exponential</B> (news, alerts — fast fade), <B>linear</B> (project priorities — steady decline), and <B>step</B> (quarterly reports — sudden drops at boundaries). The agent scores each fact by its current relevance before using it in reasoning.
      </P>
      <Agent>
        Relevance check: library recommendation from session 12 (6 months ago) has decayed to 0.23 relevance (exponential decay, half-life 60 days). Recommend refreshing this recommendation before proceeding. Current stable version has shifted from 3.2 to 4.1.
      </Agent>
    </>
  )
}

export function TimeSlotsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You need a 4-hour maintenance window this week. The agent says "how about Saturday?" without checking your 3 recurring schedules, 5 deadlines, and 2 in-progress sequences.
      </P>

      <SectionLabel>With time slot queries</SectionLabel>
      <P>
        The agent queries all active temporal entities and finds available gaps. It considers schedule conflicts, deadline proximity, sequence dependencies, and even temporal debt on deferred items. The result: <B>one clean 4-hour window</B>.
      </P>
      <Agent>
        Available 4-hour windows this week: Sunday 02:00-06:00 UTC (cleanest — no schedules, 48h buffer to Monday deadlines). Saturday 22:00-02:00 spans midnight — acceptable but overlaps with weekly backup at 23:00. No other windows available without moving existing commitments.
      </Agent>
    </>
  )
}

export function ConflictDetectionContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Two teams independently schedule deployments for the same maintenance window. A deadline falls during a blocked period. Nobody notices until the conflict causes a production incident.
      </P>

      <SectionLabel>With conflict detection</SectionLabel>
      <P>
        The agent automatically detects overlapping schedules and deadline collisions <B>at creation time</B>. When you add a new deadline or schedule, it checks against all existing temporal entities and raises conflicts immediately.
      </P>
      <Agent>
        CONFLICT DETECTED: New deployment window (Tuesday 14:00-18:00) overlaps with existing bi-weekly deploy schedule. Also: compliance deadline (Thursday 17:00) falls within a 2-hour buffer zone of the retro (Friday 15:00). Recommend resolving both conflicts before proceeding.
      </Agent>
    </>
  )
}

export function TimelineForksContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You need to decide: migrate the database this weekend, or wait two weeks for a longer maintenance window. The agent can't compare outcomes because it has <B>no way to simulate alternate futures</B>.
      </P>

      <SectionLabel>With timeline forks</SectionLabel>
      <P>
        The agent creates two branches of the current temporal state. In Branch A, the migration happens this weekend (tight 4-hour window, PERT 3.5h). In Branch B, it waits two weeks (8-hour window, but temporal debt compounds at 1.4x). The agent compares outcomes across branches.
      </P>
      <Agent>
        Timeline fork analysis: Branch A (this weekend): 78% confidence of completion within window, 1.2h buffer. Risk: rollback needed if pessimistic scenario. Branch B (2 weeks): 95% confidence, 4.5h buffer. Cost: temporal debt compounds from 1.0x to 2.7x on deferred schema changes. Recommend Branch A with rollback sequence pre-staged.
      </Agent>
    </>
  )
}

export function TemporalDebtContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You defer a schema migration for the third time. Each deferral seems harmless. But the agent doesn't know that the migration now blocks 4 other features, the test environment has drifted further, and the estimated effort has doubled.
      </P>

      <SectionLabel>With temporal debt</SectionLabel>
      <P>
        The agent tracks <B>principal</B> (original effort), <B>interest rate</B> (compounding factor per period), and <B>accumulated debt</B>. After three deferrals at 1.4x compounding, the original 3-hour task now carries <B>8.2 hours of effective cost</B>.
      </P>
      <Agent>
        Temporal debt report: Schema migration (originally 3h) deferred 3 times. Compound rate: 1.4x/deferral. Current effective cost: 8.2h. Blocking 4 downstream features. Accumulated interest: 5.2h of additional work. Recommend immediate payoff — every additional week adds 1.4x to current debt.
      </Agent>
    </>
  )
}

export function ChronoGravityContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A critical deadline is 48 hours away. The agent continues working on a low-priority task because it has no model for how <B>urgency warps priority</B> as deadlines approach.
      </P>

      <SectionLabel>With chrono-gravity</SectionLabel>
      <P>
        As a deadline approaches, its "gravitational pull" increases, automatically escalating the priority of related tasks. The compliance deadline at T-48h pulls the data validation task (a dependency) from priority 3 to <B>priority 1</B>. The agent reprioritizes without being asked.
      </P>
      <Agent>
        Priority warp detected: compliance deadline at T-48h has pulled 3 related tasks into its gravity well. Data validation: priority 3 → 1 (direct dependency). Report formatting: priority 5 → 2 (required for submission). Stakeholder review: priority 4 → 2 (approval gate). Recommend switching from current low-priority task immediately.
      </Agent>
    </>
  )
}

export function TemporalAnomaliesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Someone creates a deadline before its start date. A sequence has a circular dependency. A schedule conflicts with its own recurrence pattern. Without anomaly detection, these <B>temporal paradoxes</B> silently corrupt all downstream reasoning.
      </P>

      <SectionLabel>With anomaly detection</SectionLabel>
      <P>
        The agent validates all temporal entities at creation and periodically during reasoning. It catches: deadlines with due dates before start dates, sequences that loop infinitely, schedules that cannot satisfy their own recurrence constraints, and decay models with invalid parameters.
      </P>
      <Agent>
        ANOMALY DETECTED: 2 temporal paradoxes found. (1) Deadline "Q1 report" has due_at=2026-02-15 but created_at=2026-03-01 — deadline is in the past relative to creation. (2) Sequence "deploy-pipeline" has step 4 depending on step 6 — circular dependency creates infinite loop. Both must be resolved before temporal reasoning can proceed.
      </Agent>
    </>
  )
}

export function AtimeFormatContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Temporal state is scattered across calendar APIs, project management tools, and chat messages. When you switch AI providers, all scheduling context is lost. There is no <B>portable temporal format</B>.
      </P>

      <SectionLabel>With .atime format</SectionLabel>
      <P>
        All temporal entities — deadlines, schedules, sequences, durations, and decay models — are stored in a single binary file with <B>BLAKE3 checksums</B> for integrity verification. Copy the file to another machine, and the agent's entire temporal brain transfers instantly.
      </P>
      <Agent>
        Temporal artifact status: ~/.schedule.atime contains 47 deadlines, 12 recurring schedules, 8 sequences, 23 duration estimates, and 5 decay models. File size: 2.3 MB. BLAKE3 checksum verified. Last modified: 14:32 UTC. Portable to any MCP-compatible runtime.
      </Agent>
    </>
  )
}

export function GhostWriterContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Your temporal context exists only inside one MCP server. When you switch from Claude to Cursor mid-session, the deadlines and schedules don't follow.
      </P>

      <SectionLabel>With Ghost Writer</SectionLabel>
      <P>
        The Ghost Writer runs in the background, syncing temporal state to IDE memory directories every <B>5 seconds</B>. Deadlines, schedules, and active sequences are always available to whichever AI assistant you're currently using.
      </P>
      <Agent>
        Ghost Writer active: syncing to 4 client directories (Claude Desktop, Cursor, Windsurf, Cody). Last sync: 3 seconds ago. Temporal entities synced: 47 deadlines, 12 schedules, 8 sequences. All clients have current temporal context.
      </Agent>
    </>
  )
}

export function MultiLlmContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You've built scheduling workflows with GPT. Now you want to try Claude. Your entire temporal context — deadlines, schedules, decay models — is locked inside GPT's memory.
      </P>

      <SectionLabel>With multi-LLM portability</SectionLabel>
      <P>
        The .atime file is <B>model-agnostic</B>. Load it into any MCP-compatible runtime: Claude today, GPT tomorrow, a local Llama model next week. Your deadlines, schedules, and temporal models belong to your workflow, not your AI vendor.
      </P>
      <Agent>
        Portability check: .atime artifact is compatible with all MCP runtimes. Current session on Claude. Previous sessions: 3 on GPT-4, 2 on local Llama. All temporal entities preserved across provider switches. Zero data loss on migration.
      </Agent>
    </>
  )
}

export function TimeAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: production migration scheduling</SectionLabel>
      <P>
        A database migration needs scheduling. The team has 3 hard deadlines this week, 2 recurring deploy windows, a compliance report due Thursday, and the migration itself has been deferred twice. Without AgenticTime, the agent guesses "this weekend." With it, every temporal dimension is <B>precisely modeled</B>.
      </P>

      <SectionLabel>Deadline analysis</SectionLabel>
      <P>
        3 deadlines within 7 days: compliance report (Thursday, hard, regulatory), feature release (Friday, soft, stakeholder), migration cutoff (Saturday midnight, hard, data integrity). The compliance report has <B>chrono-gravity pulling</B> two dependent tasks to priority 1.
      </P>

      <SectionLabel>Schedule conflicts</SectionLabel>
      <P>
        Tuesday deploy window overlaps with the proposed migration. Saturday backup at 23:00 conflicts with a midnight migration start. Only clean window: <B>Sunday 02:00-06:00 UTC</B>.
      </P>

      <SectionLabel>PERT + temporal debt</SectionLabel>
      <P>
        Migration PERT estimate: optimistic 2h, expected 3.5h, pessimistic 6h. Weighted: 3.7h. This migration has been deferred twice at 1.4x compounding — original 3h effort now carries <B>5.9h of effective cost</B>. Further deferral would push it to 8.3h.
      </P>

      <SectionLabel>Timeline fork decision</SectionLabel>
      <P>
        Fork A (Sunday window): 89% confidence of completion, 0.3h buffer. Fork B (defer to next week): 96% confidence in larger window, but temporal debt compounds to 8.3h. The agent recommends Fork A with <B>rollback sequence pre-staged</B>.
      </P>

      <Agent>
        Migration plan: Sunday 02:00-06:00 UTC. PERT estimate 3.7h within 4h window (89% confidence). Rollback pre-staged at 05:30 checkpoint. Temporal debt payoff: 5.9h → 0h. Compliance report not impacted (due Thursday, 72h buffer). All 3 recurring schedules clear. Zero conflicts detected.
      </Agent>
    </>
  )
}

/* ── Contract ── */

export function PolicyEngineContent() {
  return (
    <>
      <SectionLabel>How policy enforcement works</SectionLabel>
      <P>
        Each policy has a scope (global, session, or agent), an action (allow, deny, or require approval), and optional conditions and tags. When an agent attempts an action, the engine checks all matching policies and returns the most restrictive applicable result.
      </P>
      <Agent>
        policy_check action=&quot;deploy:production&quot; → RequireApproval (policy #7: &quot;production deploys need ops-lead approval&quot;, scope: global, tags: [deploy, production])
      </Agent>
    </>
  )
}

export function RiskLimitsContent() {
  return (
    <>
      <SectionLabel>How risk limits work</SectionLabel>
      <P>
        Risk limits define boundaries agents cannot exceed. Each limit has a type (rate, threshold, budget, count), a current value, and a maximum. The engine tracks usage over configurable time windows and rejects actions that would breach limits.
      </P>
      <Agent>
        risk_limit_check label=&quot;daily-deployments&quot; proposed_usage=1 → Allowed (3/5 used, 2 remaining in 24h window). risk_limit_check label=&quot;api-spend&quot; proposed_usage=150 → Denied (budget: $450/$500, proposed would exceed by $100).
      </Agent>
    </>
  )
}

export function ApprovalWorkflowsContent() {
  return (
    <>
      <SectionLabel>How approval workflows operate</SectionLabel>
      <P>
        Approval rules define which actions need sign-off and from whom. When triggered, the engine creates a request that blocks the action until an authorized party decides. Every approval and denial is recorded with reasons for full audit trails.
      </P>
      <Agent>
        approval_request rule_id=&quot;prod-deploy&quot; action=&quot;deploy v2.3.1 to production&quot; requestor=&quot;deploy-bot-7&quot; → Request #47 created, pending ops-lead decision. approval_decide request_id=#47 approved=true reason=&quot;reviewed changelog, no breaking changes&quot; → Approved.
      </Agent>
    </>
  )
}

export function ObligationTrackingContent() {
  return (
    <>
      <SectionLabel>How obligation tracking works</SectionLabel>
      <P>
        Obligations represent tasks agents must fulfill within deadlines. The engine tracks status transitions (pending → fulfilled / overdue / waived) and surfaces unfulfilled obligations before agents take on new work.
      </P>
      <Agent>
        obligation_check → 2 pending: &quot;post-deploy monitoring&quot; (due in 28 min, assignee: deploy-bot-7), &quot;weekly compliance report&quot; (due Thursday, assignee: audit-agent). 0 overdue.
      </Agent>
    </>
  )
}

export function ViolationDetectionContent() {
  return (
    <>
      <SectionLabel>How violation detection works</SectionLabel>
      <P>
        When an agent breaks a policy or exceeds a risk limit, the violation is recorded with severity (info, warning, critical, fatal), a description, and the triggering policy. Violation lists are queryable by severity, time range, and agent.
      </P>
      <Agent>
        violation_report description=&quot;Agent exceeded daily API budget by $47&quot; severity=&quot;warning&quot; → Violation #12 recorded. violation_list severity=&quot;critical&quot; → 0 critical violations in last 30 days.
      </Agent>
    </>
  )
}

export function ConditionalExecutionContent() {
  return (
    <>
      <SectionLabel>How conditional execution works</SectionLabel>
      <P>
        Conditions gate actions on dynamic state: time windows, metric thresholds, dependency completion, or custom expressions. The engine evaluates conditions in real time, allowing or blocking actions based on current context.
      </P>
      <Agent>
        condition_evaluate condition_id=&quot;business-hours-only&quot; → Met (current time 14:32 UTC, window 09:00-18:00 UTC). condition_evaluate condition_id=&quot;staging-passed&quot; → Not met (staging deploy still pending).
      </Agent>
    </>
  )
}

export function ContractSigningContent() {
  return (
    <>
      <SectionLabel>How contract signing works</SectionLabel>
      <P>
        Contracts formalize agreements between agents. Each party signs the contract to indicate acceptance. The signature chain is verifiable, and contracts can be checked for validity, expiration, and completeness.
      </P>
      <Agent>
        contract_create title=&quot;Deploy Collaboration Agreement&quot; parties=[&quot;deploy-bot-7&quot;, &quot;monitor-agent-3&quot;] → Contract #8 created. contract_sign contract_id=#8 → Signed by deploy-bot-7. contract_verify contract_id=#8 → Valid, 1/2 signatures collected.
      </Agent>
    </>
  )
}

export function SelfHealingContractsContent() {
  return (
    <>
      <SectionLabel>How self-healing contracts work</SectionLabel>
      <P>
        When a violation is detected, the self-healing engine analyzes the pattern and automatically adjusts governance: tightening policies, lowering risk limits, or adding monitoring conditions. Governance evolves from incidents without manual intervention.
      </P>
      <Agent>
        Violation #12 triggered self-healing: daily API budget limit reduced from $500 to $400 (20% safety margin). New condition added: &quot;api-spend-alert&quot; triggers at 80% budget utilization. Policy updated: &quot;high-cost API calls require approval above $50&quot;.
      </Agent>
    </>
  )
}

export function SmartEscalationContent() {
  return (
    <>
      <SectionLabel>How smart escalation works</SectionLabel>
      <P>
        When an approval request is created, the escalation engine analyzes historical patterns: who approved similar requests, response times, current availability, and authority scope. It routes to the optimal approver to minimize latency.
      </P>
      <Agent>
        smart_escalation_route request_id=#47 → Routing to ops-lead-2 (93% approval rate for deploy requests, avg response: 4 min, currently active). Backup: ops-lead-1 (available in 45 min). Estimated approval likelihood: 87%.
      </Agent>
    </>
  )
}

export function ViolationArchaeologyContent() {
  return (
    <>
      <SectionLabel>How violation archaeology works</SectionLabel>
      <P>
        Rather than treating each violation individually, archaeology analyzes the full violation history to find clusters, recurring patterns, and root causes. It identifies systemic governance gaps that point fixes miss.
      </P>
      <Agent>
        violation_archaeology_analyze → Pattern detected: 73% of API budget violations occur between 14:00-16:00 UTC (batch processing window). Root cause: batch jobs lack budget awareness. Recommendation: add rate limiting to batch scheduler, reduce per-job budget allocation by 30%.
      </Agent>
    </>
  )
}

export function TemporalContractsContent() {
  return (
    <>
      <SectionLabel>How temporal contracts work</SectionLabel>
      <P>
        Temporal contracts define governance that evolves on schedule. Phase transitions move from strict to relaxed policies as trust builds, or from development to production governance at launch. Each phase has its own policy set, limits, and approval requirements.
      </P>
      <Agent>
        temporal_contract_create → Phase 1 (weeks 1-2): all actions require approval, budget limit $100/day. Phase 2 (weeks 3-4): routine actions auto-approved, budget limit $300/day. Phase 3 (steady state): only critical actions need approval, budget limit $500/day.
      </Agent>
    </>
  )
}

export function AconFormatContent() {
  return (
    <>
      <SectionLabel>How the .acon format works</SectionLabel>
      <P>
        The .acon binary format stores all governance state: policies, risk limits, approval rules/requests/decisions, conditions, obligations, violations, and contracts. BLAKE3 checksums ensure integrity. One file captures the complete governance context.
      </P>
      <Agent>
        contract_stats → 12 policies (8 active), 5 risk limits, 47 approval requests (43 decided), 6 obligations (2 pending), 3 violations, 8 contracts. File size: 24.7 KB. BLAKE3 checksum verified.
      </Agent>
    </>
  )
}

export function ContractMultiLlmContent() {
  return (
    <>
      <SectionLabel>How multi-LLM portability works</SectionLabel>
      <P>
        The .acon file is platform-agnostic. The same governance policies, risk limits, and approval workflows work whether the agent runs on Claude, GPT, Gemini, or any MCP-compatible runtime. Your governance belongs to your workflow, not your vendor.
      </P>
      <Agent>
        Same .acon file → Claude enforces deploy:production approval. GPT respects daily budget limits. Gemini checks obligation deadlines. All three share the same governance context, violation history, and approval records.
      </Agent>
    </>
  )
}

export function ContractAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: governed production deployment</SectionLabel>
      <P>
        An agent wants to deploy v2.3.1 to production. Without AgenticContract, it just deploys — no policy check, no risk limit, no approval. With it, every governance dimension is <B>enforced before the action happens</B>.
      </P>

      <SectionLabel>Policy check</SectionLabel>
      <P>
        The engine checks all matching policies. Policy #7 (scope: global, tags: deploy, production) requires ops-lead approval. The action is <B>blocked until approved</B>.
      </P>

      <SectionLabel>Risk limit check</SectionLabel>
      <P>
        Daily deployment budget: 3 of 5 used. This deployment would bring it to 4/5 — within limits. API cost estimate: $23, within the $500 daily budget. <B>Both limits pass</B>.
      </P>

      <SectionLabel>Approval routing</SectionLabel>
      <P>
        Smart escalation routes to ops-lead-2 (93% approval rate, 4 min avg response). Request #47 created with full context: changelog, test results, risk assessment. Approved in <B>3 minutes</B>.
      </P>

      <SectionLabel>Obligation creation</SectionLabel>
      <P>
        Post-deploy obligations auto-created: monitoring for 30 minutes (hard deadline), smoke test within 10 minutes (hard deadline), deployment report within 2 hours (soft deadline). Agent <B>tracks all three</B>.
      </P>

      <Agent>
        Deployment v2.3.1 → Policy: approved (request #47, ops-lead-2). Risk: 4/5 daily deploys, $23/$500 budget. Obligations: 3 created (monitoring 30m, smoke test 10m, report 2h). Violations: 0. Contract #8 fulfilled. Governance state saved to .acon.
      </Agent>
    </>
  )
}

/* ─────────────────────────────── COMM ── */

export function ChannelTopologyContent() {
  return (
    <>
      <SectionLabel>Channel types</SectionLabel>
      <P>
        AgenticComm supports four channel topologies out of the box: <B>direct</B> (1:1 between two agents), <B>group</B> (named multi-party), <B>broadcast</B> (one-to-all with no reply), and <B>pub/sub</B> (topic-based subscription). Each channel is a first-class object with an ID, participant list, and creation timestamp.
      </P>

      <SectionLabel>Participant boundaries</SectionLabel>
      <P>
        Every channel enforces explicit membership. An agent cannot read messages from a channel it has not joined. Join/leave events are recorded in the channel history, making <B>participant state auditable at any point in time</B>.
      </P>

      <Agent>
        Channel created → id: ch-feature-auth, type: group, participants: [planner, developer, reviewer]. Topology: group. Join events: 3 recorded. Channel state saved to .acomm artifact.
      </Agent>
    </>
  )
}

export function TypedMessagesContent() {
  return (
    <>
      <SectionLabel>Message types</SectionLabel>
      <P>
        Every message carries a <B>type field</B> that declares operational intent: <B>command</B> (do this), <B>query</B> (answer this), <B>response</B> (here is the answer), <B>notification</B> (FYI), and <B>acknowledgment</B> (received). Agents can pattern-match on type to decide how to handle each message without parsing content.
      </P>

      <SectionLabel>Payload structure</SectionLabel>
      <P>
        Message payloads are structured data, not raw strings. Each message includes sender, timestamp, channel, type, and a typed payload field. This means agents can <B>deserialize and validate messages at the protocol level</B> rather than guessing at format.
      </P>

      <Agent>
        Message sent → channel: task-queue, type: command, sender: planner, payload: &#123;task: &quot;build login form&quot;, priority: 1, criteria: [&quot;OAuth support&quot;, &quot;session management&quot;]&#125;. Acknowledged by developer in 0.02 ms.
      </Agent>
    </>
  )
}

export function DeliverySemanticsContent() {
  return (
    <>
      <SectionLabel>Ordering guarantees</SectionLabel>
      <P>
        Messages within a channel are <B>strictly ordered by sequence number</B>. An agent reading from a channel always sees messages in the order they were sent. Cross-channel ordering uses timestamps for correlation when needed.
      </P>

      <SectionLabel>Acknowledgment and retry</SectionLabel>
      <P>
        Commands and queries can require acknowledgment. If no ack arrives within a configurable timeout, the sender can retry or escalate. <B>Dead-letter handling</B> captures undeliverable messages so no communication is silently lost.
      </P>

      <Agent>
        Delivery report → channel: task-queue, messages: 3, all acknowledged. Sequence: [1, 2, 3] contiguous. Retries: 0. Dead letters: 0. Delivery latency p99: 0.04 ms.
      </Agent>
    </>
  )
}

export function SessionCoordinationContent() {
  return (
    <>
      <SectionLabel>Session-linked communication</SectionLabel>
      <P>
        Communication actions are automatically linked to the active session. When a session starts, a <B>session context marker</B> is inserted into each active channel. When the session ends, all messages sent during that session can be queried as a unit.
      </P>

      <SectionLabel>Audit trail</SectionLabel>
      <P>
        Operators can reconstruct exactly what happened in a session: which channels were active, who sent what, and how the conversation flowed. This is <B>built into the protocol</B>, not bolted on after the fact.
      </P>

      <Agent>
        Session #42 summary → Duration: 14.2s. Channels active: 3. Messages sent: 8. Messages received: 12. Acknowledgments: 8/8 (100%). Session context preserved in .acomm artifact.
      </Agent>
    </>
  )
}

export function SearchAndHistoryContent() {
  return (
    <>
      <SectionLabel>Full-text search</SectionLabel>
      <P>
        Every message in the .acomm artifact is indexed for <B>full-text search</B>. Agents can search by channel, sender, time range, message type, or content pattern. Results return in sub-millisecond time even across thousands of messages.
      </P>

      <SectionLabel>History reconstruction</SectionLabel>
      <P>
        The full communication history is preserved in sequence order. An operator can <B>replay the exact conversation flow</B> that led to any production decision, without relying on transient chat logs or cloud services.
      </P>

      <Agent>
        Search results → query: &quot;login form&quot;, matches: 4 messages across 2 channels. Oldest: 2.3s ago (planner → task-queue). Most recent: 0.8s ago (developer → review-queue). All results include full context chain.
      </Agent>
    </>
  )
}

export function PortableArtifactContent() {
  return (
    <>
      <SectionLabel>Single-file portability</SectionLabel>
      <P>
        The entire communication state — channels, messages, indexes, participant lists, and integrity checksums — lives in <B>one .acomm file</B>. Copy the file to a new environment and the coordination context moves with it. No database, no cloud service, no external dependencies.
      </P>

      <SectionLabel>Integrity verification</SectionLabel>
      <P>
        The .acomm format includes checksums for structural integrity. On load, the runtime verifies that <B>no messages have been tampered with or lost</B>. Corruption is detected before any agent reads stale or incomplete state.
      </P>

      <Agent>
        Artifact stats → file: agents.acomm, size: 4.2 KB. Channels: 3. Messages: 12. Indexes: 3 (by-channel, by-sender, by-time). Integrity: verified, 0 errors. Portable: yes, zero external dependencies.
      </Agent>
    </>
  )
}

export function CommAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: multi-agent feature pipeline</SectionLabel>
      <P>
        A team of three agents needs to coordinate building a feature: a planner breaks down work, a developer implements, and a reviewer validates. Without AgenticComm, they pass files around with no structure. With it, every handoff flows through <B>named channels with typed messages</B>.
      </P>

      <SectionLabel>Channel setup</SectionLabel>
      <P>
        The planner creates three channels: &quot;task-queue&quot; for work items, &quot;review-queue&quot; for completed work, and &quot;status&quot; for broadcasts. Each agent subscribes to its input channel. Setup takes <B>0.08 ms total</B>.
      </P>

      <SectionLabel>Task delegation</SectionLabel>
      <P>
        The planner sends three task messages to &quot;task-queue&quot;: build the login form, add validation, write tests. Each message includes context, acceptance criteria, and priority. The developer receives all three in <B>0.01 ms</B>.
      </P>

      <SectionLabel>Work handoff</SectionLabel>
      <P>
        As the developer completes each task, it sends a completion message to &quot;review-queue&quot; with the implementation summary. The reviewer picks up each item, validates, and sends feedback. All handoffs are <B>ordered and searchable</B>.
      </P>

      <SectionLabel>Status broadcasting</SectionLabel>
      <P>
        On completion, the reviewer broadcasts &quot;Feature complete: all 3 tasks implemented and approved&quot; to all channels. Every agent sees the final status. The entire communication history is <B>preserved in a single .acomm file</B>.
      </P>

      <Agent>
        Pipeline complete → Channels: 3 (task-queue, review-queue, status). Messages: 12 total. Subscriptions: 3. Total coordination time: 0.15 ms. Full history searchable. Artifact: agents.acomm (4.2 KB).
      </Agent>
    </>
  )
}

/* ─────────────────────────────── PLANNING ── */

export function GoalGraphContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        An agent is asked to &quot;improve the checkout flow.&quot; Without a goal structure, it picks the first thing it thinks of — maybe faster load times, maybe better error messages, maybe a redesign. There is no way to know if it chose the <B>highest-impact objective</B> or just the first one that came to mind.
      </P>

      <SectionLabel>With AgenticPlanning</SectionLabel>
      <P>
        The agent creates a goal graph: &quot;Improve checkout flow&quot; as the parent, with three sub-goals ranked by priority — reduce cart abandonment (0.95), add guest checkout (0.8), and improve error feedback (0.6). Dependencies are explicit: guest checkout <B>requires</B> a new auth flow, which blocks the error feedback work.
      </P>

      <Agent>
        Goal graph → root: &quot;Improve checkout flow&quot;. Sub-goals: 3. Top priority: &quot;Reduce cart abandonment&quot; (0.95). Dependency chain: guest-checkout → new-auth-flow → error-feedback. Conflict: none. Next action: start with highest-priority unblocked goal.
      </Agent>
    </>
  )
}

export function DecisionRecordsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Three sessions ago, the agent chose React over Vue for a new component. Now a different agent is extending that component and asks <B>why React was chosen</B>. Without a decision record, the reasoning is lost — it might have been performance benchmarks, team familiarity, or ecosystem compatibility.
      </P>

      <SectionLabel>With AgenticPlanning</SectionLabel>
      <P>
        Every strategic decision is recorded with the choice made, alternatives considered, rationale, and confidence level. The second agent queries the decision log and finds: &quot;React chosen over Vue — rationale: team has 3 years React experience, existing component library is React-based, <B>performance delta was negligible</B>.&quot;
      </P>

      <Agent>
        Decision #42 → choice: React. Alternatives: [Vue, Svelte]. Rationale: team expertise (3yr), existing component library compatibility. Confidence: 0.88. Recorded: session 7. Status: active, no superseding decision.
      </Agent>
    </>
  )
}

export function CommitmentTrackingContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        An agent promises to &quot;finish the API integration by Friday.&quot; By Monday, nobody remembers the commitment. The user asks what happened and the agent has <B>no record of ever making that promise</B>.
      </P>

      <SectionLabel>With AgenticPlanning</SectionLabel>
      <P>
        Commitments are first-class objects with an owner, deadline, deliverable description, and status. When the agent says &quot;I will finish the API integration by Friday,&quot; that becomes a tracked commitment. Status updates flow automatically as progress is made, and <B>missed deadlines are flagged</B>.
      </P>

      <Agent>
        Commitment #18 → deliverable: &quot;Complete Stripe API integration.&quot; Owner: agent-dev-3. Deadline: 2026-03-07. Status: in-progress (60%). Dependencies: [auth-flow complete]. Risk: medium — auth-flow delayed by 1 day.
      </Agent>
    </>
  )
}

export function ProgressSignalsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        A user asks &quot;how far along is the migration?&quot; The agent has no structured progress data. It guesses: &quot;I think we are about halfway done.&quot; There is <B>no objective measurement</B>.
      </P>

      <SectionLabel>With AgenticPlanning</SectionLabel>
      <P>
        Progress is tracked against explicit criteria defined in the goal. Each sub-goal has measurable completion signals. The agent reports: &quot;Migration is 65% complete — 13 of 20 tables migrated, 4 API endpoints updated out of 7, <B>test coverage at 82%</B> of target.&quot;
      </P>

      <Agent>
        Progress → goal: &quot;Database migration.&quot; Overall: 65%. Sub-signals: tables (13/20), endpoints (4/7), test coverage (82%). Blockers: 1 (legacy schema incompatibility on users table). ETA: 2 sessions at current velocity.
      </Agent>
    </>
  )
}

export function PlanningSessionsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        An agent makes a critical priority change in session 14, but by session 17, nobody remembers <B>when or why the priority shifted</B>. The context is lost in the conversation history.
      </P>

      <SectionLabel>With AgenticPlanning</SectionLabel>
      <P>
        Every planning action is linked to the session that produced it. The context log records why a goal was created, a priority changed, or a commitment was made. Operators can audit: &quot;Session 14 deprioritized caching goal because <B>deadline pressure on auth goal increased</B>.&quot;
      </P>

      <Agent>
        Context log → session 14: deprioritized goal #7 (caching) from 0.8 → 0.4. Reason: goal #3 (auth) deadline moved up by 2 days. Decision #51 recorded. Commitment #18 unaffected.
      </Agent>
    </>
  )
}

export function AplanArtifactContent() {
  return (
    <>
      <SectionLabel>Single-file portability</SectionLabel>
      <P>
        The entire planning state — goals, decisions, commitments, progress signals, and session links — lives in <B>one .aplan file</B>. Copy the file to a new environment and the strategic context moves with it. No database, no cloud service, no external dependencies.
      </P>

      <SectionLabel>Integrity verification</SectionLabel>
      <P>
        The .aplan format includes checksums for structural integrity. On load, the runtime verifies that <B>no goals or decisions have been tampered with or lost</B>. Corruption is detected before any agent reads stale or incomplete state.
      </P>

      <Agent>
        Artifact stats → file: project.aplan, size: 3.8 KB. Goals: 5. Decisions: 12. Commitments: 4. Progress entries: 18. Integrity: verified, 0 errors. Portable: yes, zero external dependencies.
      </Agent>
    </>
  )
}

export function PlanningAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: conflicting priorities sprint</SectionLabel>
      <P>
        A product team has three competing priorities: ship a new auth system (hard deadline), refactor the database layer (tech debt), and add a caching layer (performance). Without AgenticPlanning, the agent picks one and hopes it is right. With it, every trade-off flows through <B>a structured goal graph with recorded decisions</B>.
      </P>

      <SectionLabel>Goal creation</SectionLabel>
      <P>
        The agent creates three goals with priorities: auth (0.95, hard deadline), database refactor (0.7, blocks caching), and caching (0.6, depends on refactor). The dependency chain is explicit. Setup takes <B>one planning call</B>.
      </P>

      <SectionLabel>Decision recording</SectionLabel>
      <P>
        The agent records decision #1: &quot;Defer caching until after auth ships. Rationale: auth has a hard deadline in 48 hours, caching is blocked by DB refactor anyway.&quot; The decision includes alternatives considered and <B>confidence level (0.92)</B>.
      </P>

      <SectionLabel>Commitment and progress</SectionLabel>
      <P>
        The agent commits to completing auth in 2 days. Progress signals update as work proceeds: endpoint 1/4 done, tests passing, integration pending. At 75% completion, the agent broadcasts status and <B>re-evaluates remaining goals</B>.
      </P>

      <SectionLabel>Post-sprint review</SectionLabel>
      <P>
        After auth ships, the agent reviews the goal graph: auth complete, DB refactor now unblocked, caching can begin. The full decision chain shows why caching was deferred and <B>when it became actionable</B>. Everything is preserved in a single .aplan file.
      </P>

      <Agent>
        Sprint complete → Goals: 3 (1 complete, 2 active). Decisions: 3 recorded. Commitments: 1 fulfilled on time. Progress entries: 8. Decision chain intact. Artifact: project.aplan (3.8 KB).
      </Agent>
    </>
  )
}

/* ─────────────────────────────── COGNITION ── */

export function ReasoningChainsContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        You ask the agent to diagnose a production outage. It returns: &quot;The database is likely the bottleneck.&quot; <B>Why?</B> What evidence supports that conclusion? What alternatives did it consider? Without reasoning chains, the agent&apos;s thinking is a black box — you get an answer but no way to evaluate the path that produced it.
      </P>

      <SectionLabel>With reasoning chains</SectionLabel>
      <P>
        The agent constructs an explicit chain: Premise 1 (&quot;CPU is at 12%, not bottlenecked&quot;), Premise 2 (&quot;P99 latency spiked from 40ms to 1,200ms&quot;), Premise 3 (&quot;Slow query log shows 47 queries exceeding 500ms&quot;), Inference (&quot;Database query performance is the primary bottleneck&quot;). Each step carries a <B>confidence score</B> that propagates through the chain.
      </P>
      <Agent>
        Reasoning chain (4 steps, confidence 0.91): CPU idle (fact, 0.98) + latency spike (fact, 0.97) + slow query log (fact, 0.95) → database bottleneck (inference, 0.91). Alternative considered: network saturation (rejected, confidence 0.23 — packet loss at 0.01%).
      </Agent>
    </>
  )
}

export function HypothesisEvaluationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        Users report intermittent 500 errors. The agent picks the first plausible explanation — maybe a memory leak — and pursues it for two hours. It turns out to be a <B>connection pool exhaustion issue</B>. Without hypothesis evaluation, the agent locks onto one explanation and ignores competing theories.
      </P>

      <SectionLabel>With hypothesis evaluation</SectionLabel>
      <P>
        The agent generates three hypotheses: memory leak (evidence weight 0.35), connection pool exhaustion (evidence weight 0.82), and DNS resolution timeout (evidence weight 0.18). Each hypothesis is scored against 5 pieces of evidence. Connection pool exhaustion ranks highest because it explains both the <B>intermittent pattern and the correlation with traffic spikes</B>.
      </P>
      <Agent>
        Hypothesis evaluation → 3 candidates. Winner: connection pool exhaustion (score 0.82, explains 4/5 observations). Runner-up: memory leak (0.35, explains 2/5). Rejected: DNS timeout (0.18, contradicted by latency profile). Recommendation: increase pool size from 25 to 100.
      </Agent>
    </>
  )
}

export function CognitiveStrategiesContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent always reasons the same way regardless of the problem type. A logic puzzle, a creative brainstorm, and a root cause analysis all get the same <B>undifferentiated chain-of-thought</B>. There is no selection of reasoning approach based on the nature of the problem.
      </P>

      <SectionLabel>With cognitive strategies</SectionLabel>
      <P>
        The agent selects from typed reasoning modes. For the outage diagnosis, it uses <B>abductive reasoning</B> (best explanation from observations). For the architecture review, it uses <B>deductive reasoning</B> (applying known principles to specific cases). For the unfamiliar API, it uses <B>analogical reasoning</B> (mapping from a known similar system). Each strategy is recorded in the cognitive log.
      </P>
      <Agent>
        Strategy selected: abductive (inference to best explanation). Rationale: problem presents symptoms without known cause. Alternative strategies considered: deductive (insufficient axioms), decomposition (problem is singular, not composite). Strategy recorded in cognitive log for replay.
      </Agent>
    </>
  )
}

export function SelfEvaluationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent concludes that &quot;Service A caused the outage because Service B depends on it.&quot; But the reasoning is circular — it assumed Service A was the cause to explain why Service B failed, then used Service B&apos;s failure as evidence that Service A was the cause. Without self-evaluation, <B>circular reasoning goes undetected</B>.
      </P>

      <SectionLabel>With self-evaluation</SectionLabel>
      <P>
        After completing a reasoning chain, the agent runs a metacognitive audit. It checks for: circular dependencies between premises and conclusions, <B>unsupported leaps</B> (conclusions that skip evidence steps), confidence inflation (high confidence on thin evidence), and missing counter-evidence. The circular argument is flagged in <B>under 2 milliseconds</B>.
      </P>
      <Agent>
        Self-evaluation audit → 1 issue found: circular reasoning detected. Step 3 (&quot;Service A caused failure&quot;) uses Step 5 (&quot;Service B failed&quot;) as evidence, but Step 5 assumes Step 3. Recommendation: gather independent evidence for Service A failure before concluding causation.
      </Agent>
    </>
  )
}

export function ConfidenceCalibrationContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent says it is &quot;95% confident&quot; in its diagnosis. But over the last 20 diagnoses where it claimed 95% confidence, it was <B>correct only 60% of the time</B>. Without calibration tracking, overconfidence is invisible and operators cannot trust the agent&apos;s uncertainty estimates.
      </P>

      <SectionLabel>With confidence calibration</SectionLabel>
      <P>
        The cognition layer tracks predicted confidence vs actual outcomes across sessions. A calibration curve reveals the drift: at the 0.90-0.95 band, actual accuracy is <B>0.62</B>. The agent&apos;s confidence estimates are automatically adjusted using the historical calibration data.
      </P>
      <Agent>
        Calibration report → 142 predictions tracked. Band 0.90-0.95: predicted accuracy 92%, actual accuracy 62% (overconfident by 30 points). Band 0.70-0.80: predicted 75%, actual 73% (well-calibrated). Adjustment applied: current 0.95 prediction recalibrated to 0.64.
      </Agent>
    </>
  )
}

export function CognitiveLoadContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent is simultaneously reasoning about a database migration, an API redesign, and a security audit. It starts mixing up facts from different problems — the migration deadline appears in the security audit reasoning, and the API rate limits get confused with database connection limits. <B>Too many open threads degrade reasoning quality.</B>
      </P>

      <SectionLabel>With cognitive load management</SectionLabel>
      <P>
        The cognition layer enforces working memory limits. When the agent exceeds <B>5 active reasoning threads</B>, the oldest or lowest-priority thread is archived to persistent storage. The archived thread can be recalled when needed, but it does not compete for active reasoning bandwidth.
      </P>
      <Agent>
        Cognitive load → 5/5 active threads (limit reached). Archived: &quot;API redesign analysis&quot; (lowest priority, 0.4). Active: database migration (0.95), security audit (0.88), incident response (0.92), deployment planning (0.75), test coverage analysis (0.60). Recall &quot;API redesign&quot; when a slot opens.
      </Agent>
    </>
  )
}

export function ThoughtProvenanceContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        The agent recommends &quot;switch to Redis for session storage.&quot; Three weeks later, a different agent asks <B>where that recommendation came from</B>. Without thought provenance, the conclusion exists without any trace of its origins. It might have been based on a benchmark, a blog post, or a misremembered conversation.
      </P>

      <SectionLabel>With thought provenance</SectionLabel>
      <P>
        Every conclusion links to its source evidence through a provenance chain. The Redis recommendation traces back to: benchmark data (session 4), latency requirements (session 2), and a comparison of Redis vs Memcached vs DynamoDB (session 5). The full chain is traversable in <B>under 3 milliseconds</B>.
      </P>
      <Agent>
        Provenance for &quot;switch to Redis&quot; → 3 sources: benchmark showing Redis at 0.3ms vs Memcached at 0.8ms (session 4, confidence 0.94), latency requirement of sub-1ms (session 2, confidence 0.99), feature comparison showing Redis pub/sub advantage (session 5, confidence 0.87). Full chain: 7 nodes, 6 edges.
      </Agent>
    </>
  )
}

export function ReasoningReplayContent() {
  return (
    <>
      <SectionLabel>The problem today</SectionLabel>
      <P>
        An agent made an architectural decision in session 8 that is now causing problems in session 22. You need to understand <B>what the agent was thinking at the time</B> — not its current post-hoc rationalization, but the actual reasoning that led to the decision when it was made.
      </P>

      <SectionLabel>With reasoning replay</SectionLabel>
      <P>
        The cognitive log preserves every reasoning step in sequence. Replaying session 8 shows the agent considered three architectures, evaluated each against four criteria, and chose a monolith because <B>the team was 2 people at the time</B>. The reasoning was sound for the original context — it just didn&apos;t anticipate the team growing to 15.
      </P>
      <Agent>
        Replay session 8 reasoning → Strategy: deductive. Premises: team size 2, deadline 3 weeks, no microservice experience. Evaluation: monolith (score 0.88), modular monolith (0.72), microservices (0.31). Decision: monolith. Note: team size premise has since changed (now 15). Recommend re-evaluation with updated premises.
      </Agent>
    </>
  )
}

export function AcogArtifactContent() {
  return (
    <>
      <SectionLabel>Single-file portability</SectionLabel>
      <P>
        The entire cognition state — reasoning chains, hypotheses, strategies, metacognitive audits, calibration data, and cognitive load state — lives in <B>one .acog file</B>. Copy the file to a new environment and the reasoning context moves with it. No database, no cloud service, no external dependencies.
      </P>

      <SectionLabel>Integrity verification</SectionLabel>
      <P>
        The .acog format includes checksums for structural integrity. On load, the runtime verifies that <B>no reasoning chains or hypotheses have been tampered with or lost</B>. Corruption is detected before any agent reads stale or incomplete cognitive state.
      </P>

      <Agent>
        Artifact stats → file: project.acog, size: 5.2 KB. Reasoning chains: 18. Hypotheses evaluated: 7. Strategies used: 4. Self-evaluations: 12. Calibration entries: 142. Integrity: verified, 0 errors. Portable: yes, zero external dependencies.
      </Agent>
    </>
  )
}

export function CognitionAllTogetherContent() {
  return (
    <>
      <SectionLabel>End-to-end: diagnosing a cascading production failure</SectionLabel>
      <P>
        A production system experiences cascading failures across three services. Without AgenticCognition, the agent guesses at root causes and hopes for the best. With it, every step of the diagnosis flows through <B>structured reasoning with hypothesis evaluation and self-correction</B>.
      </P>

      <SectionLabel>Strategy selection</SectionLabel>
      <P>
        The agent selects abductive reasoning — inference to the best explanation from observed symptoms. It logs the strategy choice: &quot;Symptoms without known cause, multiple possible explanations.&quot; Strategy selection takes <B>0.4 ms</B>.
      </P>

      <SectionLabel>Hypothesis generation</SectionLabel>
      <P>
        Three hypotheses emerge: database connection pool exhaustion (initial evidence weight 0.45), cascading timeout propagation (0.62), and memory pressure from a leaked goroutine (0.28). Each hypothesis links to <B>specific observational evidence</B>.
      </P>

      <SectionLabel>Self-evaluation and correction</SectionLabel>
      <P>
        The metacognitive audit catches a gap: the timeout hypothesis assumed Service B calls Service C synchronously, but the actual call is async. Confidence drops from 0.62 to 0.38. Connection pool exhaustion rises to <B>top-ranked hypothesis (0.71)</B> after the correction.
      </P>

      <SectionLabel>Resolution and calibration</SectionLabel>
      <P>
        The diagnosis is confirmed: connection pool exhaustion was the root cause. The calibration tracker records the outcome. The full reasoning chain, hypothesis evaluations, and self-correction are <B>preserved in a single .acog file</B> for future reference.
      </P>

      <Agent>
        Diagnosis complete → Strategy: abductive. Hypotheses evaluated: 3. Winner: connection pool exhaustion (final confidence 0.71, confirmed). Self-corrections: 1 (async call assumption). Calibration updated. Reasoning chain: 14 steps. Artifact: incident.acog (5.2 KB).
      </Agent>
    </>
  )
}
