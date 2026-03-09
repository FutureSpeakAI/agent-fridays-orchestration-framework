/**
 * Shared types for the Agent Friday Orchestration Framework.
 *
 * These types are used across all four modules (DelegationEngine,
 * AwarenessMesh, CapabilityMap, SymbiontProtocol) to ensure a
 * consistent trust and role model.
 */

/** Trust tiers — ordered from most to least privileged */
export type TrustTier = 'local' | 'owner-dm' | 'approved-dm' | 'group' | 'public';

/** Agent roles in the orchestration system */
export type AgentRole = 'solo' | 'lead' | 'worker' | 'sub-agent';

/** Numeric ordering for trust tier comparison (lower = more trusted) */
export const TRUST_TIER_ORDER: Record<TrustTier, number> = {
  local: 0,
  'owner-dm': 1,
  'approved-dm': 2,
  group: 3,
  public: 4,
};
