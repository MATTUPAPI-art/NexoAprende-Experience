import { describe, expect, it } from 'vitest';
import { advance, Body, contain } from './universe-physics';
const body = (patch: Partial<Body> = {}): Body => ({
  id: 0,
  x: 100,
  y: 100,
  vx: 100,
  vy: 50,
  radius: 25,
  mass: 2,
  held: false,
  ...patch,
});
describe('Universe circle physics', () => {
  it('reflects all four boundaries and clamps after resizing', () => {
    for (const patch of [
      { x: -10, vx: -100 },
      { x: 900, vx: 100 },
      { y: -10, vy: -100 },
      { y: 900, vy: 100 },
    ]) {
      const b = body(patch);
      contain(b, 300, 200);
      expect(b.x).toBeGreaterThanOrEqual(25);
      expect(b.x).toBeLessThanOrEqual(275);
      expect(b.y).toBeGreaterThanOrEqual(25);
      expect(b.y).toBeLessThanOrEqual(175);
      if (patch.x === -10) expect(b.vx).toBeGreaterThan(0);
      if (patch.x === 900) expect(b.vx).toBeLessThan(0);
      if (patch.y === -10) expect(b.vy).toBeGreaterThan(0);
      if (patch.y === 900) expect(b.vy).toBeLessThan(0);
    }
  });
  it('transfers collision momentum according to mass and separates circles', () => {
    const a = body({ x: 100, y: 100, vx: 100, vy: 0, mass: 1 }),
      b = body({ id: 1, x: 149, y: 100, vx: -50, vy: 0, mass: 4 });
    advance([a, b], 400, 300, 0.008);
    expect(a.vx).toBeLessThan(0);
    expect(b.vx).toBeGreaterThan(-50);
    expect(b.x - a.x).toBeGreaterThanOrEqual(49.99);
  });
  it('holds dragged objects, dampens throws and survives coincident centers and large frame gaps', () => {
    const held = body({ held: true }),
      free = body({ id: 1, x: 100, y: 100 });
    advance([held, free], 400, 300, 60);
    expect(held.x).toBe(100);
    expect(held.y).toBe(100);
    expect(Number.isFinite(free.x + free.y + free.vx + free.vy)).toBe(true);
    const fast = body({ x: 200, y: 200, vx: 500, vy: 0 });
    advance([fast], 1000, 1000, 0.05);
    expect(fast.vx).toBeLessThan(500);
    expect(fast.x).toBeLessThan(226);
  });
});
