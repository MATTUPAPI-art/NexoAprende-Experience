# Renovación artística de NexoAprende Experience

Registro de la iteración anterior. El inventario y la verificación actuales están en [RENOVACION-MULTIMEDIA.md](RENOVACION-MULTIMEDIA.md).

Fecha: 17 de octubre de 2026. Angular 22.2.3, TypeScript estricto, standalone, rutas y persistencia conservados. No se modifica Laravel ni se hace push o despliegue. Se conserva el cambio previo del usuario en `angular.json`.

## Identidad y composición

El logotipo incorpora un símbolo entrelazado turquesa/violeta y una chispa dorada; se actualiza también el favicon. La navegación pasa de una barra lateral administrativa a una cabecera superior en escritorio, manteniendo el menú móvil con foco contenido, Escape y restauración del foco.

Nexito es un personaje SVG original, con antena de estrella, cuerpo suave, pañuelo y expresiones propias. `NexitoComponent` ofrece estados `greet`, `think`, `cheer` y `calm`. El saludo se activa con un botón nativo accesible, anuncia un mensaje con el apodo del perfil y vuelve a su estado inicial. En memoria reacciona a pausa, intentos sin coincidencia y finalización. La celebración no depende de sonido ni de partículas pesadas. Sus colores cambian por edad; no requiere sprite sheets ni archivos externos.

## Tres mundos ilustrados

`WorldSceneComponent` contiene fondos vectoriales originales, sin imágenes remotas ni rutas ficticias:

- **5–9, aventura:** cielo, montañas, cometa, río, sendero y árboles; turquesas, verdes y amarillo solar; formas redondas y lenguaje lúdico.
- **10–13, laboratorio creativo:** retícula, órbita, lápiz, cuaderno y pequeñas invenciones; violetas, menta y acentos cálidos.
- **14–18, estudio tecnológico:** fondo azul nocturno, volúmenes isométricos, circuitos y conexiones cian; lenguaje autónomo y movimiento discreto.

Estos fondos se integran en portada, selector, previsualización, cabeceras de páginas y panel personal. Las zonas de texto conservan superficies legibles. En móvil, el paisaje de portada se sitúa en la parte inferior para dejar el texto despejado. Las tarjetas de mundos suavizan su dibujo detrás del texto con una máscara estática.

## Pantallas renovadas

- **Inicio:** portada ilustrada, Nexito interactivo y video real en una ventana con pausa; actividades expresivas, tres mundos y progreso.
- **Selector:** escenarios ilustrados diferentes, vista previa con Nexito y conservación de controles de edad/apodo y localStorage.
- **Panel personal:** cabecera temática con Nexito, mismo perfil, gráfico simulado identificado, meta y último resultado.
- **Catálogo:** memoria destacada, ilustraciones propias de cada actividad, filtros, estados y segundo video bajo reproducción manual.
- **Memoria:** el símbolo de marca aparece en los dorsos; Nexito piensa, espera o celebra según el estado. Se conservan las doce tarjetas, seis parejas, cronómetro, bloqueo de comparaciones, pausa, reinicio y resultados locales.
- **Tutor y profesional:** fotografías reales de las escenas educativas aportadas, con captions y texto alternativo; perfiles y autorizaciones siguen identificados como ficticios.
- **Progreso y páginas auxiliares:** cabeceras ilustradas por edad, superficies claras azuladas y estadísticas con acentos de área.

## Multimedia real y rendimiento

Se encontraron y verificaron **los cinco originales solicitados**. Se inspeccionaron las tres fotografías y se decodificaron ambos videos para crear derivados. No falta un archivo técnico necesario para el diseño actual.

| Original conservado | Derivado utilizado | Tamaño del derivado |
| --- | --- | --- |
| `videos/portada-educativa.mp4` | `videos/optimized/portada-educativa.webm` | 799.820 bytes |
| `videos/actividades-ninos.mp4` | `videos/optimized/actividades-ninos.webm` | 844.406 bytes |
| `images/etapas/etapa-infantil.jpg` | `images/optimized/etapa-infantil.webp` | 92.722 bytes |
| `images/etapas/etapa-juvenil.jpg` | `images/optimized/etapa-juvenil.webp` | 175.400 bytes |
| `images/etapas/etapa-adolescente.jpg` | `images/optimized/etapa-adolescente.webp` | 98.202 bytes |

Las rutas de esta tabla son relativas a `public`. Los videos optimizados son extractos silenciosos de hasta 12 s, a 960 px y 24 fps. Las fotos se reescalan a 1200 px sin cambiar su contenido. `scripts/optimize-art-media.mjs` usa las herramientas de QA ya instaladas y codecs del navegador; no añade dependencias. El inventario comprueba firmas MP4/WebM/JPEG/WebP y elige una ruta real. Un archivo ausente no produce una URL de carga.

El video de inicio se carga solo al entrar en pantalla. En móvil y ahorro de datos requiere una acción explícita. Movimiento reducido impide cargarlo y conserva el poster estático; ocultar la pestaña pausa la reproducción. El segundo video solo se utiliza en el catálogo, bajo inicio manual. Se corrige el estado del botón al retirar un video fuera de pantalla para que permita reproducirlo de nuevo.

Recursos opcionales para una futura dirección fotográfica: fotografías específicamente pensadas para acompañamiento familiar o trabajo profesional. Actualmente se utilizan las escenas escolares reales disponibles; no se inventan retratos de los perfiles demostrativos.

## Validación y límites

Se conservan las pruebas existentes y se añaden casos para Nexito, reproducción real, pausa, fotografías y movimiento reducido. Las unitarias de dominio continúan cubriendo reglas de memoria, edad y persistencia. Los E2E prueban escritorio y emulación móvil, incluidos cinco anchos de pantalla y análisis axe-core en doce rutas y tres edades.

Comandos:

```powershell
npm run build
npm test
npm run test:e2e
git diff --check
```

Capturas: `artifacts/home-desktop.png`, `home-mobile.png`, `worlds-*.png`, `catalog-*.png`, `panel-*.png` y `memory-result-*.png`. Los reportes y capturas se mantienen fuera de Git. La vista local usa `http://127.0.0.1:4307/`; los E2E usan 4317 y detienen su propio servidor.

Las comprobaciones de navegador se realizan con Chrome y emulación Pixel 7; no sustituyen pruebas en dispositivos físicos, Safari/Firefox o lectores de pantalla reales. axe-core no certifica por sí solo conformidad integral con WCAG. Atención, lectura y vínculos de acompañamiento conservan su alcance demostrativo.

Resultados finales:

| Comprobación | Resultado |
| --- | --- |
| `npm run build` | Aprobado, sin errores ni advertencias del compilador. |
| Build inicial | 316,67 kB; transferencia estimada de 86,10 kB, fuentes y medios aparte. |
| `npm test` | 31 pruebas aprobadas, cinco archivos. |
| Suite E2E completa | 16 escenarios aprobados, ocho de escritorio y ocho móviles. |
| Revisión posterior del fondo de previsualización | Cuatro E2E de edades, accesibilidad y composiciones aprobados tras despejar las ilustraciones detrás del texto. |
| Videos y fotos | Reproducción, silencio, pausa, movimiento reducido y carga de ambas fotografías informativas comprobados en navegador. |
| Formato y whitespace | Prettier correcto y `git diff --check` sin errores. |
| Localhost | HTTP 200 en 4307; servidor previo del usuario conservado. |

No quedan fallos conocidos en las comprobaciones ejecutadas. No se añadieron dependencias, ni se modificaron rutas, servicios de dominio, modelos o lockfile. Los cambios quedan locales para revisión, sin push.
