import { ChangeDetectionStrategy, Component, input } from '@angular/core';
export type UniverseCategory = 'planets' | 'balls' | 'animals';
export const OBJECT_NAMES = {
  planets: ['Tierra', 'Saturno', 'Júpiter', 'Marte', 'Neptuno', 'Venus'],
  balls: ['Fútbol', 'Baloncesto', 'Tenis', 'Voleibol', 'Béisbol', 'Pelota creativa'],
  animals: ['Perro', 'Gato', 'Zorro', 'Panda', 'Búho', 'Conejo'],
};
@Component({
  selector: 'nx-floating-object',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `<svg viewBox="0 0 100 100" fill="none">
    @if (category() === 'planets') {
      @if (index() === 1) {
        <ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="16"
          transform="rotate(-25 50 50)"
          stroke="#ecc69d"
          stroke-width="8"
        />
      }
      <circle cx="50" cy="50" r="34" [attr.fill]="planetColors[index()]" />
      @switch (index()) {
        @case (0) {
          <path
            d="m28 25 18-7 6 10-8 8 13 9-6 12-10-3-6-14-12-2Zm27 36 19-14 8 13-13 18-10-5Z"
            fill="#88d8b2"
          />
        }
        @case (2) {
          <path
            d="M22 34q29 15 56 0M17 49q33-10 66 0M22 65q31 12 56 0"
            stroke="#d3a28f"
            stroke-width="7"
          />
          <ellipse cx="65" cy="58" rx="9" ry="5" fill="#a35b58" />
        }
        @case (3) {
          <circle cx="40" cy="35" r="9" fill="#a44747" />
          <circle cx="63" cy="61" r="12" fill="#b95a4c" />
        }
        @case (4) {
          <path d="M24 35q30 10 52 0M19 56q31-10 62 0" stroke="#81a5fa" stroke-width="6" />
        }
      }
      <path
        d="M27 38a27 27 0 0 1 24-16"
        stroke="#ffffff7a"
        stroke-width="5"
        stroke-linecap="round"
      />
      <path d="M77 39a33 33 0 0 1-40 41" stroke="#14244333" stroke-width="6" />
      @if (index() === 1) {
        <path d="M9 69q51 0 82-38" stroke="#f7dcb6" stroke-width="6" stroke-linecap="round" />
      }
    } @else if (category() === 'balls') {
      <circle cx="50" cy="50" r="37" [attr.fill]="ballColors[index()]" />
      @switch (index()) {
        @case (0) {
          <path
            d="m50 35 15 11-6 17H41l-6-17Z M22 25l12 2-8 17-12-2m64-17-12 2 8 17 12-2M28 79l8-13 12 12-4 9m28-8-8-13-12 12 4 9"
            fill="#334057"
          />
          <path
            d="m50 35-1-22M65 46l20-5M59 63l10 16M41 63 28 79M35 46l-21-4"
            stroke="#334057"
            stroke-width="2"
          />
        }
        @case (1) {
          <circle cx="50" cy="50" r="36" stroke="#704435" stroke-width="2" />
          <path
            d="M14 50h72M50 14v72M25 23q46 27 0 54M75 23Q29 50 75 77"
            stroke="#704435"
            stroke-width="3"
          />
        }
        @case (2) {
          <path d="M25 22Q68 50 25 78M75 22Q32 50 75 78" stroke="#fffde2" stroke-width="5" />
        }
        @case (3) {
          <path
            d="m50 50 2-36m-2 36 32 18m-32-18L18 70M21 28q30-3 29 22M80 28Q70 56 50 50M50 86Q30 68 50 50"
            stroke="#587ac2"
            stroke-width="4"
          />
        }
        @case (4) {
          <path
            d="M26 22q30 28 0 56m48-56Q44 50 74 78"
            stroke="#c95771"
            stroke-width="3"
            stroke-dasharray="4 3"
          />
        }
        @default {
          <path d="M20 30 80 70M20 70l60-40" stroke="#fff8" stroke-width="10" />
        }
      }
      <path d="M27 35q8-12 20-13" stroke="#fff8" stroke-width="4" stroke-linecap="round" />
    } @else {
      <path
        [attr.d]="
          index() === 0
            ? 'M24 35Q0 30 10 65l21-4m45-26q24-5 14 30l-21-4'
            : index() === 5
              ? 'M25 36Q9-10 30 6l13 30m14 0Q69-10 77 6l-2 30'
              : 'M19 40 17 9l30 20m6 0L83 9l-2 31'
        "
        [attr.fill]="animalColors[index()]"
        stroke="#373958"
        stroke-width="2"
      />
      <rect x="17" y="26" width="66" height="61" rx="28" [attr.fill]="animalColors[index()]" />
      @if (index() === 3) {
        <circle cx="25" cy="27" r="12" fill="#34394b" />
        <circle cx="75" cy="27" r="12" fill="#34394b" />
        <ellipse cx="35" cy="54" rx="12" ry="15" fill="#34394b" />
        <ellipse cx="65" cy="54" rx="12" ry="15" fill="#34394b" />
      }
      @if (index() === 2 || index() === 4) {
        <path d="M21 48q17 0 29 20 12-20 29-20v17q-29 35-58 0Z" fill="#fff2da" />
      }
      <ellipse cx="36" cy="54" rx="4" ry="6" [attr.fill]="index() === 3 ? '#fff' : '#303653'" />
      <ellipse cx="64" cy="54" rx="4" ry="6" [attr.fill]="index() === 3 ? '#fff' : '#303653'" />
      <path d="m44 66 6 5 6-5" stroke="#303653" stroke-width="4" stroke-linejoin="round" />
      <path d="M39 75q11 7 22 0" stroke="#303653" stroke-width="2" stroke-linecap="round" />
      <ellipse cx="27" cy="67" rx="6" ry="3" fill="#f0a5aa" />
      <ellipse cx="73" cy="67" rx="6" ry="3" fill="#f0a5aa" />
    }
  </svg>`,
  styles: `
    :host,
    svg {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    svg {
      filter: drop-shadow(0 6px 4px #101a4033);
    }
  `,
})
export class FloatingObjectComponent {
  readonly category = input<UniverseCategory>('planets');
  readonly index = input(0);
  readonly planetColors = ['#4c8ad7', '#cdb394', '#e6c3a0', '#e4826c', '#5579db', '#e6c580'];
  readonly ballColors = ['#f5f6fb', '#ee9a51', '#c4dc71', '#f0e9dd', '#fff0dd', '#a88aec'];
  readonly animalColors = ['#d6a577', '#b2bbc9', '#e9a16c', '#f0eee9', '#b6a1dc', '#dfd1e9'];
}
