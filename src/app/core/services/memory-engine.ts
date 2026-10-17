import { MEMORY_SYMBOLS } from '../constants/demo-data';
import { MemoryCard } from '../models/models';

/** Pure game logic, independent of Angular, timers, DOM and future result API. */
export class MemoryEngine {
  cards: MemoryCard[] = [];
  selected: number[] = [];
  matches = 0;
  errors = 0;
  locked = false;
  get complete(): boolean {
    return this.matches === MEMORY_SYMBOLS.length;
  }
  reset(random: () => number = Math.random): void {
    this.cards = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS].map((item, id) => ({
      ...item,
      id,
      matched: false,
    }));
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    this.selected = [];
    this.matches = 0;
    this.errors = 0;
    this.locked = false;
  }
  flip(id: number): 'ignored' | 'first' | 'match' | 'miss' {
    const card = this.cards.find((c) => c.id === id);
    if (!card || card.matched || this.locked || this.selected.includes(id) || this.complete)
      return 'ignored';
    this.selected.push(id);
    if (this.selected.length === 1) return 'first';
    const first = this.cards.find((c) => c.id === this.selected[0])!;
    if (first.symbol === card.symbol) {
      first.matched = true;
      card.matched = true;
      this.matches++;
      this.selected = [];
      return 'match';
    }
    this.errors++;
    this.locked = true;
    return 'miss';
  }
  conceal(): void {
    this.selected = [];
    this.locked = false;
  }
}
