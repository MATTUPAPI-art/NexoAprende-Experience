# NexoAprende Experience

**Aplicación pública:** https://mattupapi-art.github.io/NexoAprende-Experience/

Despliegue automático al actualizar `main`: [configuración y pruebas de GitHub Pages](docs/GITHUB-PAGES.md).

Primera versión funcional — **Hito 1**, aplicación gráfica y multimedia con Angular. Una plataforma educativa en español para explorar atención, memoria y comprensión lectora entre los 5 y los 18 años.

Renovación actual: universo con física, planetas/pelotas/animales que se arrastran y lanzan, modo día/noche persistente, logotipo y Nexito aportados, doce fondos personalizados, videos reales y fotografías optimizadas. Inventario, controles y verificación: [docs/RENOVACION-MULTIMEDIA.md](docs/RENOVACION-MULTIMEDIA.md). La [renovación artística anterior](docs/RENOVACION-ARTISTICA.md) y la [segunda mejora visual](docs/MEJORA-VISUAL.md) quedan como registros históricos.

Proyecto independiente en `nexoaprende-experience`. No se usa ni se modifica el proyecto `plataforma-apoyo-infantil`, su repositorio, Laravel ni su base de datos. La aplicación se publica como sitio estático; no hay autenticación real, backend ni PostgreSQL.

Entrega para **Programación Gráfica y Multimedia**: descripción académica del uso de Codex en [AGENTE_IA.md](AGENTE_IA.md), código fuente y multimedia del producto. El video explicativo se entrega por separado. La grabación ajena utilizada como referencia está excluida del proyecto público y de la entrega.

Los archivos a adjuntar y el estado de publicación se describen en [docs/ENTREGA.md](docs/ENTREGA.md).

## Ejecutar localmente

