import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService, stageForAge } from '../../core/services/profile.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { IconComponent } from '../../shared/components/icon';
import { IllustrationComponent } from '../../shared/components/illustration';

@Component({
  selector: 'nx-experience-selector',
  imports: [FormsModule, PageHeadingComponent, IconComponent, IllustrationComponent],
  template: `
    <nx-page-heading
      eyebrow="UNA EXPERIENCIA TAN ÚNICA COMO TÚ"
      title="Tu aventura, a tu manera."
      description="Cuéntanos un poquito de ti y adaptaremos tu espacio para aprender."
    />
    <div class="selector-grid">
      <form class="panel selector-form" (ngSubmit)="save()">
        <span class="step-label">01 <span>HAGAMOS ESPACIO PARA TI</span></span>
        <h2>¿Cómo te llamamos?</h2>
        <div class="form-field">
          <label for="name">Tu nombre o apodo</label
          ><input
            id="name"
            name="name"
            [ngModel]="name()"
            (ngModelChange)="name.set($event)"
            maxlength="24"
            autocomplete="nickname"
            placeholder="Por ejemplo, Alex"
          /><small>Usa un apodo. No necesitamos tu nombre completo.</small>
        </div>
        <div class="form-field">
          <label for="age"
            >¿Cuántos años tienes? <strong class="selected-age">{{ age() }} años</strong></label
          ><input
            id="age"
            type="range"
            name="age"
            min="5"
            max="18"
            step="1"
            [ngModel]="age()"
            (ngModelChange)="age.set(+$event)"
            [attr.aria-valuetext]="age() + ' años'"
          />
          <div class="range-labels"><span>5 años</span><span>18 años</span></div>
        </div>
        <div class="stage-options">
          @for (item of stages; track item.id) {
            <button
              type="button"
              class="stage-option"
              [class.selected]="stage() === item.id"
              [attr.aria-pressed]="stage() === item.id"
              (click)="age.set(item.age)"
            >
              <span>{{ item.icon }}</span
              ><strong>{{ item.label }}</strong
              ><small>{{ item.range }}</small>
            </button>
          }
        </div>
        <p class="small muted">La edad adapta el diseño; no es una evaluación de habilidades.</p>
        <button type="submit" class="button button-primary save-experience">
          Guardar y entrar a mi espacio<nx-icon name="arrow" />
        </button>
        <p class="privacy-note">
          <nx-icon name="shield" />Tu perfil se guarda únicamente en este navegador.
        </p>
      </form>
      <section
        class="experience-preview"
        [attr.data-preview]="stage()"
        aria-labelledby="preview-title"
      >
        <span class="preview-label"><span></span>VISTA PREVIA EN TIEMPO REAL</span
        ><nx-illustration scene="hero" />
        <div class="preview-copy">
          <span class="badge">{{ stageLabel() }} · {{ age() }} años</span>
          <h2 id="preview-title">
            {{
              stage() === 'child'
                ? '¡Vamos a jugar, '
                : stage() === 'teen'
                  ? 'Tu próximo reto, '
                  : 'Un universo para ti, '
            }}{{ name().trim() || 'Alex' }}.
          </h2>
          <p>{{ previewDescription() }}</p>
          <span class="preview-button"
            >{{
              stage() === 'child'
                ? '¡A descubrir!'
                : stage() === 'teen'
                  ? 'Explorar mis retos'
                  : 'Comenzar mi aventura'
            }}<nx-icon name="arrow"
          /></span>
        </div>
        <small>Colores, formas y lenguaje que crecen contigo.</small>
      </section>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .selector-grid {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 25px;
    }
    .selector-form {
      padding: 30px;
    }
    .step-label {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--primary);
      font-family: var(--font-heading);
      font-size: 22px;
    }
    .step-label > span {
      font-family: var(--font-body);
      font-size: 8px;
      font-weight: 850;
      letter-spacing: 1px;
      color: var(--muted);
    }
    .selector-form h2 {
      margin: 17px 0 0;
      font-size: 24px;
    }
    .selected-age {
      float: right;
      color: var(--primary);
      font-size: 14px;
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: var(--muted);
    }
    .stage-options {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin: 25px 0;
    }
    .stage-option {
      border: 1px solid var(--border);
      border-radius: 12px;
      background: #fff;
      min-height: 100px;
      padding: 12px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 7px;
    }
    .stage-option.selected {
      background: #f1ebf8;
      border-color: #a48bbe;
    }
    .stage-option > span {
      font-size: 20px;
    }
    .stage-option strong {
      font-size: 10px;
    }
    .stage-option small {
      font-size: 9px;
      color: var(--muted);
    }
    .save-experience {
      width: 100%;
      margin-top: 10px;
    }
    .privacy-note {
      display: flex;
      justify-content: center;
      gap: 7px;
      align-items: center;
      font-size: 9px;
      color: var(--muted);
      margin-top: 17px;
    }
    .privacy-note nx-icon {
      width: 13px;
      height: 13px;
    }
    .experience-preview {
      display: flex;
      flex-direction: column;
      padding: 25px;
      border-radius: 22px;
      background: #eee8f8;
      border: 1px solid #e3daef;
      color: #514269;
      transition: background 0.3s ease;
    }
    .preview-label {
      font-size: 8px;
      letter-spacing: 1px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .preview-label > span {
      width: 5px;
      height: 5px;
      background: #8a6aaf;
      border-radius: 50%;
    }
    .experience-preview nx-illustration {
      height: 230px;
      background: #7962b6;
      border-radius: 16px;
      margin: 22px 0;
    }
    .preview-copy {
      padding: 0 5px;
    }
    .preview-copy h2 {
      font-size: 28px;
      margin: 17px 0 12px;
    }
    .preview-copy p {
      font-size: 13px;
      max-width: 320px;
      line-height: 1.8;
    }
    .preview-button {
      display: inline-flex;
      gap: 12px;
      align-items: center;
      min-height: 44px;
      font-size: 12px;
      font-weight: 800;
      background: #8063b5;
      color: white;
      padding: 13px 20px;
      border-radius: 10px;
      margin-top: 7px;
    }
    .experience-preview > small {
      font-size: 9px;
      margin-top: auto;
      padding-top: 25px;
      color: #6c607c;
    }
    .experience-preview[data-preview='child'] {
      background: #eef2d9;
      border-color: #e0e7bd;
      border-radius: 32px;
      color: #4e6348;
    }
    .experience-preview[data-preview='child'] h2 {
      font-family: 'Nunito Sans Variable', sans-serif;
      font-weight: 850;
    }
    .experience-preview[data-preview='child'] nx-illustration {
      border-radius: 28px;
      background: #8d77be;
    }
    .experience-preview[data-preview='child'] .preview-button {
      border-radius: 20px;
      font-size: 15px;
    }
    .experience-preview[data-preview='teen'] {
      background: #e9eef4;
      border-color: #d9e0ea;
      border-radius: 12px;
      color: #374c66;
    }
    .experience-preview[data-preview='teen'] nx-illustration {
      background: #52698e;
      border-radius: 8px;
      height: 180px;
    }
    .experience-preview[data-preview='teen'] .preview-button {
      background: #52698e;
      border-radius: 7px;
    }
    @media (max-width: 800px) {
      .selector-grid {
        grid-template-columns: 1fr;
      }
      .experience-preview nx-illustration {
        height: 200px;
      }
      .selector-form {
        padding: 23px;
      }
    }
  `,
})
export class ExperienceSelectorComponent {
  private readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);
  readonly name = signal(this.profiles.profile().name);
  readonly age = signal(this.profiles.profile().age);
  readonly stage = computed(() => stageForAge(this.age()));
  readonly stageLabel = computed(
    () => ({ child: 'Infancia', junior: 'Etapa juvenil', teen: 'Adolescencia' })[this.stage()],
  );
  readonly previewDescription = computed(
    () =>
      ({
        child:
          'Formas redonditas, botones grandes y amigos que te acompañan. ¡Cada descubrimiento es una alegría!',
        junior:
          'Retos, pequeñas sorpresas y nuevas habilidades por descubrir. Tu curiosidad es el punto de partida.',
        teen: 'Un espacio claro para concentrarte, explorar tus habilidades y ver tu progreso con autonomía.',
      })[this.stage()],
  );
  readonly stages = [
    { id: 'child', label: 'Infancia', range: '5–9 años', age: 7, icon: '🌱' },
    { id: 'junior', label: 'Juvenil', range: '10–13 años', age: 11, icon: '🪐' },
    { id: 'teen', label: 'Adolescencia', range: '14–18 años', age: 16, icon: '✦' },
  ];
  save(): void {
    this.profiles.save(this.name(), this.age());
    void this.router.navigateByUrl('/panel');
  }
}
