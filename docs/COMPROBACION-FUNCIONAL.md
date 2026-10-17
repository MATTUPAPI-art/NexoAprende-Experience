# Comprobación funcional de NexoAprende Experience

Registro de verificación previo a la publicación. El repositorio y las instrucciones de entrega actuales se encuentran en [ENTREGA.md](ENTREGA.md).

Revisión del 17 de octubre de 2026 sobre el proyecto Angular 22 existente. Las siete funcionalidades solicitadas ya están implementadas y conectadas a la interfaz; no se necesitó sustituir ni completar su lógica.

## Abrir la aplicación

**http://127.0.0.1:4307/**

El servidor existente se reutilizó y respondió HTTP 200 con el título NexoAprende Experience. Para iniciarlo si está detenido, ejecutar `npm start` desde la carpeta del proyecto. No iniciar una segunda instancia si ese puerto ya está ocupado por esta aplicación.

Acceso directo al universo: **http://127.0.0.1:4307/#universo**. También se puede pulsar «Prueba tu universo: arrastra y lanza» dentro de la portada de Inicio.

## Prueba manual

| Función             | Pantalla y acción                                                                                                | Resultado esperado                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Universo y selector | En Inicio, sección «Un universo en tus manos», pulsar **Planetas**, **Pelotas** o **Animales**.                  | Cambian las ilustraciones sin recargar. Hay seis objetos en escritorio y cuatro en móvil.                                                      |
| Arrastre            | Mantener pulsado un objeto y moverlo con mouse o dedo dentro del escenario.                                      | Sigue el puntero y queda dentro de los límites.                                                                                                |
| Velocidad y rebotes | Con el universo activo, hacer un movimiento rápido y soltar mientras se mueve el puntero.                        | El objeto conserva impulso, pierde velocidad y rebota en los bordes. Si se mantiene quieto antes de soltar, no se conserva un impulso antiguo. |
| Contador            | Primero hacer un clic sin arrastrar; después desplazar un objeto al menos 12 px y soltar.                        | El clic no suma. El arrastre válido suma exactamente uno en **Lanzamientos** y muestra **+1**. No altera resultados educativos.                |
| Reinicio y pausa    | Pulsar la flecha circular junto al contador; usar **Pausar universo** y **Reanudar universo**.                   | El contador vuelve a cero. La pausa detiene el movimiento automático; al reanudar vuelve la simulación.                                        |
| Teclado             | Enfocar un objeto con Tab, moverlo con flechas y pulsar Enter o Espacio.                                         | Se mueve y se registra un lanzamiento. Enter sin movimiento no suma. Escape cancela el movimiento con teclado.                                 |
| Día/noche           | En el encabezado, pulsar **Modo noche** (luna), luego **Modo día** (sol). Navegar y recargar.                    | Cambian navegación, superficies, formularios, juego y resultados. La elección persiste. En móvil puede verse solamente el icono.               |
| Video principal     | En la portada de Inicio, pulsar **Ver en movimiento**, si no está reproduciéndose, y luego **Pausar video**.     | Se reproduce el video educativo silencioso; al pausar se detiene.                                                                              |
| Video secundario    | Abrir **http://127.0.0.1:4307/actividades**, bajar hasta **Ideas en movimiento** y pulsar **Ver en movimiento**. | Se reproduce el segundo video. **Pausar video** lo detiene. No arranca automáticamente.                                                        |

Si aparece **Universo estático**, revisar el control de movimiento del encabezado: si se pausó manualmente, pulsar **Movimiento reducido** para reactivar. Si ese botón está deshabilitado, el sistema operativo solicita movimiento reducido y la aplicación lo respeta; los objetos y las imágenes estáticas siguen disponibles. Los videos también respetan esta preferencia.

El toque se automatiza mediante emulación Pixel 7 y eventos táctiles de Chrome. Para una prueba manual en Chrome de escritorio: abrir DevTools, activar el modo dispositivo con Ctrl + Mayús + M, elegir un dispositivo táctil y recargar. La dirección 127.0.0.1 corresponde a este equipo, no a otro teléfono de la red.

