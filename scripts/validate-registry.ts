/**
 * Validates that all platform registry entries are complete.
 * Run: npm run validate-registry
 */

import { PLATFORMS } from "../src/lib/platform-registry";

let failed = false;

for (const p of PLATFORMS) {
  if (!p.slug || !p.name || !p.template) {
    console.error(`Invalid platform config: ${JSON.stringify(p)}`);
    failed = true;
  }
  try {
    const state = p.createDefaultState();
    if (!state || !state.category) {
      console.error(`Invalid default state for ${p.slug}`);
      failed = true;
    }
  } catch (e) {
    console.error(`Failed to create default state for ${p.slug}:`, e);
    failed = true;
  }
}

console.log(`Validated ${PLATFORMS.length} platforms.`);

if (PLATFORMS.length !== 49) {
  console.error(`Expected 49 platforms, got ${PLATFORMS.length}`);
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("All platforms valid.");
