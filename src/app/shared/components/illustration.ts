import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { VisibleAnimationDirective } from '../directives/visible-animation';

@Component({
  selector: 'nx-illustration',
  hostDirectives: [VisibleAnimationDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <svg viewBox="0 0 480 340" fill="none" aria-hidden="true">
    @switch (scene()) {
      @case ('hero') {
        <circle cx="268" cy="174" r="132" fill="#9582e1" fill-opacity=".25" />
        <circle
          cx="268"
          cy="174"
          r="157"
          stroke="#c1afff"
          stroke-opacity=".24"
          stroke-dasharray="4 10"
        />
        <path
          d="M77 235c52-61 244-116 339-80"
          stroke="#d8c9ff"
          stroke-width="1.5"
          stroke-dasharray="4 6"
        />
        <g class="float-slow">
          <circle cx="356" cy="76" r="29" fill="#f6c991" />
          <path
            d="M329 68c9 19 32 28 55 21M333 58c9 17 30 27 51 24"
            stroke="#dfa477"
            stroke-width="5"
            stroke-linecap="round"
          />
          <ellipse
            cx="356"
            cy="77"
            rx="47"
            ry="10"
            transform="rotate(-26 356 77)"
            stroke="#ffe4c4"
            stroke-width="6"
          />
        </g>
        <g transform="rotate(-12 246 220)">
          <ellipse cx="245" cy="285" rx="110" ry="16" fill="#37265d" fill-opacity=".16" />
          <circle cx="244" cy="228" r="80" fill="#bce7cf" />
          <path
            d="M178 185c31-19 49-5 54 12s40-1 48 15 20 31 37 31M175 249c25-5 38 13 42 45M243 151c1 22 28 32 42 18"
            stroke="#8fc9ad"
            stroke-width="15"
            stroke-linecap="round"
          />
          <path
            d="M146 249c23 19 81 20 143-5s94-58 84-70"
            stroke="#fff0c4"
            stroke-width="12"
            stroke-linecap="round"
          />
          <path
            d="M146 249c-13-14 5-35 32-53m172-31c11-1 19 2 23 9"
            stroke="#fff0c4"
            stroke-width="8"
            stroke-linecap="round"
          />
        </g>
        <g class="float-slow" style="animation-delay:-2s">
          <path
            d="m242 151-25 30 14 15 29-25M289 149l21 28-12 15-26-24"
            fill="#fcfaf4"
            stroke="#ddd5ef"
            stroke-width="3"
          />
          <path d="m237 166 8-43h40l9 43c-17 12-41 12-57 0" fill="#fffdf8" />
          <path d="m248 166-7 29 13 4 15-27m7 0 6 28 14-3-6-31" fill="#e5dff1" />
          <rect x="255" y="138" width="21" height="15" rx="5" fill="#b1ddca" />
          <circle cx="266" cy="103" r="41" fill="#fffdf8" />
          <rect x="228" y="85" width="76" height="40" rx="20" fill="#dad2f0" />
          <rect x="236" y="88" width="60" height="32" rx="16" fill="#4f416f" />
          <path
            d="M245 99c8-8 16-5 21-5"
            stroke="#9185a8"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path d="M264 108h3m16 0h3" stroke="#ffefcf" stroke-width="4" stroke-linecap="round" />
          <circle cx="225" cy="104" r="8" fill="#d2c5eb" />
          <circle cx="307" cy="104" r="8" fill="#d2c5eb" />
          <path d="m252 59-1-13 16-6" stroke="#fffdf8" stroke-width="3" stroke-linecap="round" />
          <circle cx="270" cy="39" r="5" fill="#f5cc8f" />
        </g>
        <g fill="#fbeac0">
          <path
            d="m111 107 4 11 11 4-11 4-4 11-4-11-11-4 11-4ZM399 224l3 8 9 3-9 3-3 9-3-9-8-3 8-3Z"
          />
          <circle cx="167" cy="52" r="3" />
          <circle cx="402" cy="129" r="3" />
          <circle cx="127" cy="270" r="3" />
          <circle cx="324" cy="302" r="2" />
        </g>
        <g transform="rotate(-16 115 207)">
          <rect x="84" y="184" width="57" height="43" rx="13" fill="#fcf8ef" />
          <path
            d="m100 205 8 7 15-16"
            stroke="#79ac90"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      }
      @case ('memory') {
        <circle cx="250" cy="175" r="113" fill="#e0d8f4" />
        <g transform="rotate(-14 182 170)">
          <rect x="112" y="78" width="135" height="182" rx="22" fill="#a395ce" />
          <rect
            x="112"
            y="70"
            width="135"
            height="182"
            rx="22"
            fill="#faf7ff"
            stroke="#cfc2ed"
            stroke-width="3"
          />
          <path d="m180 106 14 31 35 4-26 24 7 35-30-17-31 17 7-35-25-24 35-4Z" fill="#c8b4ed" />
          <circle cx="170" cy="152" r="3" fill="#71618e" />
          <circle cx="191" cy="152" r="3" fill="#71618e" />
          <path d="M174 164q7 6 14 0" stroke="#71618e" stroke-width="3" stroke-linecap="round" />
        </g>
        <g transform="rotate(12 299 180)">
          <rect x="234" y="100" width="135" height="182" rx="22" fill="#a395ce" />
          <rect
            x="234"
            y="91"
            width="135"
            height="182"
            rx="22"
            fill="#faf7ff"
            stroke="#cfc2ed"
            stroke-width="3"
          />
          <path d="m301 127 14 31 35 4-26 24 7 35-30-17-31 17 7-35-25-24 35-4Z" fill="#c8b4ed" />
          <circle cx="291" cy="173" r="3" fill="#71618e" />
          <circle cx="312" cy="173" r="3" fill="#71618e" />
          <path d="M295 185q7 6 14 0" stroke="#71618e" stroke-width="3" stroke-linecap="round" />
        </g>
        <path
          d="m91 93 4 10 10 4-10 4-4 10-4-10-10-4 10-4Zm294 141 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
          fill="#a088ca"
        />
      }
      @case ('attention') {
        <circle cx="240" cy="170" r="113" fill="#cbe7d9" />
        <path
          d="m179 135-17-45c-9-22-32-6-32 14v54m171-23 17-45c9-22 32-6 32 14v54"
          fill="#b9875d"
        />
        <path
          d="M154 170c0-57 36-75 86-75s86 18 86 75v39c0 42-35 68-86 68s-86-26-86-68Z"
          fill="#e7bd8b"
        />
        <ellipse cx="238" cy="223" rx="48" ry="35" fill="#fff0d8" />
        <ellipse cx="240" cy="208" rx="16" ry="12" fill="#685345" />
        <path
          d="M240 216v15m-15 0q15 15 30 0"
          stroke="#685345"
          stroke-width="4"
          stroke-linecap="round"
        />
        <circle cx="204" cy="173" r="7" fill="#685345" />
        <circle cx="276" cy="173" r="7" fill="#685345" />
        <circle cx="183" cy="199" r="10" fill="#dc9e87" />
        <circle cx="297" cy="199" r="10" fill="#dc9e87" />
        <circle
          cx="319"
          cy="229"
          r="41"
          fill="#e9f6ef"
          fill-opacity=".65"
          stroke="#538c77"
          stroke-width="11"
        />
        <path d="m350 260 35 36" stroke="#538c77" stroke-width="16" stroke-linecap="round" />
        <path d="m101 153 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="#6fa68c" />
      }
      @case ('reading') {
        <circle cx="240" cy="170" r="113" fill="#f7dfb4" />
        <path
          d="M111 129c50-17 92-11 129 16 37-27 79-33 129-16v139c-44-17-86-12-129 12-43-24-85-29-129-12Z"
          fill="#c89663"
        />
        <path
          d="M119 113c49-15 86-7 121 18 35-25 72-33 121-18v140c-45-12-85-5-121 16-36-21-76-28-121-16Z"
          fill="#fffaf0"
        />
        <path d="M240 131v138" stroke="#e5d1af" stroke-width="3" />
        <path
          d="m143 145 68 12m-68 12 68 12m-68 12 68 12m-68 12 40 7m86-67 68-12m-68 36 68-12m-68 36 68-12m-68 36 40-7"
          stroke="#d8bd95"
          stroke-width="6"
          stroke-linecap="round"
        />
        <path d="m234 49 8 19 21 2-16 14 5 21-18-10-19 10 4-21-15-14 21-2Z" fill="#e3ad55" />
        <path
          d="M156 70q-20 17-11 33m181-31q19 13 11 32"
          stroke="#d5a258"
          stroke-width="3"
          stroke-linecap="round"
        />
      }
    }
  </svg>`,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `,
})
export class IllustrationComponent {
  readonly scene = input('hero');
}
