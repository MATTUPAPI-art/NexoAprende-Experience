import { expect, test, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const consoleErrors = new Map<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  consoleErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
});
test.afterEach(async ({ page }) =>
  expect(consoleErrors.get(page), 'Browser console errors').toEqual([]),
);

test('home renders, adapts to all viewport sizes, and has no horizontal overflow', async ({
  page,
}, info) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '¡Hola, Alex!' })).toBeVisible();
  await expect(page.locator('.activity-card')).toHaveCount(3);
  for (const width of [360, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
      .toBe(true);
  }
  const width = info.project.name === 'mobile' ? 390 : 1440;
  await page.setViewportSize({ width, height: 1000 });
  await page.screenshot({
    path: `artifacts/home-${info.project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  await page.getByRole('link', { name: 'Explorar experiencias' }).click();
  await expect(page).toHaveURL(/\/actividades$/);
  await page.getByRole('button', { name: 'Memoria', exact: true }).click();
  await expect(page.locator('.activity-card')).toHaveCount(1);
  await expect(page.locator('.activity-card h3')).toHaveText('Encuentra las parejas');
});

test('age, nickname, stage, and motion preferences survive reload', async ({ page }) => {
  await page.goto('/experiencia');
  await page.getByLabel('Tu nombre o apodo').fill('Nube');
  const age = page.getByLabel('¿Cuántos años tienes?');
  await age.focus();
  await age.press('Home');
  await age.press('ArrowRight');
  await age.press('ArrowRight');
  await expect(page.locator('.experience-preview')).toHaveAttribute('data-preview', 'child');
  await page.getByRole('button', { name: 'Guardar y entrar a mi espacio' }).click();
  await expect(page).toHaveURL(/\/panel$/);
  await expect(page.locator('.app-shell')).toHaveAttribute('data-stage', 'child');
  await page.reload();
  await expect(page.getByRole('heading', { name: '¡Seguimos descubriendo, Nube!' })).toBeVisible();
  await expect(page.locator('.dashboard-profile p')).toContainText('7 años');
  await page.locator('.topbar .motion-toggle').click();
  await expect(page.locator('.app-shell')).toHaveClass(/motion-off/);
  await page.reload();
  await expect(page.locator('.app-shell')).toHaveClass(/motion-off/);
  await page.goto('/experiencia');
  await page.getByRole('button', { name: 'Adolescencia 14–18 años' }).click();
  await expect(page.locator('.experience-preview')).toHaveAttribute('data-preview', 'teen');
  await page.getByRole('button', { name: 'Guardar y entrar a mi espacio' }).click();
  await expect(page.locator('.app-shell')).toHaveAttribute('data-stage', 'teen');
});

test('memory handles mismatch, timer, pause, reset, completion, modal, and persistent history', async ({
  page,
}) => {
  await page.goto('/actividades/memory');
  await page.getByRole('button', { name: 'Comenzar mi aventura' }).click();
  const cards = page.locator('.memory-tile');
  await expect(cards).toHaveCount(12);
  const symbols = await cards.locator('.tile-front').allTextContents();
  const different = symbols.findIndex((s) => s !== symbols[0]);
  await cards.nth(0).press('Enter');
  await cards.nth(0).press('Space');
  await expect(page.locator('.is-revealed')).toHaveCount(1);
  await cards.nth(different).click();
  await expect(page.locator('.game-stats>span').nth(1).locator('strong')).toHaveText('1');
  await expect(page.locator('.is-revealed')).toHaveCount(0);
  await expect
    .poll(() => page.locator('.game-stats>span').nth(2).locator('strong').innerText())
    .not.toBe('00:00');
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  const pausedTime = await page.locator('.game-stats>span').nth(2).locator('strong').innerText();
  await page.waitForTimeout(1200);
  await expect(page.locator('.game-stats>span').nth(2).locator('strong')).toHaveText(pausedTime);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByRole('button', { name: 'Reiniciar partida' }).click();
  await expect(page.locator('.game-stats>span').nth(1).locator('strong')).toHaveText('0');
  const deck = await cards.locator('.tile-front').allTextContents();
  const miss = deck.findIndex((s) => s !== deck[0]);
  await cards.nth(0).click();
  await cards.nth(miss).click();
  await expect(page.locator('.is-revealed')).toHaveCount(0);
  const pairs = new Map<string, number[]>();
  deck.forEach((symbol, index) => pairs.set(symbol, [...(pairs.get(symbol) ?? []), index]));
  for (const pair of pairs.values()) {
    await cards.nth(pair[0]).click();
    await cards.nth(pair[1]).click();
  }
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: '¡Lo lograste!' })).toBeVisible();
  await expect(page.locator('.is-matched')).toHaveCount(12);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.screenshot({
    path: `artifacts/memory-result-${test.info().project.name}.png`,
    fullPage: true,
  });
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Volver a jugar' })).toBeFocused();
  await page.getByRole('link', { name: 'Ver mi progreso', exact: true }).click();
  await expect(page).toHaveURL(/\/progreso$/);
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody td').nth(2)).toHaveText('6');
  await expect(page.locator('tbody td').nth(3)).toHaveText('1');
  await page.reload();
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('.stat-value').first()).toHaveText('1');
  expect(
    await page.evaluate(() => JSON.parse(localStorage.getItem('nexo.results') ?? '[]').length),
  ).toBe(1);
});

test('respects system reduced motion and provides keyboard navigation', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.app-shell')).toHaveClass(/motion-off/);
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  if (info.project.name === 'mobile') {
    const menu = page.getByRole('button', { name: 'Abrir o cerrar menú' });
    await menu.click();
    await expect(page.locator('.sidebar')).toHaveClass(/is-open/);
    await expect(page.locator('.brand')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await menu.press('Enter');
    await page.locator('.sidebar').getByRole('link', { name: 'Mi progreso', exact: true }).click();
    await expect(page).toHaveURL(/\/progreso$/);
  } else {
    await page.locator('.sidebar').getByRole('link', { name: 'Actividades' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/actividades$/);
  }
  await expect(page.locator('#main-content')).toBeFocused();
});

test('all screens pass automated WCAG AA checks and fit the viewport', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const findings: unknown[] = [];
  for (const route of [
    '/',
    '/experiencia',
    '/panel',
    '/actividades',
    '/actividades/memory',
    '/actividades/attention',
    '/actividades/reading',
    '/progreso',
    '/tutor',
    '/profesional',
    '/ayuda',
    '/no-existe',
  ]) {
    await page.goto(route);
    await expect(page.locator('main h1')).toBeVisible();
    const violations = (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
    ).violations;
    if (violations.length)
      findings.push({
        route,
        violations: violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      route,
    ).toBe(true);
  }
  expect(findings).toEqual([]);
  await page.goto('/actividades/memory');
  await page.getByRole('button', { name: 'Comenzar mi aventura' }).click();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
});

test('all age styles remain accessible and demo questionnaires open honestly', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const stage of ['Infancia 5–9 años', 'Juvenil 10–13 años', 'Adolescencia 14–18 años']) {
    await page.goto('/experiencia');
    await page.getByRole('button', { name: stage }).click();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      stage + ' preview',
    ).toEqual([]);
    await page.getByRole('button', { name: 'Guardar y entrar a mi espacio' }).click();
    await page.goto('/');
    await expect(page.locator('main h1')).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
      stage + ' home',
    ).toEqual([]);
  }
  await page.goto('/profesional');
  const open = page.getByRole('button', { name: 'Ver preguntas de ejemplo' }).first();
  await open.click();
  await expect(page.getByText('¿Qué actividad disfrutaste más hoy?')).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar guía' }).click();
  await expect(page.getByText('¿Qué actividad disfrutaste más hoy?')).not.toBeVisible();
  await page.goto('/actividades/attention');
  await expect(
    page.getByText('La actividad todavía no se puede jugar.', { exact: false }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /comenzar|iniciar/i })).toHaveCount(0);
});
