#!/usr/bin/env node

/**
 * This script checks for duplicate source redirects in the redirects.js file.
 * It will exit with a non-zero status code if any duplicates are found.
 * This script is run as part of the `postbuild` process.
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { exit } from 'process';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const redirectsModule = await import(resolve(__dirname, '../redirects.js'));
const redirects = redirectsModule.default;

const sourceCounts = {};

for (const redirect of redirects) {
  if (redirect.source) {
    sourceCounts[redirect.source] = (sourceCounts[redirect.source] || 0) + 1;
  }
}

const duplicates = Object.entries(sourceCounts)
  .filter(([_source, count]) => count > 1)
  .map(([source]) => ({ source }));

if (duplicates.length > 0) {
  console.error(chalk.red('🚨 Duplicate redirects found:'));
  duplicates.forEach((duplicate) => {
    console.error(chalk.gray('................................'));
    const jsonOutput = JSON.stringify(duplicate, null, 2);
    console.error(chalk.white(jsonOutput));
  });
  exit(1);
} else {
  console.log(chalk.green('✅ no duplicate redirects found'));
  exit(0);
}
