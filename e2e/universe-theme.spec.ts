import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('universe categories, valid throws, keyboard, touch and reduced motion', async ({
  page,
}, info) => {
  await page.goto('/');
  const field = page.locator('.universe-field');
  await field.scrollIntoViewIfNeeded();
  const pause = page.getByRole('button', { name: 'Pausar universo', exact: true });
  await pause.click();
  const counter = page.locator('.throw-counter');
  const object = page.locator('.floating-body').first();
  await object.click();
  await expect(counter).toContainText('Lanzamientos: 0');
  let rect = (await object.boundingBox())!;
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.down();
  await page.mouse.move(rect.x + rect.width / 2 + 60, rect.y + rect.height / 2 + 30, { steps: 8 });
  await page.mouse.up();
  await expect(counter).toContainText('Lanzamientos: 1');
  for (const [label, key] of [
    ['Pelotas', 'balls'],
    ['Animales', 'animals'],
    ['Planetas', 'planets'],
  ]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(field).toHaveAttribute('data-category', key);
  }
  await object.focus();
  await page.keyboard.press('Enter');
  await expect(counter).toContainText('Lanzamientos: 1');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await expect(counter).toContainText('Lanzamientos: 2');
  if (info.project.name === 'mobile') {
    rect = (await object.boundingBox())!;
    const cdp = await page.context().newCDPSession(page);
    const x = rect.x + rect.width / 2,
      y = rect.y + rect.height / 2;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let n = 1; n <= 6; n++)
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x + n * 8, y: y + n * 3 }],
      });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await cdp.detach();
    await expect(counter).toContainText('Lanzamientos: 3');
  }
  await page.getByRole('button', { name: 'Reiniciar lanzamientos' }).click();
  await expect(counter).toContainText('Lanzamientos: 0');
  await page.getByRole('button', { name: 'Reanudar universo', exact: true }).click();
  const start = await object.getAttribute('style');
  await expect.poll(() => object.getAttribute('style')).not.toBe(start);
  await page.waitForTimeout(400);
  expect(
    await field.evaluate((el) =>
      [...el.querySelectorAll('.floating-body')].every((b) => {
        const p = el.getBoundingClientRect(),
          r = b.getBoundingClientRect();
        return (
          r.left >= p.left - 1 &&
          r.right <= p.right + 1 &&
          r.top >= p.top - 1 &&
          r.bottom <= p.bottom + 1
        );
      }),
    ),
  ).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(field).toHaveAttribute('data-running', 'false');
  const stopped = await object.getAttribute('style');
  await page.waitForTimeout(200);
  expect(await object.getAttribute('style')).toBe(stopped);
  expect(await page.evaluate(() => localStorage.getItem('nexo.results'))).toBeNull();
});

test('throws rebound inside bounds, cancellation does not score, and resizing redistributes objects', async ({
  page,
}) => {
  await page.goto('/');
  const field = page.locator('.universe-field'),
    objects = page.locator('.floating-body');
  await field.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Pausar universo', exact: true }).click();
  const object = objects.first(),
    r = (await object.boundingBox())!,
    bounds = (await field.boundingBox())!;
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width - 4, bounds.y + bounds.height / 2, { steps: 12 });
  await page.mouse.up();
  await expect(page.locator('.throw-counter')).toContainText('Lanzamientos: 1');
  await page.getByRole('button', { name: 'Reanudar universo', exact: true }).click();
  await expect
    .poll(async () => {
      const rect = (await object.boundingBox())!;
      return rect.x + rect.width;
    })
    .toBeLessThan(bounds.x + bounds.width - 20);
  await page.getByRole('button', { name: 'Pausar universo', exact: true }).click();
  const before = await object.getAttribute('style');
  const current = (await object.boundingBox())!;
  await page.mouse.move(current.x + current.width / 2, current.y + current.height / 2);
  await page.mouse.down();
  await page.mouse.move(current.x + current.width / 2 + 25, current.y + current.height / 2 + 25, {
    steps: 4,
  });
  await object.dispatchEvent('pointercancel', { pointerId: 1 });
  await page.mouse.up();
  await expect(page.locator('.throw-counter')).toContainText('Lanzamientos: 1');
  expect(await object.getAttribute('style')).not.toBe(before);
  for (const width of [360, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(objects).toHaveCount(width === 360 ? 4 : 6);
    await expect
      .poll(() =>
        field.evaluate((el) =>
          [...el.querySelectorAll('.floating-body')].every((node) => {
            const b = node.getBoundingClientRect(),
              f = el.getBoundingClientRect();
            return (
              b.left >= f.left - 1 &&
              b.right <= f.right + 1 &&
              b.top >= f.top - 1 &&
              b.bottom <= f.bottom + 1
            );
          }),
        ),
      )
      .toBe(true);
  }
  await page.goto('/actividades');
  await expect(page.locator('.universe')).toHaveCount(0);
});

test('night persists across navigation and all screens remain accessible', async ({
  page,
}, info) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Activar modo noche' }).click();
  await page.reload();
  await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'night');
  if (info.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir o cerrar menú' }).click();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.keyboard.press('Escape');
  }
  const routes = [
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
  ];
  for (const path of routes) {
    await page.goto(path);
    await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'night');
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      result.violations,
      `${path}: ${JSON.stringify(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })) })))}`,
    ).toEqual([]);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
      path,
    ).toBe(true);
    if (path === '/' || path === '/actividades/memory')
      await page.screenshot({
        path: `artifacts/night-${path === '/' ? 'home' : 'memory'}-${info.project.name}.png`,
        fullPage: true,
      });
  }
  for (const age of ['Infancia 5–9 años', 'Adolescencia 14–18 años']) {
    await page.goto('/experiencia');
    await page.getByRole('button', { name: age }).click();
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
    await page.getByRole('button', { name: 'Guardar y entrar a mi espacio' }).click();
    await page.goto('/');
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
  await page.goto('/actividades/memory');
  await page.getByRole('button', { name: 'Comenzar mi aventura' }).click();
  await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  const cards = page.locator('.memory-tile');
  const deck = await cards.locator('.tile-front').allTextContents();
  const pairs = new Map<string, number[]>();
  deck.forEach((symbol, index) => pairs.set(symbol, [...(pairs.get(symbol) ?? []), index]));
  for (const pair of pairs.values()) {
    await cards.nth(pair[0]).click();
    await cards.nth(pair[1]).click();
  }
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.screenshot({
    path: `artifacts/night-results-${info.project.name}.png`,
    fullPage: true,
  });
  await page.keyboard.press('Escape');
  await page.goto('/progreso');
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole('button', { name: 'Activar modo día' }).click();
  await page.reload();
  await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'day');
});
