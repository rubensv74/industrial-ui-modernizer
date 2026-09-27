import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/ium-powerapps-audit.mjs", import.meta.url));
const bad = fileURLToPath(new URL("./fixtures/powerapps-bad.pa.yaml", import.meta.url));
const good = fileURLToPath(new URL("./fixtures/powerapps-good.pa.yaml", import.meta.url));

function run(file) {
  const result = spawnSync(process.execPath, [cli, file, "--json", "--no-fail"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("Power Apps audit detects contract, hierarchy, boundary and interaction defects", () => {
  const report = run(bad);
  const ids = new Set(report.findings.map((finding) => finding.id));
  for (const id of ["IUM-PA-001", "IUM-PA-002", "IUM-PA-003", "IUM-PA-005", "IUM-PA-006", "IUM-PA-007"]) {
    assert.ok(ids.has(id), "Expected " + id);
  }
});

test("Power Apps audit accepts a bounded semantic component fixture", () => {
  const report = run(good);
  assert.equal(report.summary.error, 0);
  assert.equal(report.summary.warning, 0);
});
