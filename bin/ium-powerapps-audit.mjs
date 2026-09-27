#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const RULES_URL = new URL("../design-intelligence/rules/powerapps-rules.json", import.meta.url);
const IGNORE = new Set([".git","node_modules","dist","build","coverage",".next","out"]);

function parseArgs(argv) {
  const flags = new Set(argv.filter((x) => x.startsWith("-")));
  const targets = argv.filter((x) => !x.startsWith("-"));
  return {
    json: flags.has("--json"),
    noFail: flags.has("--no-fail"),
    help: flags.has("--help") || flags.has("-h"),
    targets: targets.length ? targets : ["."]
  };
}

function usage() {
  return [
    "Industrial UI Modernizer — Power Apps component audit",
    "",
    "Usage:",
    "  node ./bin/ium-powerapps-audit.mjs [path ...] [--json] [--no-fail]",
    "",
    "Scans *.pa.yaml files only. Studio/App Checker and visual QA remain separate gates."
  ].join("\n");
}

async function collect(target, root = process.cwd()) {
  const absolute = path.resolve(root, target);
  const info = await stat(absolute);
  if (info.isFile()) return absolute.endsWith(".pa.yaml") ? [absolute] : [];
  if (!info.isDirectory()) return [];

  const output = [];
  for (const entry of await readdir(absolute, { withFileTypes: true })) {
    if (IGNORE.has(entry.name)) continue;
    const child = path.join(absolute, entry.name);
    if (entry.isDirectory()) output.push(...await collect(child, root));
    else if (entry.isFile() && child.endsWith(".pa.yaml")) output.push(child);
  }
  return output;
}

function lineOf(content, index) {
  return content.slice(0, index).split("\n").length;
}

function eventBlocks(content) {
  const lines = content.split("\n");
  const output = [];
  let inCustom = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s{4}CustomProperties:\s*$/.test(lines[i])) {
      inCustom = true;
      continue;
    }
    if (inCustom && /^\s{4}\S/.test(lines[i]) && !/^\s{6}/.test(lines[i])) {
      inCustom = false;
    }
    if (!inCustom) continue;

    const match = lines[i].match(/^\s{6}([A-Za-z0-9_]+):\s*$/);
    if (!match) continue;

    const start = i;
    let end = i + 1;
    for (; end < lines.length; end++) {
      if (/^\s{6}[A-Za-z0-9_]+:\s*$/.test(lines[end])) break;
      if (/^\s{4}\S/.test(lines[end]) && !/^\s{6}/.test(lines[end])) break;
    }

    const text = lines.slice(start, end).join("\n");
    if (/PropertyKind:\s*Event/.test(text)) output.push({ name: match[1], text, line: start + 1 });
  }
  return output;
}

function outputNames(content) {
  const lines = content.split("\n");
  const output = [];
  let inCustom = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s{4}CustomProperties:\s*$/.test(lines[i])) {
      inCustom = true;
      continue;
    }
    if (inCustom && /^\s{4}\S/.test(lines[i]) && !/^\s{6}/.test(lines[i])) {
      inCustom = false;
    }
    if (!inCustom) continue;

    const match = lines[i].match(/^\s{6}([A-Za-z0-9_]+):\s*$/);
    if (!match) continue;

    const start = i;
    let end = i + 1;
    for (; end < lines.length; end++) {
      if (/^\s{6}[A-Za-z0-9_]+:\s*$/.test(lines[end])) break;
      if (/^\s{4}\S/.test(lines[end]) && !/^\s{6}/.test(lines[end])) break;
    }

    const text = lines.slice(start, end).join("\n");
    if (/PropertyKind:\s*Output/.test(text)) output.push({ name: match[1], line: start + 1 });
  }
  return output;
}

function componentProperties(content) {
  const lines = content.split("\n");
  const index = lines.findIndex((line) => /^\s{4}Properties:\s*$/.test(line));
  if (index < 0) return "";
  let end = index + 1;
  for (; end < lines.length; end++) {
    if (/^\s{4}Children:\s*$/.test(lines[end])) break;
  }
  return lines.slice(index, end).join("\n");
}

function controlBlocks(content, controlType) {
  const lines = content.split("\n");
  const output = [];
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^\s{12}-\s+([A-Za-z0-9_]+):\s*$/);
    if (!match) continue;
    const start = i;
    let end = i + 1;
    for (; end < lines.length; end++) {
      if (/^\s{12}-\s+[A-Za-z0-9_]+:\s*$/.test(lines[end])) break;
    }
    const text = lines.slice(start, end).join("\n");
    if (text.includes("Control: " + controlType)) output.push({ name: match[1], text, line: start + 1 });
  }
  return output;
}

