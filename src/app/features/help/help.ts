import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PreferenceService } from '../../core/services/preference.service';
import { PageHeadingComponent } from '../../shared/components/page-heading';
import { IconComponent } from '../../shared/components/icon';

@Component({
  selector: 'nx-help',
  imports: [RouterLink, PageHeadingComponent, IconComponent],
  template: `
    <nx-page-heading
      eyebrow="UN ESPACIO QUE SE ADAPTA A TI"
      title="Estamos para acompañarte."
      description="Accesibilidad, privacidad y algunas respuestas para explorar con confianza."
    />
    <div class="two-column">
      <section class="panel">
        <span class="round-icon sage"><nx-icon name="leaf" /></span>
        <h2>El movimiento, a tu manera.</h2>
        <p class="small muted">
          Pausa las animaciones decorativas en cualquier momento. Tu elección se recuerda en este
          navegador.
        </p>
        <button
          class="button button-secondary"
          [attr.aria-pressed]="!preferences.motion()"
          [disabled]="preferences.systemReduced()"
          (click)="preferences.toggleMotion()"
        >
          {{ preferences.motion() ? 'Pausar animaciones' : 'Movimiento reducido activo'
          }}<nx-icon name="leaf" />
        </button>
        @if (preferences.systemReduced()) {
          <p class="small muted">
            Tu sistema solicita movimiento reducido. Respetamos esa preferencia automáticamente.
          </p>
        }
      </section>
      <section class="panel">
        <span class="round-icon lavender"><nx-icon name="shield" /></span>
        <h2>Tus datos se quedan aquí.</h2>
        <p class="small muted">
          El apodo, la edad, las preferencias y hasta 200 resultados se guardan en el almacenamiento
          local de este navegador. Esta versión no tiene servidor, cuentas, rastreadores ni base de
          datos externa.
        </p>
        <p class="small muted">
          En un dispositivo compartido, otras personas pueden ver estos datos. Puedes eliminarlos
          borrando los datos del sitio desde tu navegador. No introduzcas información sensible.
        </p>
      </section>
    </div>
    <details open>
      <summary>¿Cómo navego con teclado?</summary>
      <p>
        Usa Tab para avanzar y Mayús + Tab para retroceder. Enter abre enlaces; Enter o Espacio
        activa botones y tarjetas. Las flechas cambian la edad en el selector. El enlace “Saltar al
        contenido” aparece al recibir foco. Escape cierra el menú móvil y los resultados del juego.
      </p>
    </details>
    <details>
      <summary>¿Cómo cambio entre día y noche?</summary>
      <p>
        Usa el botón de sol o luna del encabezado. Tu elección se conserva al navegar y volver a
        abrir este navegador. Las fotos mantienen sus colores originales.
      </p>
    </details>
    <details>
      <summary>¿Los lanzamientos cuentan en mi progreso?</summary>
      <p>
        El universo es un recreo libre. Arrastra un objeto y suéltalo para sumar un lanzamiento; un
        clic no suma. Con teclado, mueve el objeto con las flechas y lánzalo con Enter o Espacio.
        Escape cancela el movimiento con teclado. Puedes pausar el universo y reiniciar el contador.
        Los lanzamientos se reinician al salir del inicio y nunca se guardan como resultados
        educativos.
      </p>
    </details>
    <details>
      <summary>¿Las actividades sirven para hacer diagnósticos?</summary>
      <p>
        No. Son experiencias educativas para practicar atención, memoria y comprensión lectora. Sus
        resultados describen una partida y no indican autismo, TDAH, dislexia ni otras condiciones.
      </p>
    </details>
    <details>
      <summary>¿Qué está disponible en esta primera versión?</summary>
      <p>
        El juego de memoria, el perfil local, las preferencias y el historial funcionan. Atención,
        lectura, el gráfico semanal y los vínculos de tutor y profesional son demostraciones
        identificadas como tales.
      </p>
    </details>
    <details>
      <summary>¿Puedo cambiar mi edad o mi apodo?</summary>
      <p>
        Sí. Abre “Personaliza tu experiencia” o tu avatar. El diseño se adapta a infancia (5–9),
        etapa juvenil (10–13) y adolescencia (14–18). El perfil local y sus resultados se conservan
        al cambiar la edad o el apodo.
      </p>
      <a routerLink="/experiencia" class="text-link"
        >Personalizar mi experiencia<nx-icon name="arrow"
      /></a>
    </details>
    <details>
      <summary>¿Qué ocurre al pausar o salir del juego?</summary>
      <p>
        El botón Pausar detiene el cronómetro y oculta las imágenes. Al cambiar de pestaña la
        partida se pausa automáticamente. Salir de la pantalla descarta la partida sin terminar;
        solo las partidas completadas se guardan.
      </p>
    </details>
  `,
})
export class HelpComponent {
  readonly preferences = inject(PreferenceService);
}
