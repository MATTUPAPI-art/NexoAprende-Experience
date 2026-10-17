import { expect, test } from '@playwright/test';
import { MEDIA } from '../src/app/core/constants/media-manifest';

test('Nexito greets, the real cover plays on demand, and reduced motion stops it', async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Saludar a Nexito' }).click();
  await expect(page.locator('.hero-friend nx-nexito')).toHaveClass(/is-waving/);
  await expect(page.locator('.hero-friend [aria-live]')).toHaveText(
    '¡Hola, Alex! Soy Nexito. ¿Qué descubrimos hoy?',
  );
  if (MEDIA.cover) {
    const media = page.locator('.hero-media nx-multimedia-background');
    if (info.project.name === 'mobile') await expect(media.locator('video')).toHaveCount(0);
    const play = media.getByRole('button', {
      name: 'Ver en movimiento: reproducir video de fondo',
    });
    if (await play.isVisible()) await play.click();
    await expect
      .poll(() =>
        media
          .locator('video')
          .evaluate((video: HTMLVideoElement) => video.readyState >= 2 && !video.paused),
      )
      .toBe(true);
    expect(await media.locator('video').evaluate((video: HTMLVideoElement) => video.muted)).toBe(
      true,
    );
    await media.getByRole('button', { name: 'Pausar video de fondo' }).click();
    await expect
      .poll(() => media.locator('video').evaluate((video: HTMLVideoElement) => video.paused))
      .toBe(true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.app-shell')).toHaveClass(/motion-off/);
  await expect(page.locator('.hero-media video')).toHaveCount(0);
  expect(
    await page
      .locator('.hero-friend .nexito-body')
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  await page.goto('/tutor');
  await expect(page.locator('.companion-photo img')).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator('.companion-photo img')
        .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.goto('/profesional');
  await expect(page.locator('.companion-photo img')).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator('.companion-photo img')
        .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  if (MEDIA.activities) {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/actividades');
    const film = page.locator('.activity-film');
    await film.scrollIntoViewIfNeeded();
    await expect(film.locator('video')).toHaveCount(0);
    await film
      .getByRole('button', { name: 'Ver en movimiento: reproducir video de fondo' })
      .click();
    await expect
      .poll(() =>
        film
          .locator('video')
          .evaluate((video: HTMLVideoElement) => video.readyState >= 2 && !video.paused),
      )
      .toBe(true);
    await film.getByRole('button', { name: 'Pausar video de fondo' }).click();
    await expect
      .poll(() => film.locator('video').evaluate((video: HTMLVideoElement) => video.paused))
      .toBe(true);
  }
  expect(errors).toEqual([]);
});
