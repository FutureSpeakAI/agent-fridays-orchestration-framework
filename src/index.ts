/**
 * Agent Friday's Orchestration Framework
 *
 * Trust-aware multi-agent orchestration with delegation trees,
 * awareness mesh, capability routing, and self-healing performance monitoring.
 *
 * @packageDocumentation
 */

// -- Shared Types -----------------------------------------------------------
export { TrustTier, AgentRole, TRUST_TIER_ORDER } from './types';

// -- Delegation Engine ------------------------------------------------------
export { DelegationEngine } from './delegation-engine';
export type {
  DelegationNode,
  DelegationState,
  DelegationConfig,
  DelegationEngineConfig,
  SpawnSubAgentOptions,
  SpawnResult,
  DelegationTree,
  HaltResult,
  DelegationUpdate,
  AgentRunner,
} from './delegation-engine';

// -- Awareness Mesh ---------------------------------------------------------
export { AwarenessMesh } from './awareness-mesh';
export type {
  MeshAgent,
  MeshDependency,
  MeshBroadcast,
  MeshEventType,
  MeshEvent,
  MeshSnapshot,
  MeshConfig,
  AwarenessMeshConfig,
} from './awareness-mesh';

// -- Capability Map ---------------------------------------------------------
export { CapabilityMap } from './capability-map';
export type {
  AgentCapability,
  InputField,
  CapabilityQuery,
  CapabilityMatch,
  CapabilityGap,
  CapabilitySnapshot,
  CapabilityMapConfig,
} from './capability-map';

// -- Symbiont Protocol ------------------------------------------------------
export { SymbiontProtocol } from './symbiont-protocol';
export type {
  ExecutionRecord,
  PerformanceProfile,
  AgentHealth,
  AnomalyReport,
  AnomalyType,
  CorrectionAction,
  SymbiontConfig,
  SymbiontSnapshot,
  HealthReport,
} from './symbiont-protocol';
