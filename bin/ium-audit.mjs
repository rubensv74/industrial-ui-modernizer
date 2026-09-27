#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const RULES_URL = new URL("../design-intelligence/rules/source-rules.json", import.meta.url);
const DEFAULT_IGNORES = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  "out"
]);

function parseArgs(argv) {
  const flags = new Set(argv.filter((arg) => arg.startsWith("--")));
  const targets = argv.filter((arg) => !arg.startsWith("--"));
  return {
    json: flags.has("--json"),
    noFail: flags.has("--no-fail"),
    help: flags.has("--help") || flags.has("-h"),
    targets: targets.length ? targets : ["."]
  };
}

function help() {
  return [
    "Industrial UI Modernizer source audit",
    "",
    "Usage:",
    "  node ./bin/ium-audit.mjs [path ...] [--json] [--no-fail]",
    "",
    "Options:",
    "  --json      Emit machine-readable JSON.",
    "  --no-fail   Always exit 0 even when error-severity findings exist.",
    "  --help      Show this help.",
    ""
  ].join("\n");
}

function isIgnored(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  if (normalized.startsWith("tests/fixtures/") || normalized === "tests/fixtures") return true;
  return normalized.split("/").some((segment) => DEFAULT_IGNORES.has(segment));
}

async function collectFiles(target, allowedExtensions, root = process.cwd()) {
  const absolute = path.resolve(root, target);
  let info;
  try {
    info = await stat(absolute);
  } catch {
    throw new Error(`Target does not exist: ${target}`);
  }

  if (info.isFile()) {
    return allowedExtensions.has(path.extname(absolute).toLowerCase()) ? [absolute] : [];
  }

  if (!info.isDirectory()) return [];

  const output = [];
  const entries = await readdir(absolute, { withFileTypes: true });
  for (const entry of entries) {
    const child = path.join(absolute, entry.name);
    const relative = path.relative(root, child);
    if (isIgnored(relative)) continue;

    if (entry.isDirectory()) {
      output.push(...await collectFiles(child, allowedExtensions, root));
    } else if (entry.isFile() && allowedExtensions.has(path.extname(entry.name).toLowerCase())) {
      output.push(child);
    }
  }
  return output;
}

function lineColumn(content, index) {
  const prefix = content.slice(0, index);
  const lines = prefix.split("\n");
  return { line: lines.length, column: lines.at(-1).length + 1 };
}

function compileRule(rule) {
  const flags = rule.flags?.includes("g") ? rule.flags : `${rule.flags ?? ""}g`;
  return new RegExp(rule.pattern, flags);
}

function inspect(content, file, rules, root) {
  const extension = path.extname(file).toLowerCase();
  const findings = [];

  for (const rule of rules) {
    if (!rule.extensions.includes(extension)) continue;

    const regex = compileRule(rule);
    for (const match of content.matchAll(regex)) {
      const position = lineColumn(content, match.index ?? 0);
      findings.push({
        id: rule.id,
        category: rule.category,
        severity: rule.severity,
        file: path.relative(root, file).split(path.sep).join("/"),
        line: position.line,
        column: position.column,
        message: rule.message,
        suggestion: rule.suggestion
      });

      if (findings.length >= 2000) return findings;
    }
  }

  return findings;
}

function summarize(findings) {
  const summary = { error: 0, warning: 0, info: 0 };
  for (const finding of findings) summary[finding.severity] += 1;
  return summary;
}

function printText(filesScanned, findings, summary) {
  for (const finding of findings) {
    const level = finding.severity.toUpperCase().padEnd(7);
    console.log(
      `${level} ${finding.id} ${finding.file}:${finding.line}:${finding.column}  ${finding.message}`
    );
    console.log(`        Fix: ${finding.suggestion}`);
  }

  if (findings.length) console.log("");
  console.log(
    `IUM audit: ${filesScanned} file(s), ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(help());
    return;
  }

  const ruleDocument = JSON.parse(await readFile(RULES_URL, "utf8"));
  const rules = ruleDocument.rules;
  const allowedExtensions = new Set(rules.flatMap((rule) => rule.extensions));
  const root = process.cwd();

  const files = new Set();
  for (const target of options.targets) {
    for (const file of await collectFiles(target, allowedExtensions, root)) files.add(file);
  }

  const findings = [];
  for (const file of [...files].sort()) {
    const content = await readFile(file, "utf8");
    findings.push(...inspect(content, file, rules, root));
  }

  findings.sort((a, b) =>
    a.file.localeCompare(b.file) ||
    a.line - b.line ||
    a.column - b.column ||
    a.id.localeCompare(b.id)
  );

  const summary = summarize(findings);
  const report = {
    rulesVersion: ruleDocument.version,
    filesScanned: files.size,
    summary,
    findings
  };

  if (options.json) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    printText(files.size, findings, summary);
  }

  if (!options.noFail && summary.error > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`IUM audit failed: ${error.message}`);
  process.exitCode = 2;
});
