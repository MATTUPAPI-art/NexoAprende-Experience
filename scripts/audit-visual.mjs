import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
const base = process.env.NEXO_PREVIEW_URL ?? 'http://127.0.0.1:4307';
await mkdir('artifacts', { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  const findings = [];
  await page.goto(base);
  await page.evaluate(() => localStorage.setItem('nexo.theme', '"night"'));
  for (const route of [
    '/',
    '/experiencia',
    '/panel',
    '/actividades',
    '/progreso',
    '/actividades/memory',
    '/actividades/attention',
    '/actividades/reading',
    '/tutor',
    '/profesional',
    '/ayuda',
    '/no-existe',
  ]) {
    await page.goto(base + route);
    await page.locator('main h1').waitFor();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    const violations = result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    }));
    if (violations.length) findings.push({ route, violations });
    if (['/', '/experiencia', '/actividades/memory'].includes(route)) {
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        scrollTo(0, 0);
      });
      await page.screenshot({
        path: `artifacts/review-night-${route === '/' ? 'home' : route.replaceAll('/', '')}.png`,
        fullPage: true,
      });
    }
  }
  console.log(JSON.stringify(findings, null, 2));
  await writeFile('artifacts/contrast-findings.json', JSON.stringify(findings, null, 2));
  process.exitCode = findings.length ? 1 : 0;
} finally {
  await browser.close();
}
