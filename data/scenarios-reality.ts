import * as SC from "@/components/scenario-content";

export const REALITY_HERO = {
  title: "AgenticReality",
  subtitle:
    "Existential grounding — deployment consciousness, resource awareness, and reality physics for AI agents",
  artifact: ".areal",
};

export const REALITY_SCENARIOS = [
  {
    title: "Deployment Consciousness",
    items: [
      {
        id: "deployment-soul",
        label: "Deployment Soul",
        content: SC.DeploymentSoulContent,
      },
      {
        id: "environment-sensing",
        label: "Environment Sensing",
        content: SC.EnvironmentSensingContent,
      },
      {
        id: "context-fingerprint",
        label: "Context Fingerprint",
        content: SC.ContextFingerprintContent,
      },
    ],
  },
  {
    title: "Resource Awareness",
    items: [
      {
        id: "resource-body",
        label: "Resource Body Schema",
        content: SC.ResourceBodyContent,
      },
      {
        id: "capability-discovery",
        label: "Capability Discovery",
        content: SC.CapabilityDiscoveryContent,
      },
      {
        id: "cost-consciousness",
        label: "Cost Consciousness",
        content: SC.CostConsciousnessContent,
      },
    ],
  },
  {
    title: "Reality Physics",
    items: [
      {
        id: "reality-anchors",
        label: "Reality Anchors",
        content: SC.RealityAnchorsContent,
      },
      {
        id: "hallucination-detection",
        label: "Hallucination Detection",
        content: SC.HallucinationDetectionContent,
      },
      {
        id: "areal-artifact",
        label: ".areal Artifact",
        content: SC.ArealArtifactContent,
      },
    ],
  },
];
