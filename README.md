# NexoAprende Experience

Primera versión funcional — **Hito 1**, aplicación gráfica y multimedia con Angular. Una plataforma educativa en español para explorar atención, memoria y comprensión lectora entre los 5 y los 18 años.

Proyecto independiente en `nexoaprende-experience`. No se usa ni se modifica el proyecto `plataforma-apoyo-infantil`, su repositorio, Laravel ni su base de datos. No hay autenticación real, backend, PostgreSQL ni publicación en internet.

## Ejecutar localmente

Entorno verificado: **Angular y CLI 22.2.3**, TypeScript 6.0.3, Node.js 24.20.0, npm 11.19.0, Windows. Usar una versión de Node compatible con los `engines` de package.json. [Compatibilidad oficial de Angular](https://angular.dev/reference/versions).

```powershell
cd C:\Users\LOQ\Desktop\nexoaprende-experience
npm ci
npm start
```

Abrir **http://127.0.0.1:4307/**. El puerto es propio para evitar interferir con otras aplicaciones locales en 4200. `npm start` utiliza el CLI **local**; no hace falta actualizar el CLI global. En VS Code, F5 con la configuración `NexoAprende · Chrome` inicia la aplicación y abre Chrome.

```powershell
npm run build
npm test
npm run test:e2e
git diff --check
```

`npm test` usa Vitest sin modo interactivo. Las pruebas E2E usan Playwright y axe-core, arrancan su propio servidor en 4307 y lo detienen al terminar. Detener el servidor manual antes de ejecutarlas: la configuración evita reutilizar por error otro sitio. En Windows se utiliza Chrome si está instalado en su ruta habitual. En otros entornos, instalar el navegador de pruebas con `npx playwright install chromium`.

El build estático se genera en `dist/nexoaprende-experience/browser`. Para un alojamiento futuro, configurar la reescritura de rutas hacia `index.html`; copiar los archivos a un hosting no forma parte de este hito.

## Pantallas y alcance

| Ruta | Entrega |
| --- | --- |
| `/` | Inicio multimedia con ilustración SVG original, fondo CSS, CTA, áreas educativas, progreso y acompañamiento. |
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
| `ActivityService` | Colección `activities` y consulta `find(id)`. |
| `ProgressService` | `results`, `summary`, `weeklyGoal`, `record(data)`. Valida y registra resultados, agrega estadísticas. |
| `StorageService` | Único límite con localStorage: `read`, `write`, `available`. Recupera datos corruptos y avisa si el almacenamiento está bloqueado o lleno. |
| `MemoryEngine` | Lógica pura de barajado, comparación, bloqueo y finalización, independiente de DOM y persistencia. |

Modelos: `Profile`, `Activity`, `Result`, `Progress`, `VisualPreference`, `Professional`, `Questionnaire`, `MemoryCard`; uniones `Stage` y `Area`. Los componentes consumen servicios, nunca una base de datos. En el segundo hito se podrán añadir adaptadores HttpClient y contratos asíncronos detrás de estos servicios; esta versión no intenta contactar una API.

## Diseño, multimedia y accesibilidad

- Infancia (5–9): tipografía más redonda, botones grandes, bordes suaves y lenguaje de juego. Juvenil (10–13): violetas, tarjetas y pequeños retos. Adolescencia (14–18): azul más sobrio, bordes discretos, menos decoración y lenguaje autónomo.
- Ilustraciones SVG e iconos propios, fuentes variables Nunito Sans y Outfit servidas localmente. Sin solicitudes a Google Fonts, imágenes remotas ni frameworks visuales. Las fuentes mantienen sus licencias OFL en sus paquetes Fontsource.
- Navegación lateral en escritorio y menú móvil. Menú cerrado fuera del orden de foco, área de contenido inerte al abrirlo, ciclo de foco y cierre con Escape.
- Foco visible, enlace de salto, títulos por ruta, foco al contenido tras navegar, HTML semántico y mensajes del juego anunciados con `aria-live`.
- Tarjetas activables con Enter y Espacio; edades con flechas. Controles principales de al menos 44 px.
- Control visible de animación en todas las páginas; persiste la elección y respeta siempre `prefers-reduced-motion`, incluso si había una preferencia local distinta.
- Animación suave basada en transform y opacity. Ilustraciones y fondo suspenden sus animaciones al salir de la vista. Listeners, observadores y temporizadores se eliminan al destruir componentes.
- `MultimediaBackgroundComponent` admite `videoSrc`, `videoType` y `poster` de archivos **reales** MP4/WebM; pausa según movimiento y visibilidad. Sin archivo configurado, usa el fondo CSS con capa de contraste y fallback estático. No hay rutas de video inventadas ni sonido automático. La reproducción de video real queda pendiente de disponer de un archivo.
- localStorage usa las claves `nexo.profile`, `nexo.preferences`, `nexo.results`. No hay analítica, cuentas, servidor, cargas de datos ni secretos. En un equipo compartido los datos locales son visibles a otras personas. Se pueden borrar desde los ajustes del navegador.

## Verificación del hito

Registro de comprobaciones y límites: [docs/VERIFICACION.md](docs/VERIFICACION.md).

- Instalación npm y build de producción.
- 21 pruebas unitarias: parejas y bloqueo, finalización y reinicio, límites de edad, restauración y validación, agregados y meta, almacenamiento no disponible y movimiento reducido.
- 12 escenarios E2E (6 en escritorio, 6 en emulación móvil): navegación, cinco anchos de pantalla, edad y persistencia, partida completa, pausa/reinicio, modal e historial, teclado, preferencias, tres estilos por edad y paneles demostrativos.
- axe-core con reglas WCAG A/AA en doce rutas, tablero, resultados y las tres variantes de edad. Son comprobaciones automáticas, no una certificación integral de accesibilidad.
- Capturas de inicio y resultados en `artifacts/` (fuera de Git); trazas y reporte en `test-results/` y `playwright-report/` cuando corresponda.

No hay remoto GitHub configurado. El repositorio y sus commits son exclusivamente locales hasta confirmar la URL del repositorio destino. No se ejecuta `push` ni se considera el proyecto publicado.

## Segundo hito

1. Implementar las mecánicas de atención y lectura con contenido revisado por etapa.
2. Ampliar pruebas de usabilidad con familias y adolescentes, lectores de pantalla y dispositivos físicos.
3. Definir los contratos de la futura API Laravel; agregar HttpClient, carga y errores, conservando el proyecto independiente y sin reutilizar la base del otro trabajo.
4. Diseñar autenticación, consentimiento y autorización real antes de conectar información de tutores o profesionales.
5. Incorporar multimedia optimizada real si aporta valor y verificar su reproducción y fallback.
6. Confirmar repositorio GitHub para un push normal y, por separado, decidir el alojamiento.
