# Agent Friday's Orchestration Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A trust-aware multi-agent orchestration framework extracted from [Agent Friday](https://github.com/FutureSpeakAI/Agent-Friday), the world's most trustworthy AI assistant.

## Why This Matters

Most multi-agent frameworks treat all agents as equally trusted peers. In the real world, that's dangerous — an agent spawned from a public Discord message shouldn't have the same authority as one you launched yourself. This framework enforces **trust-tier degradation** as a first-class primitive: when an agent delegates to a child, the child's trust level can only stay the same or decrease, never escalate. This is inspired by the cLaw safety model (Agent Friday's equivalent of Asimov's Laws), which guarantees that no chain of delegation can ever produce an agent with more authority than its creator intended.

The result is a system where you can safely let agents spawn sub-agents recursively — with configurable depth limits, sub-500ms emergency halt propagation across entire delegation trees, cross-tree awareness so agents know what siblings are doing, and self-healing performance monitoring that detects when an agent type is degrading and recommends corrections.

If you're building anything where AI agents coordinate with each other — research pipelines, autonomous coding workflows, multi-step task decomposition — this gives you the safety and observability layer that's missing from most orchestration tools.

## Architecture

The framework consists of four modules that form a complete orchestration stack:

- **Delegation Engine** -- Recursive parent-child agent trees with trust-tier degradation, configurable depth limits (default 3, max 5), BFS halt propagation with 500ms interruptibility guarantee, context summarization, and partial result collection from interrupted children.

- **Awareness Mesh** -- Cross-tree agent coordination with dependency declarations, DFS cycle-based deadlock detection, trust-filtered broadcasting, and rich awareness context generation.

- **Capability Map** -- Dynamic agent type registry with structured capability metadata, tag/domain/fuzzy query matching, trust-tier-filtered capability views, capability gap tracking, and orchestrator prompt generation.

- **Symbiont Protocol** -- Self-improving performance system with execution metrics (p50/p95/avg latency, success rates), anomaly detection (consecutive failures, latency spikes), self-healing recommendations, and orchestrator prompt enrichment.

## Installation

```bash
npm install github:FutureSpeakAI/agent-fridays-orchestration-framework
```

## Quick Start

### Delegation Engine

```typescript
import { DelegationEngine } from "@agent-friday/orchestration-framework";

const engine = new DelegationEngine({
  defaultDepthLimit: 3,
  agentRunner: {
    spawn(type, desc, input, opts) { return { id: "agent-" + Date.now() }; },
    hardStop(id) { /* stop agent */ },
  },
  safeMode: () => false,
  onEvent: (ev) => console.log(ev.summary),
});

// Register a root agent
engine.registerRoot("task-001", "orchestrator", "Plan research");

// Spawn sub-agent (trust can only degrade, never escalate)
const result = await engine.spawnSubAgent({
  agentType: "research",
  description: "Research AI safety",
  input: { topic: "AI alignment" },
  parentTaskId: "task-001",
});

// Halt entire tree (BFS, 500ms guarantee)
await engine.haltTree("task-001");
```

### Awareness Mesh

```typescript
import { AwarenessMesh } from "@agent-friday/orchestration-framework";

const mesh = new AwarenessMesh();
mesh.registerAgent("a1", "research", "Research AI papers", { role: "worker", trustTier: "local" });
mesh.registerAgent("a2", "summarize", "Summarize findings", { role: "worker", trustTier: "local" });
mesh.declareDependency("a2", "a1", "needs research results");
const deadlocks = mesh.detectDeadlocks(); // DFS cycle detection
mesh.broadcast("a1", "Found 15 relevant papers");
const context = mesh.getAwarenessContext("a2");
```

### Capability Map

```typescript
import { CapabilityMap } from "@agent-friday/orchestration-framework";

const cap = new CapabilityMap();
cap.register({
  name: "research", description: "Web research",
  tags: ["research", "web-search"], domains: ["general"],
  inputSchema: [{ name: "topic", type: "string", required: true, description: "Topic" }],
  outputFormat: "Markdown briefing", trustTier: "local",
  canDelegate: false, latency: "slow", source: "builtin",
  registeredAt: Date.now(), enabled: true,
});
const matches = cap.findCapable({ need: "quantum computing research", tags: ["research"] });
const prompt = cap.getOrchestratorPromptContext();
```

### Symbiont Protocol

```typescript
import { SymbiontProtocol } from "@agent-friday/orchestration-framework";

const symbiont = new SymbiontProtocol();
symbiont.recordExecution({
  id: "exec-001", agentType: "research", taskId: "task-001",
  outcome: "completed", durationMs: 12000, hadError: false,
  role: "worker", trustTier: "local", completedAt: Date.now(),
});
const profile = symbiont.getProfile("research");
const anomalies = symbiont.getAnomalies();
const boost = symbiont.getPerformanceBoost("research");
const health = symbiont.getHealthReport();
```

## Key Concepts

### Trust Tiers

Trust tiers form a strict hierarchy: `local` (0) > `owner-dm` (1) > `approved-dm` (2) > `group` (3) > `public` (4). A child agent can NEVER have a higher trust tier than its parent.

### Delegation Trees

Agents form parent-child trees with depth limits (default 3, max 5), context summarization at each level, result collection from children, and ancestry chain tracking.

### Halt Propagation

BFS traversal visits all descendants, hard-stops each agent, captures partial results, and completes within 500ms.

### cLaw Compliance

Trust can only degrade (never escalate). Depth limits prevent unbounded recursion. All operations are non-blocking. Safe mode denies all delegation.

## API Reference

Each module exports a class with full TypeScript types. Key methods:

**DelegationEngine**: `registerRoot`, `spawnSubAgent`, `haltTree`, `haltAll`, `reportCompletion`, `collectChildResults`, `getTree`, `getNode`, `getAncestry`, `createDelegationContext`, `cleanup`

**AwarenessMesh**: `registerAgent`, `deregisterAgent`, `declareDependency`, `detectDeadlocks`, `broadcast`, `getBroadcasts`, `getAwarenessContext`, `getSnapshot`, `onUpdate`

**CapabilityMap**: `register`, `registerBuiltins`, `findCapable`, `getOrchestratorPromptContext`, `getGaps`, `getSnapshot`

**SymbiontProtocol**: `recordExecution`, `getProfile`, `getAllProfiles`, `getPerformanceBoost`, `getAnomalies`, `getPendingCorrections`, `getHealthReport`, `getPromptEnhancement`

## Origin

Extracted from [Agent Friday](https://github.com/FutureSpeakAI/Agent-Friday), the world's most trustworthy AI assistant.

## License

MIT License - Copyright (c) 2025 FutureSpeakAI. See [LICENSE](./LICENSE) for details.
