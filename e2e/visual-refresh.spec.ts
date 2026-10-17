import { expect, test } from '@playwright/test';
import { MEDIA } from '../src/app/core/constants/media-manifest';

test('new compositions keep every world usable without missing media requests', async ({
  page,
}, info) => {
  const errors: string[] = [];
  const mediaRequests: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('request', (request) => {
    if (/\/(videos|images)\/.*\.(mp4|webm|jpg|webp)(\?|$)/.test(request.url()))
      mediaRequests.push(new URL(request.url()).pathname);
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/experiencia');
  await expect(page.locator('.world-card')).toHaveCount(3);
  await page.screenshot({
    path: `artifacts/worlds-${info.project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  for (const world of ['child', 'junior', 'teen']) {
    const button = page.locator(`.world-card[data-world="${world}"]`);
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.experience-preview')).toHaveAttribute('data-preview', world);
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  }
  await page.getByRole('button', { name: 'Guardar y entrar a mi espacio' }).click();
  await expect(page.locator('.world-banner')).toBeVisible();
  await expect(page.locator('.app-shell')).toHaveAttribute('data-stage', 'teen');
  await page.screenshot({
    path: `artifacts/panel-${info.project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  await page.goto('/actividades');
  await expect(page.locator('.catalog-grid.is-all')).toBeVisible();
  await page.screenshot({
    path: `artifacts/catalog-${info.project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  const available = [
    MEDIA.cover,
    MEDIA.activities,
    ...Object.values(MEDIA.stages),
    ...Object.values(MEDIA.worlds),
    ...Object.values(MEDIA.art),
  ].filter(Boolean);
  expect(mediaRequests.every((url) => available.includes(url))).toBe(true);
  if (!MEDIA.cover && !MEDIA.activities && !Object.values(MEDIA.stages).length) {
    expect(mediaRequests).toEqual([]);
    await page.goto('/');
    await expect(page.locator('video')).toHaveCount(0);
    await expect(page.locator('.media-orbit')).toHaveCount(2);
  }
  await expect
    .poll(() =>
      page.evaluate(() =>
        [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect();
            return rect.top < innerHeight && rect.bottom > 0;
          })
          .every((image) => image.complete && image.naturalWidth > 0),
      ),
    )
    .toBe(true);
  expect(errors).toEqual([]);
});
