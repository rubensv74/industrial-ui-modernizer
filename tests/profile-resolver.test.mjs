import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/ium-profile.mjs", import.meta.url));

test("AssetPlan UI/component routing returns governed UI authorities", () => {
  const result = spawnSync(
    process.execPath,
    [cli, "assetplan", "ui", "component", "--json"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  const paths = new Set(report.requiredSources.map((source) => source.path));

  assert.equal(report.repository, "rubensv74/app_preserv");
  assert.ok(paths.has("AGENTS.md"));
  assert.ok(paths.has("docs/ux-ui/ASSETPLAN_PREMIUM_SCREEN_STANDARD_V1.md"));
  assert.ok(paths.has("docs/ux-ui/ASSETPLAN_VISUAL_DESIGN_SYSTEM_V1.md"));
  assert.ok(paths.has("power-apps/components/catalog/component-registry.yaml"));
});

test("AssetPlan migration routing includes component authorities but not unrelated execution sources", () => {
  const result = spawnSync(
    process.execPath,
    [cli, "assetplan", "migration", "--json"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  const paths = new Set(report.requiredSources.map((source) => source.path));

  assert.ok(paths.has("AGENTS.md"));
  assert.ok(paths.has("power-apps/components/catalog/component-registry.yaml"));
  assert.equal(paths.has("docs/execution-governor/README.md"), false);
});

test("unknown profile fails explicitly", () => {
  const result = spawnSync(
    process.execPath,
    [cli, "does-not-exist", "--json"],
    { encoding: "utf8" }
  );

  assert.equal(result.status, 2);
  assert.match(result.stderr, /could not be loaded/i);
});
