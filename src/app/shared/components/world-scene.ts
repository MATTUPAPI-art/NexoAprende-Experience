import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Stage } from '../../core/models/models';
import { MEDIA } from '../../core/constants/media-manifest';

@Component({
  selector: 'nx-world-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[attr.data-world]': 'stage()' },
  template: ` @if (media.worlds[stage()] && !failed()) {
      <img
        [src]="media.worlds[stage()]"
        alt=""
        width="1440"
        height="576"
        [loading]="eager() ? 'eager' : 'lazy'"
        decoding="async"
        (error)="failed.set(true)"
      />
    } @else {
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
        @switch (stage()) {
          @case ('child') {
            <path fill="#dff6ff" d="M0 0h1440v600H0z" />
            <circle cx="1250" cy="100" r="65" fill="#ffd45c" />
            <circle
              cx="1250"
              cy="100"
              r="87"
              stroke="#fff8b8"
              stroke-width="2"
              stroke-dasharray="5 10"
            />
            <g fill="#fff" opacity=".9">
              <path
                d="M40 96c-8-45 60-57 75-17 32-21 71 12 57 39H33c-11-8-7-20 7-22ZM739 79c-7-35 45-51 64-19 28-19 58 1 59 24h-121Z"
              />
              <path
                d="M1120 201c-12-43 54-65 77-25 25-14 54-6 59 20 33-18 58 9 51 26h-192c-14-4-10-19 5-21Z"
              />
            </g>
            <path d="m735 421 193-288 161 288Z" fill="#b1dfdf" />
            <path d="m869 222 59-89 65 116-56-29-28 17-21-22Z" fill="#fff" />
            <path d="m953 434 215-234 170 247Z" fill="#90d1cf" />
            <path d="m1114 259 54-59 51 72-42-20-31 16Z" fill="#e5faf0" />
            <path
              d="M0 484c197-91 384-59 525-3 154 62 270-157 476-134 212 24 258 99 439 20v233H0Z"
              fill="#b8df9b"
            />
            <path d="M0 549c280-139 379 39 630-53s390-31 810 25v79H0Z" fill="#77c49b" />
            <path
              d="M1440 415c-217 34-223 66-361 94s-219 58-217 91h238c-7-34 67-34 122-58s102-76 218-72Z"
              fill="#67cce8"
            />
            <path
              d="M1106 439c-115 16-149 68-203 80s-124-12-182 81"
              stroke="#f9f2bc"
              stroke-width="31"
            />
            <path
              d="M1106 439c-115 16-149 68-203 80s-124-12-182 81"
              stroke="#e9bf70"
              stroke-width="2"
              stroke-dasharray="5 9"
            />
            <g transform="translate(1248 309)">
              <path d="M-20 86V9" stroke="#6c8f58" stroke-width="9" />
              <path d="m-20-70-47 95h94Z" fill="#48856b" />
              <path d="m-20-27-60 95H40Z" fill="#5ba879" />
            </g>
            <g transform="translate(1380 319) scale(.75)">
              <path d="M-20 86V9" stroke="#6c8f58" stroke-width="9" />
              <path d="m-20-70-47 95h94Z" fill="#48856b" />
              <path d="m-20-27-60 95H40Z" fill="#5ba879" />
            </g>
            <g transform="translate(790 217) rotate(-12)">
              <path d="M0 0 34-22 57 8 21 42Z" fill="#ee8b8c" />
              <path d="m21 42 11 18-4 12 14 18" stroke="#cf6b8d" stroke-width="3" />
              <path d="m0 0 57 8m-23-30L21 42" stroke="#fff5e8" stroke-width="2" />
            </g>
            <path d="m1192 467 8 15 17 2-13 12 3 17-15-8-15 8 3-17-13-12 17-2Z" fill="#ffdd6c" />
            <circle cx="1041" cy="415" r="5" fill="#f8f1bd" />
            <circle cx="1340" cy="531" r="5" fill="#f8f1bd" />
          }
          @case ('junior') {
            <path fill="#eeeaff" d="M0 0h1440v600H0z" />
            <path d="M870-60h570v660H900C742 485 769 292 870-60Z" fill="#dbd2ff" />
            <path
              d="M870 0v600M950 0v600M1030 0v600M1110 0v600M1190 0v600M1270 0v600M1350 0v600M800 80h640M800 160h640M800 240h640M800 320h640M800 400h640M800 480h640M800 560h640"
              stroke="#ad9ae1"
              stroke-opacity=".2"
            />
            <circle cx="1174" cy="208" r="134" fill="#9d86df" />
            <circle cx="1174" cy="208" r="101" fill="#bdacf3" />
            <ellipse
              cx="1174"
              cy="208"
              rx="196"
              ry="45"
              transform="rotate(-24 1174 208)"
              stroke="#a2d992"
              stroke-width="15"
            />
            <path d="m1175 92 11 26 28 3-21 19 6 29-24-14-25 14 6-29-21-19 28-3Z" fill="#fff2a8" />
            <g transform="rotate(-14 935 156)">
              <rect
                x="864"
                y="80"
                width="133"
                height="156"
                rx="16"
                fill="#fffdf4"
                stroke="#b19ae1"
                stroke-width="3"
              />
              <path
                d="M888 111h74m-74 15h49"
                stroke="#c7b8ec"
                stroke-width="6"
                stroke-linecap="round"
              />
              <path
                d="m897 193 17-20 16 10 29-33"
                stroke="#8b67c8"
                stroke-width="8"
                stroke-linecap="round"
              />
              <circle cx="962" cy="153" r="6" fill="#f6b46f" />
            </g>
            <g transform="translate(1110 385)">
              <ellipse cy="130" rx="155" ry="27" fill="#c6b9ea" />
              <path d="m-150 0 148-49L150 1 0 52Z" fill="#fff7d5" />
              <path d="m-150 0 150 52v79l-150-54Z" fill="#e4ba72" />
              <path d="m150 1-150 51v79l150-54Z" fill="#f3d18b" />
              <path d="m-57-31 43-15 150 49-44 15Z" fill="#e88d9d" />
            </g>
            <g transform="rotate(12 1290 380)">
              <path d="M1252 466V284l32-43 31 43v182Z" fill="#77cbbc" />
              <path d="m1252 284 32-43 31 43Z" fill="#fff2d2" />
              <path d="m1275 254 9-13 9 13Z" fill="#51406c" />
              <path d="M1272 297v146" stroke="#9ee1d4" stroke-width="12" />
            </g>
            <g transform="translate(854 357)">
              <rect x="-47" y="-25" width="95" height="112" rx="23" fill="#a0d7c5" />
              <path
                d="M-19-25v-46h37v46m-28 40 7 10 21-26"
                stroke="#467e72"
                stroke-width="7"
                stroke-linecap="round"
              />
              <circle cx="-11" cy="-56" r="4" fill="#fff4cc" />
              <circle cx="11" cy="52" r="7" fill="#fff4cc" />
            </g>
            <g stroke="#8f72c1" stroke-width="3" stroke-linecap="round">
              <path d="m1060 65 5-12m2 27 12-2M1407 322v20m-10-10h20M801 284l12 12-12 12" />
            </g>
          }
          @case ('teen') {
            <path fill="#142443" d="M0 0h1440v600H0z" />
            <path d="M655 0h785v600H790c-116-124-51-331-135-600Z" fill="#1a3156" />
            <path
              d="m630 600 599-312 211 92M720 600l599-312m-420 312 541-283M1080 600l360-188M600 474l300 126m-213-173 394 173m-307-218 483 218m-391-261 574 242"
              stroke="#3d5d7b"
              stroke-width="1"
            />
            <g stroke="#52789a" stroke-width="2">
              <path d="m913 368 132-70 131 69-132 73Z" fill="#26486e" />
              <path d="M913 368v103l131 68V440Z" fill="#203b60" />
              <path d="M1176 367v102l-132 70v-99Z" fill="#335b78" />
            </g>
            <g stroke="#72cfce" stroke-width="2">
              <path d="m1098 201 130-71 130 71-130 71Z" fill="#264d6c" />
              <path d="M1098 201v149l130 72V272Z" fill="#183e5c" />
              <path d="M1358 201v149l-130 72V272Z" fill="#25596c" />
              <path
                d="m1120 220 85 45m-85-24 85 45m-85-23 85 45m-85-23 85 45"
                stroke-opacity=".5"
              />
            </g>
            <path
              d="m805 382 92-48 50 25m235 95 75-41 58 32M1332 523l-90-47"
              stroke="#62d7c7"
              stroke-width="4"
              stroke-linecap="round"
            />
            <circle cx="805" cy="382" r="7" fill="#a7edda" />
            <circle cx="1315" cy="445" r="6" fill="#62d7c7" />
            <circle cx="1332" cy="523" r="6" fill="#a9affb" />
            <g transform="translate(910 175) rotate(-8)">
              <rect
                x="-82"
                y="-73"
                width="165"
                height="120"
                rx="12"
                fill="#29446e"
                stroke="#7a92c5"
                stroke-width="2"
              />
              <path
                d="m-35-25-18 16 18 16m66-32L49-9 31 7m-20-44L-4 19"
                stroke="#9fe5da"
                stroke-width="5"
                stroke-linecap="round"
              />
              <path d="M-52 64H55" stroke="#a3a4ed" stroke-width="5" stroke-linecap="round" />
            </g>
            <circle cx="1291" cy="66" r="27" stroke="#8e95e8" stroke-width="2" />
            <circle cx="1291" cy="66" r="7" fill="#b3b9fa" />
            <path
              d="m1320 110 13 13-13 13m-196-70 10-10m-2 25h15"
              stroke="#76bfbf"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path d="M812 52h82M812 62h47M1364 291h50" stroke="#5f87a3" stroke-width="2" />
          }
        }
      </svg>
    }`,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    svg,
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
})
export class WorldSceneComponent {
  readonly eager = input(false);
  readonly media = MEDIA;
  readonly failed = signal(false);
  readonly stage = input<Stage>('junior');
}
