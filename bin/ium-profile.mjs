#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const [profileId, ...rest] = argv.filter((arg) => !arg.startsWith("-"));
  const flags = new Set(argv.filter((arg) => arg.startsWith("-")));
  return {
    profileId,
    scopes: rest,
    json: flags.has("--json"),
    help: flags.has("--help") || flags.has("-h")
  };
}

function usage() {
  return [
    "Industrial UI Modernizer profile resolver",
    "",
    "Usage:",
    "  node ./bin/ium-profile.mjs <profile> [scope ...] [--json]",
    "",
    "Examples:",
    "  node ./bin/ium-profile.mjs assetplan ui component",
    "  node ./bin/ium-profile.mjs assetplan migration --json",
    ""
  ].join("\n");
}

function matchesScope(source, scopes) {
  if (source.requiredFor.includes("all")) return true;
  if (!scopes.length) return true;
  return scopes.some((scope) => source.requiredFor.includes(scope));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help || !options.profileId) {
    console.log(usage());
    process.exitCode = options.profileId ? 0 : 2;
    return;
  }

  const profileUrl = new URL(
    `../profiles/${options.profileId}/profile.json`,
    import.meta.url
  );

  let profile;
  try {
    profile = JSON.parse(await readFile(profileUrl, "utf8"));
  } catch (error) {
    throw new Error(
      `Profile "${options.profileId}" could not be loaded: ${error.message}`
    );
  }

  const sources = profile.requiredSources.filter((source) =>
    matchesScope(source, options.scopes)
  );

  const result = {
    id: profile.id,
    product: profile.product,
    repository: profile.repository,
    defaultBranch: profile.defaultBranch,
    scopes: options.scopes,
    authorityPrecedence: profile.authorityPrecedence,
    componentResolution: profile.componentResolution,
    iapBoundary: profile.iapBoundary,
    requiredSources: sources,
    prohibitedAssumptions: profile.prohibitedAssumptions
  };

  if (options.json) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    return;
  }

  console.log(`${profile.product} profile (${profile.id})`);
  console.log(`Repository: ${profile.repository}@${profile.defaultBranch}`);
  console.log(
    `Scopes: ${options.scopes.length ? options.scopes.join(", ") : "all"}`
  );
  console.log("");
  console.log("Authority:");
  for (const entry of profile.authorityPrecedence) {
    console.log(`  ${entry.rank}. ${entry.authority}`);
  }
  console.log("");
  console.log("Required sources:");
  for (const source of sources) {
    console.log(`  - ${source.path} [${source.role}]`);
  }
}

main().catch((error) => {
  console.error(`IUM profile resolution failed: ${error.message}`);
  process.exitCode = 2;
});
