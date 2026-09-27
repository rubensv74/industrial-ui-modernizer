import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const url = new URL("../profiles/assetplan/profile.json", import.meta.url);

test("AssetPlan profile keeps product authority above IUM and resolves components dynamically", async () => {
  const profile = JSON.parse(await readFile(url, "utf8"));

  assert.equal(profile.id, "assetplan");
  assert.equal(profile.repository, "rubensv74/app_preserv");
  assert.equal(profile.authorityPrecedence[0].authority, "AssetPlan canonical product sources");
  assert.equal(profile.componentResolution.authority, "power-apps/components/catalog/component-registry.yaml");
  assert.equal(profile.componentResolution.hardcodeVersionedImplementationsInProfile, false);

  const paths = new Set(profile.requiredSources.map((source) => source.path));
  for (const required of [
    "AGENTS.md",
    "docs/ux-ui/ASSETPLAN_PREMIUM_SCREEN_STANDARD_V1.md",
    "docs/ux-ui/ASSETPLAN_VISUAL_DESIGN_SYSTEM_V1.md",
    "docs/ux-ui/AP_PAGE_HEADER_HIERARCHY_V1.md",
    "power-apps/components/catalog/component-registry.yaml"
  ]) {
    assert.ok(paths.has(required), `Missing required AssetPlan authority: ${required}`);
  }

  assert.match(profile.iapBoundary.rule, /explicit AssetPlan adoption/i);
});