## Dónde aparecen las imágenes

- **Logo y favicon:** navegación principal y pestaña del navegador; en móvil, abrir el menú para ver el logo.
- **Nexito:** Inicio → **Saludar a Nexito**; su versión de victoria aparece al saludar y al completar memoria. La escena de bienvenida está al final de Inicio. Para infancia se utiliza la portada alternativa; juvenil/adolescencia muestran la escena de bienvenida.
- **Tres mundos y fotos de etapas:** **http://127.0.0.1:4307/experiencia** → seleccionar Infancia, Juvenil o Adolescencia → **Guardar y entrar a mi espacio**. Los mundos también se usan en Inicio y el panel.
- **Fondos de secciones:** cabeceras de `/panel`, `/actividades`, `/progreso`, `/tutor` y `/profesional`.
- **Fondos de actividades:** `/actividades/memory`, `/actividades/attention` y `/actividades/reading`.
- **Fotos informativas reales:** secciones de acompañamiento en `/tutor` y `/profesional`.

Los 22 recursos del producto se sirven mediante derivados WebP/WebM optimizados. Se comprobaron HTTP 200 y firma binaria de las 22 rutas activas, y la decodificación de las veinte imágenes en el navegador del servidor 4307. Las pruebas E2E verifican además reproducción y pausa de ambos videos.

No falta ningún recurso solicitado. La grabación de CreceActivo se conserva únicamente como referencia y no se integra como contenido educativo. Ficheros de respaldo vacíos y variantes de fallback no se cargan como imágenes de la interfaz. Inventario completo: [RENOVACION-MULTIMEDIA.md](RENOVACION-MULTIMEDIA.md).

## Evidencia en código

| Función                                            | Archivos                                                                                                                                                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Montaje en Inicio                                  | [home.ts](../src/app/features/home/home.ts), [home.html](../src/app/features/home/home.html)                                                                                                                    |
| Eventos de puntero, categorías, contador y teclado | [interactive-universe.ts](../src/app/shared/components/interactive-universe.ts), [plantilla](../src/app/shared/components/interactive-universe.html)                                                            |
| Velocidad, fricción, colisiones y bordes           | [universe-physics.ts](../src/app/core/models/universe-physics.ts)                                                                                                                                               |
| Planetas, pelotas y animales SVG                   | [floating-object.ts](../src/app/shared/components/floating-object.ts)                                                                                                                                           |
| Tema global persistente                            | [theme.service.ts](../src/app/core/services/theme.service.ts), [theme-toggle.ts](../src/app/shared/components/theme-toggle.ts), [tokens y estados](../src/styles/_themes.scss), [app.html](../src/app/app.html) |
| Recursos reales y videos                           | [media-manifest.ts](../src/app/core/constants/media-manifest.ts), [prepare-media.mjs](../scripts/prepare-media.mjs), [multimedia-background.ts](../src/app/shared/components/multimedia-background.ts)          |

## Verificación ejecutada

- `npm run build`: correcto; carga inicial 338,44 kB, transferencia estimada 88,82 kB, fuentes y multimedia aparte.
- `npm test`: 36 pruebas aprobadas en siete archivos.
- `npm run test:e2e`: 22 escenarios aprobados, once en escritorio y once con emulación Pixel 7. Incluye toque, arrastre, rebote, contador, categorías, persistencia, reproducción de ambos videos y axe en las doce rutas actuales con temas día/noche, edades, menú móvil abierto y resultados de memoria.
- Comprobación adicional directamente sobre 4307: enlace del universo, clic sin puntuación, arrastre válido, tres categorías, reinicio, tema tras recarga y ausencia de escrituras de resultados educativos. Sin errores de ejecución detectados.
- Evidencia adicional local: `artifacts/current-runtime-verification.json` (excluido de Git).

Atención y lectura continúan identificadas como demostraciones. La prueba de toque es emulada; no se ha realizado una prueba nueva en un teléfono físico. El contador recreativo se reinicia al salir de Inicio; el historial educativo conserva su persistencia.

No se modificó Laravel ni se hizo push a GitHub.
