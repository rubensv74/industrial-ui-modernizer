import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const cli = fileURLToPath(new URL("../bin/ium-audit.mjs", import.meta.url));
const badTsx = fileURLToPath(new URL("./fixtures/bad.tsx", import.meta.url));
const goodTsx = fileURLToPath(new URL("./fixtures/good.tsx", import.meta.url));
const badCss = fileURLToPath(new URL("./fixtures/bad.css", import.meta.url));

function run(target) {
  const result = spawnSync(process.execPath, [cli, target, "--json", "--no-fail"], {
    encoding: "utf8"
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("detects semantic and accessibility problems in TSX", () => {
  const report = run(badTsx);
  const ids = new Set(report.findings.map((finding) => finding.id));

  assert.ok(ids.has("IUM-A11Y-001"));
  assert.ok(ids.has("IUM-A11Y-003"));
  assert.ok(ids.has("IUM-MAINT-001"));
  assert.ok(report.summary.error >= 2);
});

test("accepts a simple semantic TSX fixture without errors", () => {
  const report = run(goodTsx);
  assert.equal(report.summary.error, 0);
});

test("detects responsive, layout, motion, color, and typography smells in CSS", () => {
  const report = run(badCss);
  const ids = new Set(report.findings.map((finding) => finding.id));

  for (const id of [
    "IUM-LAYOUT-001",
    "IUM-RESP-001",
    "IUM-LAYOUT-002",
    "IUM-LAYOUT-003",
    "IUM-MOTION-001",
    "IUM-MOTION-002",
    "IUM-COLOR-001",
    "IUM-COLOR-002",
    "IUM-TYPE-001"
  ]) {
    assert.ok(ids.has(id), `Expected ${id}`);
  }
});
