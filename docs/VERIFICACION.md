# Verificación — Hito 1

Registro histórico del primer hito. La verificación actual se documenta en [RENOVACION-MULTIMEDIA.md](RENOVACION-MULTIMEDIA.md).

Fecha: 17 de octubre de 2026. Entorno: Windows, Node 24.20.0, npm 11.19.0, Angular y CLI local 22.2.3, TypeScript 6.0.3.

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| Instalación con npm | Correcta; lockfile incluido. |
| Build inicial | Correcto antes de implementar las pantallas. |
| `npm run build` final | Correcto, sin errores ni advertencias del compilador. |
| Tamaño inicial del build final | 301,88 kB sin comprimir; transferencia estimada por Angular de 83,35 kB. Fuentes y recursos aparte. |
| Lazy loading | Archivos separados para las pantallas; ver salida del build. |
| `npm test` | 21 pruebas aprobadas, 3 archivos; no interactivo. |
| `npm run test:e2e` | 12 escenarios aprobados (6 escritorio y 6 móvil), incluidos análisis axe-core; suite final completada en 2 minutos. |
| Formato Prettier | Todos los archivos comprobados cumplen el formato. |
| `git diff --check` y `git diff --cached --check` | Sin errores de whitespace. |
| Consola del navegador | Cada escenario exige ausencia de `pageerror` y mensajes de consola de tipo error. |
| Capturas | Inicio y modal de resultados en escritorio y móvil; guardadas en `artifacts/`, fuera del repositorio. |
| Git | Repositorio independiente, rama `main`; sin remoto ni push. |

## Cobertura

**Unitarias:** seis límites de etapa (5, 9, 10, 13, 14, 18 años), rechazo de edades inválidas, nombre y edad persistidos, datos corruptos, resultados inválidos, historial y agregados, meta semanal, cuotas de almacenamiento, tope de 200 resultados, preferencia de movimiento local y cambios del sistema. El motor de memoria prueba barajado, seis parejas, identificadores únicos, doble selección, bloqueo tras error, ocultación, aciertos sin recuento duplicado, finalización y reinicio.

**Navegador:** seis escenarios en Chrome de escritorio y los mismos seis con emulación Pixel 7:

1. Inicio, catálogo, filtro de memoria y ausencia de desbordamiento horizontal en 360, 390, 768, 1280 y 1440 píxeles.
2. Apodo y edad por teclado; etapa infantil y adolescente; persistencia tras recargar; movimiento reducido guardado.
3. Partida real: error, doble pulsación, cronómetro que avanza, pausa que detiene el tiempo, reinicio, seis parejas, modal, axe sobre resultados, Escape con restauración del foco e historial tras recargar sin duplicados.
4. `prefers-reduced-motion`, botón correspondiente desactivado cuando el sistema lo requiere, teclado y menú móvil con Escape.
5. axe-core WCAG A/AA en inicio, selector, panel, catálogo, las tres actividades, progreso, tutor, profesional, ayuda y 404; comprobación de anchura. También se revisa el tablero iniciado.
6. Accesibilidad del selector y el inicio en las tres etapas; preguntas demostrativas que se abren y cierran; atención identificada como no jugable y sin botón de inicio ficticio.

Se revisaron visualmente capturas de inicio en escritorio y móvil. Los fallos encontrados durante el desarrollo se corrigieron: puerto de pruebas separado de otros proyectos, contraste secundario, nombre del control de movimiento en móvil, nombre accesible del perfil y ámbito de un selector de prueba.

## Límites y pendientes de alcance

- La emulación móvil no sustituye una revisión en dispositivos físicos.
- No se ejecutaron pruebas en Safari, Firefox, lectores de pantalla reales ni sesiones de usabilidad con niños, adolescentes y tutores. El análisis automático no certifica por sí solo conformidad completa con WCAG.
- No se dispone de video real: se verifica el fondo CSS y el movimiento reducido. La reproducción MP4/WebM deberá probarse al incorporar un archivo válido.
- Atención y lectura son vistas previas; perfiles secundarios, profesional, autorizaciones y gráfico semanal son simulados. Se señalan como tales en pantalla.
- No se implementan backend, autenticación, permisos reales, múltiples usuarios, cuestionarios con respuestas, sincronización entre dispositivos ni diagnósticos.
- No hay repositorio GitHub confirmado, push ni despliegue. Se necesita la URL destino antes de subir el código.

No quedan fallos conocidos en el build ni en las comprobaciones ejecutadas. Los pendientes anteriores describen el alcance del siguiente hito y las verificaciones no realizadas.

Consultar el commit local con `git log -1 --oneline`. Las capturas y los reportes se pueden regenerar con `npm run test:e2e`.
