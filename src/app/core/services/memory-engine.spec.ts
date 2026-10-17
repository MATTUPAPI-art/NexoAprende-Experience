import { describe, expect, it } from 'vitest';
import { MemoryEngine } from './memory-engine';

describe('MemoryEngine', () => {
  function setup() {
    const game = new MemoryEngine();
    game.reset(() => 0.5);
    return game;
  }
  it('creates twelve unique cards with exactly six pairs', () => {
    const game = setup();
    expect(new Set(game.cards.map((c) => c.id)).size).toBe(12);
    const counts = new Map<string, number>();
    for (const c of game.cards) counts.set(c.symbol, (counts.get(c.symbol) ?? 0) + 1);
    expect(counts.size).toBe(6);
    expect([...counts.values()]).toEqual([2, 2, 2, 2, 2, 2]);
  });
  it('ignores double selection and invalid cards', () => {
    const g = setup();
    const id = g.cards[0].id;
    expect(g.flip(id)).toBe('first');
    expect(g.flip(id)).toBe('ignored');
    expect(g.flip(-1)).toBe('ignored');
    expect(g.errors).toBe(0);
    expect(g.selected).toEqual([id]);
  });
  it('locks on a mismatch until concealed without accepting a third card', () => {
    const g = setup();
    const first = g.cards[0];
    const different = g.cards.find((c) => c.symbol !== first.symbol)!;
    g.flip(first.id);
    expect(g.flip(different.id)).toBe('miss');
    expect(g.errors).toBe(1);
    expect(g.flip(g.cards[2].id)).toBe('ignored');
    expect(g.selected.length).toBe(2);
    g.conceal();
    expect(g.locked).toBe(false);
    expect(g.selected).toEqual([]);
  });
  it('matches cards, prevents recounts, and detects completion only after six pairs', () => {
    const g = setup();
    for (const symbol of new Set(g.cards.map((c) => c.symbol))) {
      const pair = g.cards.filter((c) => c.symbol === symbol);
      g.flip(pair[0].id);
      expect(g.flip(pair[1].id)).toBe('match');
      expect(g.flip(pair[0].id)).toBe('ignored');
    }
    expect(g.matches).toBe(6);
    expect(g.errors).toBe(0);
    expect(g.complete).toBe(true);
    expect(g.cards.every((c) => c.matched)).toBe(true);
  });
  it('resets an in-progress round completely and shuffles using the supplied random source', () => {
    const g = setup();
    const before = g.cards.map((c) => c.id);
    g.flip(g.cards[0].id);
    g.reset(() => 0.1);
    expect(g.selected).toEqual([]);
    expect(g.matches).toBe(0);
    expect(g.errors).toBe(0);
    expect(g.complete).toBe(false);
    expect(g.cards.map((c) => c.id)).not.toEqual(before);
  });
});
