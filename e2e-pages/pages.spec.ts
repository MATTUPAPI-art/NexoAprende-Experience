import { expect, test, Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { MEDIA } from '../src/app/core/constants/media-manifest';

test('production base path, all resources, direct hash routes and night reload', async ({
  page,
  request,
  baseURL,
}) => {
  const base = new URL(baseURL!);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.origin === base.origin) {
      if (response.status() >= 400) errors.push(`${response.status()} ${url.pathname}`);
      if (
        /\.(js|css|woff2|webp|jpg|png|svg|ico|webm|mp4)$/.test(url.pathname) &&
        !url.pathname.startsWith(base.pathname)
      )
        errors.push(`Resource escaped base: ${url.pathname}`);
    }
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/');
  await expect(page.getByRole('heading', { name: '¡Hola, Alex!' })).toBeVisible();
  expect(await page.evaluate(() => document.baseURI)).toBe(base.href);
  await page.getByRole('button', { name: 'Activar modo noche' }).click();
  const assets = [
    ...new Set(
      [
        MEDIA.cover,
        MEDIA.activities,
        ...Object.values(MEDIA.stages),
        ...Object.values(MEDIA.worlds),
        ...Object.values(MEDIA.art),
      ].filter((path): path is string => !!path),
    ),
  ];
  expect(assets).toHaveLength(22);
  for (const asset of assets) {
    expect(asset.startsWith('/')).toBe(false);
    const response = await request.get(new URL(asset, base).href);
    expect(response.status(), asset).toBe(200);
    expect(response.headers()['content-type'], asset).toContain(
      asset.endsWith('.webm') ? 'video/webm' : 'image/webp',
    );
    if (asset.endsWith('.webp'))
      await page.evaluate(async (path) => {
        const image = new Image();
        image.src = path;
        await image.decode();
        if (!image.naturalWidth) throw new Error(path);
      }, asset);
  }
  for (const [route, title] of [
    ['/', '¡Hola, Alex!'],
    ['/experiencia', 'Encuentra el lugar donde brillas.'],
    ['/panel', '¡Seguimos descubriendo, Alex!'],
    ['/actividades', 'Elige tu próxima aventura.'],
    ['/progreso', 'Tu camino de descubrimientos.'],
    ['/actividades/memory', 'Encuentra las parejas'],
    ['/actividades/attention', 'Encuentra los perros'],
    ['/actividades/reading', 'Un mundo entre líneas'],
    ['/tutor', 'Acompañar también es aprender.'],
    ['/profesional', 'Conectados por el aprendizaje.'],
    ['/ayuda', 'Estamos para acompañarte.'],
    ['/no-existe', 'Este rincón aún no está en el mapa.'],
  ]) {
    await page.goto(`./#${route}`);
    const heading = page.locator('main h1');
    // A hash change finishes before a lazy route loads over the public network.
    await expect(heading).toHaveText(title);
    await page.reload();
    await expect(page.locator('main h1')).toHaveText(title);
    await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'night');
    expect(new URL(page.url()).pathname).toBe(base.pathname);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(
      true,
    );
  }
  await page.goto('./#/');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('16px "Nunito Sans Variable"'))).toBe(true);
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole('link', { name: 'Comenzar aventura', exact: false }).first().click();
  await expect(page).toHaveURL(/#\/actividades$/);
  expect(errors).toEqual([]);
});

test('production universe supports selectors, mouse, touch, valid points and reduced motion', async ({
  page,
}, info) => {
  await page.goto('./#/');
  await page.getByRole('link', { name: 'Prueba tu universo: arrastra y lanza' }).click();
  const field = page.locator('.universe-field');
  await field.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Pausar universo', exact: true }).click();
  for (const [label, id] of [
    ['Planetas', 'planets'],
    ['Pelotas', 'balls'],
    ['Animales', 'animals'],
  ]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(field).toHaveAttribute('data-category', id);
  }
  const object = page.locator('.floating-body').first(),
    counter = page.locator('.throw-counter');
  await object.click();
  await expect(counter).toContainText('Lanzamientos: 0');
  let r = (await object.boundingBox())!;
  await page.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await page.mouse.down();
  await page.mouse.move(r.x + r.width / 2 + 55, r.y + r.height / 2 + 20, { steps: 8 });
  await page.mouse.up();
  await expect(counter).toContainText('Lanzamientos: 1');
  if (info.project.name === 'pages-mobile') {
    const cdp = await page.context().newCDPSession(page);
    r = (await object.boundingBox())!;
    const x = r.x + r.width / 2,
      y = r.y + r.height / 2;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let i = 1; i <= 6; i++)
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x + i * 6, y: y + i * 3 }],
      });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await cdp.detach();
    await expect(counter).toContainText('Lanzamientos: 2');
  }
  await page.getByRole('button', { name: 'Reanudar universo', exact: true }).click();
  const position = await object.getAttribute('style');
  await expect.poll(() => object.getAttribute('style')).not.toBe(position);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(field).toHaveAttribute('data-running', 'false');
  const stopped = await object.getAttribute('style');
  await page.waitForTimeout(150);
  expect(await object.getAttribute('style')).toBe(stopped);
  await page.getByRole('button', { name: 'Reiniciar lanzamientos' }).click();
  await expect(counter).toContainText('Lanzamientos: 0');
  expect(await page.evaluate(() => localStorage.getItem('nexo.results'))).toBeNull();
});

async function checkVideo(container: Locator) {
  await container.scrollIntoViewIfNeeded();
  const play = container.getByRole('button', {
    name: 'Ver en movimiento: reproducir video de fondo',
  });
  if (await play.isVisible()) await play.click();
  const video = container.locator('video');
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState >= 2 && !v.paused))
    .toBe(true);
  expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.playsInline)).toBe(
    true,
  );
  await container.getByRole('button', { name: 'Pausar video de fondo' }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
}
test('production videos play and memory stores results across hash navigation and reload', async ({
  page,
}) => {
  await page.goto('./#/');
  await checkVideo(page.locator('.hero-media'));
  await page.goto('./#/actividades');
  await checkVideo(page.locator('.activity-film'));
  await page.getByRole('button', { name: 'Activar modo noche' }).click();
  await page.goto('./#/actividades/memory');
  await page.reload();
  await page.getByRole('button', { name: 'Comenzar mi aventura' }).click();
  const cards = page.locator('.memory-tile'),
    symbols = await cards.locator('.tile-front').allTextContents();
  const pairs = new Map<string, number[]>();
  symbols.forEach((symbol, i) => pairs.set(symbol, [...(pairs.get(symbol) ?? []), i]));
  for (const pair of pairs.values()) {
    await cards.nth(pair[0]).click();
    await cards.nth(pair[1]).click();
  }
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
      .violations,
  ).toEqual([]);
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Ver mi progreso', exact: true }).click();
  await expect(page).toHaveURL(/#\/progreso$/);
  await page.reload();
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody td').nth(2)).toHaveText('6');
  await expect(page.locator('.app-shell')).toHaveAttribute('data-theme', 'night');
});
