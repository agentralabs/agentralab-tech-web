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

export const IDENTITY_HERO = {
  title: "AgenticIdentity",
  subtitle: "What happens when every AI agent action is cryptographically signed, every trust grant is scoped, and every audit trail is tamper-evident?",
  artifact: ".aid",
}

export const IDENTITY_SCENARIOS: ScenarioGroup[] = [
  {
    label: "Core Cryptographic",
    items: [
      {
        id: "identity-anchors",
        title: "Identity Anchors",
        hook: "Ed25519 key pairs that uniquely identify each agent — deterministic, portable, and verifiable.",
        plainTerms:
          "An identity anchor is like a passport for your AI agent. It is a cryptographic key pair that proves who the agent is. Anyone with the public key can verify the agent's identity without needing to trust any central authority.",
        content: null,
      },
      {
        id: "action-receipts",
        title: "Action Receipts",
        hook: "Every operation produces a signed record — tamper-evident, timestamped, and chainable.",
        plainTerms:
          "Action receipts are like notarized records of everything the agent does. Each receipt is signed with the agent's private key, so anyone can verify it really happened, when it happened, and that nobody tampered with the record.",
        content: null,
      },
      {
        id: "receipt-chains",
        title: "Receipt Chains",
        hook: "Ordered, hash-linked sequences of receipts forming complete audit trails.",
        plainTerms:
          "Receipt chains are like a tamper-evident ledger. Each receipt links to the previous one by hash, so if anyone changes or removes a record in the middle, the entire chain breaks visibly. You get a complete, verifiable history of agent actions.",
        content: null,
      },
      {
        id: "key-derivation",
        title: "Key Derivation",
        hook: "Hierarchical child keys for isolated subsystem identities — one master anchor, many scoped children.",
        plainTerms:
          "Key derivation is like giving your agent department-specific ID badges derived from one master credential. The deploy subsystem gets its own key, the monitoring subsystem gets another, but they all trace back to the same root identity.",
        content: null,
      },
    ],
  },
  {
    label: "Trust and Delegation",
    items: [
      {
        id: "trust-grants",
        title: "Trust Grants",
        hook: "Scoped, time-limited delegation from one identity anchor to another.",
        plainTerms:
          "Trust grants are like writing a power of attorney with very specific limits. You grant deploy-bot permission to deploy to staging but not production, and the grant expires in 24 hours. If the agent tries anything outside scope, the signature won't validate.",
        content: null,
      },
      {
        id: "trust-delegation",
        title: "Trust Delegation",
        hook: "Multi-hop delegation chains where trust flows through intermediaries — all verifiable.",
        plainTerms:
          "Trust delegation is like a chain of command. The CTO trusts the ops lead, the ops lead trusts the deploy bot. Each hop is a signed grant, and anyone can verify the full chain from the bot back to the CTO without asking any of them directly.",
        content: null,
      },
      {
        id: "trust-revocation",
        title: "Trust Revocation",
        hook: "Instant revocation of trust grants — the delegated agent loses access immediately.",
        plainTerms:
          "Trust revocation is like revoking a security badge. The moment you revoke, the agent's grants stop validating. No waiting for expiry, no hoping the agent checks back. The cryptographic proof simply stops being valid.",
        content: null,
      },
    ],
  },
  {
    label: "Verification and Portability",
    items: [
      {
        id: "receipt-verification",
        title: "Receipt Verification",
        hook: "Verify any receipt with only the public key — no network, no authority, no trust assumptions.",
        plainTerms:
          "Receipt verification is like checking a notary stamp. You only need the public key to verify that a receipt is authentic, unmodified, and signed by the claimed agent. No server, no API call, no central authority required.",
        content: null,
      },
      {
        id: "multi-llm-portability",
        title: "Multi-LLM Portability",
        hook: "The same .aid artifact works across Claude, GPT, Gemini, and any MCP-compatible runtime.",
        plainTerms:
          "Multi-LLM portability means your agent's identity isn't locked to one AI vendor. The same .aid file works with Claude today and GPT tomorrow. The cryptographic identity belongs to the agent, not the platform it happens to run on.",
        content: null,
      },
      {
        id: "aid-file-format",
        title: ".aid File Format",
        hook: "One portable file containing anchor, trust grants, and receipt history.",
        plainTerms:
          "The .aid file is like a portable identity wallet. It contains the agent's key pair, all trust grants it holds, and its complete receipt history. Copy it to another machine, and the agent's full identity and audit trail come with it.",
        content: null,
      },
    ],
  },
  {
    label: "Security and Safety",
    items: [
      {
        id: "encrypted-at-rest",
        title: "Encrypted at Rest",
        hook: "AES-256-GCM encryption for .aid files — private keys never stored in plaintext.",
        plainTerms:
          "Encrypted at rest means the .aid file is locked with AES-256-GCM encryption when saved to disk. Even if someone copies the file, they cannot extract the private key or forge receipts without the encryption passphrase.",
        content: null,
      },
      {
        id: "identity-parameter-safety",
        title: "Identity Parameter Safety",
        hook: "Compile-time guarantees that identity parameters cannot be confused or misused.",
        plainTerms:
          "Parameter safety means the system makes it structurally impossible to accidentally use a public key where a private key is expected, or mix up an anchor ID with a receipt ID. Type safety catches identity misuse at compile time, not in production.",
        content: null,
      },
    ],
  },
]
