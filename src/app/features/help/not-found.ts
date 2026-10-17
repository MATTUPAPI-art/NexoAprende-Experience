import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon';
@Component({
  selector: 'nx-not-found',
  imports: [RouterLink, IconComponent],
  template: `<div class="panel empty-state">
    <nx-icon name="scan" />
    <h1>Este rincón aún no está en el mapa.</h1>
    <p>No encontramos la página que buscas. Tu aventura puede continuar desde el inicio.</p>
    <a routerLink="/" class="button button-primary">Volver al inicio<nx-icon name="arrow" /></a>
  </div>`,
})
export class NotFoundComponent {}