Entorno verificado: **Angular y CLI 22.2.3**, TypeScript 6.0.3, Node.js 24.20.0, npm 11.19.0, Windows. Usar una versión de Node compatible con los `engines` de package.json. [Compatibilidad oficial de Angular](https://angular.dev/reference/versions).

```powershell
cd nexoaprende-experience
npm install
npm start
```

Abrir **http://127.0.0.1:4307/**. El puerto es propio para evitar interferir con otras aplicaciones locales en 4200. `npm start` utiliza el CLI **local**; no hace falta actualizar el CLI global. En VS Code, F5 con la configuración `NexoAprende · Chrome` inicia la aplicación y abre Chrome.

Primero descomprimir el ZIP del código o clonar el repositorio, y abrir una terminal en la carpeta que contiene `package.json`. `npm install` instala también las herramientas de desarrollo necesarias para compilar y comprobar la aplicación. El archivo `package-lock.json` se conserva para reproducir las versiones; `npm ci` es una alternativa cuando se requiere una instalación estricta del lockfile. Para recorrer las funciones y sus botones, consultar [COMPROBACION-FUNCIONAL.md](docs/COMPROBACION-FUNCIONAL.md).

```powershell
npm run build
npm test
npm run test:e2e
git diff --check
```

`npm test` usa Vitest sin modo interactivo. Las pruebas E2E usan Playwright y axe-core, arrancan su propio servidor en **4317** y lo detienen al terminar; la vista local en 4307 puede permanecer abierta. La configuración evita reutilizar por error otro sitio. En Windows se utiliza Chrome si está instalado en su ruta habitual. En otros entornos, instalar el navegador de pruebas con `npx playwright install chromium`.

El build de producción se genera en `dist/nexoaprende-experience/browser`, con base `/NexoAprende-Experience/` y rutas con `#` para permitir la recarga en GitHub Pages. `npm run build:pages` compila y verifica el artefacto; `npm run serve:pages` permite revisarlo en `http://127.0.0.1:4327/NexoAprende-Experience/`. Consultar [GITHUB-PAGES.md](docs/GITHUB-PAGES.md) para pruebas y despliegue automático. La vista de desarrollo mediante `npm start` conserva sus rutas locales habituales.

## Pantallas y alcance

| Ruta | Entrega |
| --- | --- |
| `/` | Inicio ilustrado por edad, universo de física con tres categorías y contador recreativo, videos y Nexito interactivo. |
| `/experiencia` | Apodo opcional, edad de 5 a 18, detección de etapa, previsualización y persistencia. |
| `/panel` | Perfil local, actividades, meta real, última partida y gráfico semanal **simulado**, señalado como ejemplo. |
| `/actividades` | Catálogo filtrable, estados, dificultad inicial, duración estimada y enlaces funcionales. |
| `/actividades/memory` | Juego **operativo**, con instrucciones, 12 tarjetas, 6 parejas, cronómetro, pausa, reinicio y modal. |
| `/actividades/attention` | Vista previa de Encuentra los perros, instrucciones y objetivo educativo; **sin mecánica jugable**. |
| `/actividades/reading` | Vista previa de comprensión lectora, texto original de ejemplo e instrucciones; **sin preguntas interactivas**. |
| `/progreso` | Sesiones, aciertos, errores, tiempo, nivel, meta e historial de resultados **reales de este navegador**. |
| `/tutor` | Perfiles y vínculos **ficticios**, orientaciones educativas y acceso al resumen local real. |
| `/profesional` | Profesional y autorizaciones **simulados**; guías que se pueden abrir y cerrar, sin recoger respuestas. |
| `/ayuda` | Accesibilidad, privacidad, teclado y alcance de la demostración. |
| Cualquier otra | Página 404 con regreso al inicio. |

La identidad inicial Alex, de 10 años, se identifica como perfil de ejemplo. Al guardar el apodo y la edad, se personaliza el único perfil local. Cambiar esos datos conserva su historial; no se crean cuentas ni perfiles independientes. Lucía y María Torres son personas ficticias del ejemplo.

### Juego de memoria

- Barajado Fisher–Yates; seis imágenes duplicadas. Ignora dobles selecciones y bloquea una tercera tarjeta durante una comparación fallida.
- Una coincidencia permanece descubierta. Una comparación diferente cuenta un error y se oculta tras 1,1 segundos.
- Cronómetro basado en tiempo transcurrido, sin límite ni puntuación de rapidez. Pausa manual y automática al ocultar la pestaña; requiere Continuar para reanudar.
- Reiniciar descarta la partida actual. Navegar a otra pantalla limpia intervalos y temporizadores. Solo se registran partidas completadas, una vez por partida.
- Modal nativo `dialog` con foco contenido, cierre con Escape, regreso al tablero, nueva partida y enlace al historial.
- `ProgressService.record()` guarda resultados; el componente visual no accede a localStorage.
- Cada sesión registra fecha, nivel, parejas, errores y segundos. La meta invita a tres sesiones en los últimos siete días. Se conservan hasta 200 resultados locales.

**Los resultados son descriptivos y educativos; no realizan diagnósticos médicos ni psicológicos.** No se interpretan como indicios de autismo, TDAH, dislexia u otras condiciones.

## Arquitectura

```text
src/app/
  app.ts / app.html / app.scss   # Layout: navegación, perfil, accesibilidad y pie
  app.routes.ts                 # Rutas standalone con loadComponent
  core/
    models/models.ts            # Contratos de dominio
    constants/demo-data.ts      # Mocks y colección de actividades centralizados
    services/                   # Dominio, preferencias, resultados y persistencia
  shared/
    components/                 # Iconos, ilustraciones, tarjetas, mensajes, encabezados
    directives/                 # Visibilidad de animaciones con IntersectionObserver
    pipes/                      # Formato de duración
  features/
    home/
    experience-selector/
    child-dashboard/
    activities/
    progress/
    tutor-demo/
    professional-demo/
    help/
src/styles/_tokens.scss         # Colores, espaciado, radios, sombras y movimiento
src/styles.scss                 # Tipografía local, utilidades, controles y responsive
e2e/                            # Escenarios Playwright en escritorio y móvil
```

Componentes standalone, Angular Router, signals, lazy loading, TypeScript `strict` y plantillas estrictas. El componente raíz solo contiene el layout; cada pantalla tiene su propia implementación. No se crean guards de autorización ficticia ni carpetas vacías. Botones y tarjetas comparten clases SCSS; encabezados, iconos, mensajes, barras, tarjetas y multimedia son componentes reutilizables.

| Servicio / clase | Responsabilidad y contrato |
| --- | --- |
| `ProfileService` | `profile`, `stage`, `stageLabel`, `configured`, `save(name, age)`. Valida el perfil local y resuelve etapa. |
| `PreferenceService` | `motion`, `systemReduced`, `toggleMotion()`. Conserva la elección y escucha los cambios del sistema. |
| `ThemeService` | `theme`, `toggle()`. Persiste día/noche en `nexo.theme`; aplica color y metadatos de la página. |
| `universe-physics` | Simulación de círculos tipados: límites, masas, colisiones, amortiguación y subpasos. Sin persistencia educativa. |
| `ActivityService` | Colección `activities` y consulta `find(id)`. |
| `ProgressService` | `results`, `summary`, `weeklyGoal`, `record(data)`. Valida y registra resultados, agrega estadísticas. |
| `StorageService` | Único límite con localStorage: `read`, `write`, `available`. Recupera datos corruptos y avisa si el almacenamiento está bloqueado o lleno. |
| `MemoryEngine` | Lógica pura de barajado, comparación, bloqueo y finalización, independiente de DOM y persistencia. |

Modelos: `Profile`, `Activity`, `Result`, `Progress`, `VisualPreference`, `Professional`, `Questionnaire`, `MemoryCard`; uniones `Stage` y `Area`. Los componentes consumen servicios, nunca una base de datos. En el segundo hito se podrán añadir adaptadores HttpClient y contratos asíncronos detrás de estos servicios; esta versión no intenta contactar una API.

## Diseño, multimedia y accesibilidad

- Infancia (5–9): aventura con cielo, montañas, senderos, agua y naturaleza; verde y turquesa, formas suaves y tipografía redonda. Juvenil (10–13): laboratorio creativo violeta con retícula, planeta, lápiz y objetos imaginativos. Adolescencia (14–18): estudio tecnológico azul nocturno y cian, con geometría, circuitos y conexiones. Nexito adapta sus colores y acompaña cada etapa.
- Ilustraciones SVG e iconos propios, fuentes variables Nunito Sans y Outfit servidas localmente. Sin solicitudes a Google Fonts, imágenes remotas ni frameworks visuales. Las fuentes mantienen sus licencias OFL en sus paquetes Fontsource.
- Navegación superior en escritorio y menú móvil. Menú cerrado fuera del orden de foco, área de contenido inerte al abrirlo, ciclo de foco y cierre con Escape.
- Foco visible, enlace de salto, títulos por ruta, foco al contenido tras navegar, HTML semántico y mensajes del juego anunciados con `aria-live`.
- Tarjetas activables con Enter y Espacio; edades con flechas. Controles principales de al menos 44 px.
- Control visible de animación en todas las páginas; persiste la elección y respeta siempre `prefers-reduced-motion`, incluso si había una preferencia local distinta.
- Animación suave basada en transform y opacity. Ilustraciones y fondo suspenden sus animaciones al salir de la vista. Listeners, observadores y temporizadores se eliminan al destruir componentes.
- `MultimediaBackgroundComponent` admite `videoSrc`, `videoType`, `poster`, `autoPlay` y `priority`. Carga al entrar en pantalla, pausa al ocultar la pestaña, respeta movimiento reducido y requiere reproducción manual en móvil o ahorro de datos. El video de portada aparece en una ventana dentro del mundo ilustrado; el segundo solo en el catálogo, bajo inicio manual. `media.config.json` usa `enabled: true`. Se priorizan derivados WebM silenciosos y fotografías WebP comprobados; los MP4/JPEG originales se conservan. `npm run media:optimize` regenera esos derivados con el navegador de pruebas instalado, sin añadir dependencias de producción.
- localStorage usa las claves `nexo.profile`, `nexo.preferences`, `nexo.results` y `nexo.theme`. No hay analítica de uso de la aplicación, cuentas, servidor ni cargas de datos. La analítica del CLI está desactivada. En un equipo compartido los datos locales son visibles a otras personas. Se pueden borrar desde los ajustes del navegador.

## Verificación del hito

Registro de comprobaciones y límites: [docs/VERIFICACION.md](docs/VERIFICACION.md).

- Instalación npm y build de producción.
- 36 pruebas unitarias: dominio, persistencia, multimedia, Nexito, física y tema.
- 22 escenarios E2E (11 en escritorio, 11 en emulación móvil): navegación, cinco anchos, edad y persistencia, partida completa, pausa/reinicio, modal e historial, teclado, movimiento reducido, tres mundos, recursos comprobados, Nexito, ambos videos, fotografías, temas y lanzamientos con mouse/teclado/toque.
- 6 escenarios E2E adicionales sobre el build de producción servido bajo `/NexoAprende-Experience/`: rutas hash y recarga, recursos, fuentes, modo nocturno, universo, toque emulado, videos y resultados de memoria. Se ejecutan con `npm run test:e2e:pages` después del build.
- axe-core con reglas WCAG A/AA en doce rutas, tablero, resultados y las tres variantes de edad. Son comprobaciones automáticas, no una certificación integral de accesibilidad.
- Capturas de inicio, selector, catálogo, panel y resultados en `artifacts/` (fuera de Git); trazas y reporte en `test-results/` y `playwright-report/` cuando corresponda.

Repositorio del código fuente: **[MATTUPAPI-art/NexoAprende-Experience](https://github.com/MATTUPAPI-art/NexoAprende-Experience)**, rama `main`. Para descargar la entrega, abrir **Code → Download ZIP**. También se puede clonar con `git clone https://github.com/MATTUPAPI-art/NexoAprende-Experience.git`. El repositorio incluye las fuentes, `AGENTE_IA.md`, la configuración y la multimedia educativa; excluye dependencias, builds, temporales y la grabación ajena de referencia. El sitio estático se publica por separado mediante GitHub Actions y GitHub Pages.

## Segundo hito

1. Implementar las mecánicas de atención y lectura con contenido revisado por etapa.
2. Ampliar pruebas de usabilidad con familias y adolescentes, lectores de pantalla y dispositivos físicos.
3. Definir los contratos de la futura API Laravel; agregar HttpClient, carga y errores, conservando el proyecto independiente y sin reutilizar la base del otro trabajo.
4. Diseñar autenticación, consentimiento y autorización real antes de conectar información de tutores o profesionales.
5. Revisar contenido educativo y ampliar las escenas con recursos adecuados a cada edad.
6. Decidir el alojamiento web por separado del repositorio del código fuente.