function fixedNumber(block, property) {
  const regex = new RegExp("^\\s+" + property + ":\\s*=([0-9]+(?:\\.[0-9]+)?)\\s*$", "m");
  const match = block.match(regex);
  return match ? Number(match[1]) : null;
}

function inspect(content, file, rules, root) {
  const byId = Object.fromEntries(rules.map((rule) => [rule.id, rule]));
  const findings = [];

  const add = (id, line, detail) => {
    const rule = byId[id];
    findings.push({
      id,
      severity: rule.severity,
      category: rule.category,
      file: path.relative(root, file).split(path.sep).join("/"),
      line,
      message: rule.message,
      detail
    });
  };

  for (const event of eventBlocks(content)) {
    const emits = /Description:\s*Emits\b/i.test(event.text);
    if (emits && !/\n\s+Parameters:\s*\n/.test(event.text)) {
      add("IUM-PA-001", event.line, event.name + " describes emitted values without Parameters");
    }
  }

  const properties = componentProperties(content);
  for (const output of outputNames(content)) {
    const regex = new RegExp("^\\s{6}" + output.name + ":\\s*=.+$", "m");
    if (!regex.test(properties)) {
      add("IUM-PA-002", output.line, output.name + " has no component Properties formula");
    }
  }

  for (const match of content.matchAll(/\.Run\s*\(/g)) {
    add("IUM-PA-003", lineOf(content, match.index ?? 0), "External action invocation found");
  }

  for (const match of content.matchAll(/\b(?:Patch|ClearCollect|Collect|RemoveIf|Remove)\s*\(/g)) {
    add("IUM-PA-004", lineOf(content, match.index ?? 0), match[0].trim() + " mutation found");
  }

  for (const block of controlBlocks(content, "Classic/Button@2.2.0")) {
    const height = fixedNumber(block.text, "Height");
    const width = fixedNumber(block.text, "Width");
    if ((height !== null && height < 40) || (width !== null && width < 40)) {
      add("IUM-PA-005", block.line, block.name + " fixed size " + (width ?? "dynamic") + "×" + (height ?? "dynamic"));
    }
  }

  for (const block of controlBlocks(content, "Image@2.2.3")) {
    if (/OnSelect:\s*=Select\(Parent\)\s*$/m.test(block.text)) {
      add("IUM-PA-006", block.line, block.name + " only forwards Gallery selection");
    }
  }

  const maxDepthMatch = content.match(/MaxDepth:[\s\S]*?Default:\s*=([0-9]+)/);
  const manual = [...content.matchAll(/\bp([0-9]+):LookUp/g)].map((match) => Number(match[1]));
  if (maxDepthMatch && manual.length) {
    const maxDepth = Number(maxDepthMatch[1]);
    const maxP = Math.max(...manual);
    if (maxP < Math.max(0, maxDepth - 1)) {
      add("IUM-PA-007", lineOf(content, maxDepthMatch.index ?? 0), "MaxDepth=" + maxDepth + ", deepest manual ancestor helper=p" + maxP);
    }
  }

  return findings;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const ruleDocument = JSON.parse(await readFile(RULES_URL, "utf8"));
  const root = process.cwd();
  const files = new Set();

  for (const target of options.targets) {
    for (const file of await collect(target, root)) files.add(file);
  }

  const findings = [];
  for (const file of [...files].sort()) {
    const content = await readFile(file, "utf8");
    findings.push(...inspect(content, file, ruleDocument.rules, root));
  }

  const summary = { error: 0, warning: 0, info: 0 };
  for (const finding of findings) summary[finding.severity] = (summary[finding.severity] ?? 0) + 1;

  const report = { rulesVersion: ruleDocument.version, filesScanned: files.size, summary, findings };

  if (options.json) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    for (const finding of findings) {
      console.log(finding.severity.toUpperCase().padEnd(7) + " " + finding.id + " " + finding.file + ":" + finding.line + "  " + finding.message);
      console.log("        " + finding.detail);
    }
    console.log("IUM Power Apps audit: " + files.size + " file(s), " + summary.error + " error(s), " + summary.warning + " warning(s), " + summary.info + " info.");
  }

  if (!options.noFail && summary.error > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error("IUM Power Apps audit failed: " + error.message);
  process.exitCode = 2;
});
