import { readFileSync, existsSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import assert from 'node:assert/strict';
const workspace = JSON.parse(readFileSync('angular.json', 'utf8'));
const build = workspace.projects['nexoaprende-experience'].architect.build;
const output = build.options.outputPath;
const base = resolve(typeof output === 'string' ? output : output.base);
const directory = join(
  base,
  typeof output === 'object' ? (output.browser ?? 'browser') : 'browser',
);
const expectedBase = '/NexoAprende-Experience/';
assert.ok(existsSync(join(directory, 'index.html')), 'Angular browser output missing');
assert.equal(build.configurations.production.baseHref, expectedBase);
const index = readFileSync(join(directory, 'index.html'), 'utf8');
assert.ok(
  index.includes(`<base href="${expectedBase}">`) ||
    index.includes(`<base href="${expectedBase}" />`),
  'Incorrect built base href',
);
assert.ok(
  !/(?:src|href)=["']\/(?!\/)/.test(index.replace(/<base\b[^>]*>/g, '')),
  'Domain-root asset in built HTML',
);
const manifest = readFileSync('src/app/core/constants/media-manifest.ts', 'utf8');
const assets = [
  ...new Set(
    [...manifest.matchAll(/["']((?:images|videos)\/[^"']+)["']/g)].map((match) => match[1]),
  ),
];
assert.equal(assets.length, 22, 'Expected 22 validated production resources');
for (const asset of assets)
  assert.ok(existsSync(join(directory, asset)), `Missing built resource: ${asset}`);
const walk = (path) =>
  readdirSync(path, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(path, entry.name)) : [join(path, entry.name)],
  );
const forbidden =
  /(^|[\\/])(node_modules|\.angular|local|artifacts|test-results|playwright-report)([\\/]|$)|creceactivo|\.(bak|tmp|pem|key)$/i;
assert.deepEqual(
  walk(directory).filter((file) => forbidden.test(relative(directory, file))),
  [],
  'Private/temporary material in Pages artifact',
);
const fonts = walk(directory).filter((file) => /\.woff2$/.test(file));
assert.ok(fonts.length > 0, 'Local fonts missing');
const published = relative(process.cwd(), directory).split('\\').join('/');
if (process.env.GITHUB_OUTPUT)
  appendFileSync(process.env.GITHUB_OUTPUT, `directory=${published}\n`);
console.log(
  JSON.stringify(
    {
      directory: published,
      baseHref: expectedBase,
      resources: assets.length,
      localFonts: fonts.length,
      privateFiles: 0,
    },
    null,
    2,
  ),
);
