# Renovación multimedia e interactiva

Registro de implementación previo a la publicación. Para consultar el repositorio y la entrega actual, ver [ENTREGA.md](ENTREGA.md).

17 de octubre de 2026. Implementación sobre Angular 22.2.3 existente, sin dependencias nuevas, cambios en Laravel, push ni despliegue.

## Cambios y controles

- Inicio con el logotipo aportado, saludo según perfil/edad, CTA «Comenzar aventura» y acceso directo al universo.
- Universo delimitado con tres categorías SVG originales: seis planetas (Tierra, Saturno, Júpiter, Marte, Neptuno, Venus), seis pelotas y seis animales. Cuatro objetos simultáneos en móvil y seis en escritorio.
- Física real con `requestAnimationFrame`, subpasos, velocidades en píxeles/segundo, masas según tamaño, amortiguación, rebote y colisiones entre círculos. Cambiar de tamaño redistribuye y contiene los objetos.
- Mouse y toque con Pointer Events y captura del puntero. Un desplazamiento de al menos 12 px seguido de liberación suma un lanzamiento; clics, cancelaciones y liberaciones duplicadas no suman. La velocidad del lanzamiento procede del movimiento reciente, con límite para evitar movimientos extremos.
- Teclado: Tab selecciona un objeto, flechas lo desplazan, Enter o Espacio lo lanzan; Escape cancela. Enter sin movimiento no suma.
- Contador con anuncio accesible, efecto +1 y reinicio. Es temporal al inicio y nunca escribe resultados educativos.
- Botón Pausar/Reanudar universo independiente de la preferencia global de movimiento. La simulación se suspende fuera de pantalla y con la pestaña oculta; se eliminan observadores, listeners, rAF y temporizadores al salir.
- Día/noche en todas las rutas, controles, filtros, formularios, tarjetas, gráficos, juego, pausa y resultados. Tokens semánticos en `_themes.scss`; `ThemeService` guarda una preferencia separada en `nexo.theme`. El documento aplica el tema antes de arrancar Angular para evitar el destello blanco inicial. Fotografías sin inversión artificial.
- Nexito original en saludos y acompañamiento; versión victoria al saludar y completar memoria. Menor tamaño y movimiento en adolescencia. La imagen de bienvenida es una escena completa, no un recorte de personaje.
- Movimiento reducido: objetos estáticos, videos sin carga automática, animaciones decorativas desactivadas. Se conserva el arrastre manual y el teclado.

## Pantallas renovadas

| Pantalla                       | Composición y recursos                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inicio                         | Mundo de la edad seleccionada, video principal separado de los objetos, Nexito, universo con controles, actividades y escena de bienvenida.        |
| Selección de edad              | Tres mundos aportados, fotos reales circulares y vista previa del perfil. Aventura natural, laboratorio espacial y estudio tecnológico.            |
| Mi espacio                     | Fondo propio en el encabezado, mundo por edad y mismo perfil, meta e historial. Gráfico simulado identificado.                                     |
| Actividades                    | Fondo propio, memoria destacada, filtros conservados y video secundario manual.                                                                    |
| Mi progreso                    | Fondo propio, estadísticas e historial reales y tema nocturno adaptado.                                                                            |
| Memoria                        | Fondo decorativo propio, doce cartas Angular reales, identidad en dorsos, Nexito y celebración; conserva cronómetro, pausa, reinicio y resultados. |
| Atención y lectura             | Sus fondos específicos, instrucciones y demostración claramente identificada. No hay objetivos clicables inventados sobre dibujos.                 |
| Tutor y profesional            | Fondos específicos en cabeceras y fotos reales en secciones informativas; perfiles y vínculos siguen siendo demostrativos.                         |
| Navegación, ayuda y resultados | Logo real, selector de tema accesible, menú móvil, superficies y estados completos en día/noche; FAQ de nuevos controles.                          |

Los textos pequeños se colocan sobre superficies legibles. Las imágenes que incluyen botones o estadísticas dibujados son decoración; los controles funcionales siguen siendo HTML/Angular independientes.

## Inventario de archivos

Se comprobaron los **22 originales solicitados**: 17 PNG, tres JPEG y dos MP4. Las extensiones coinciden con sus firmas reales. Se conservaron todos los originales.

| Carpeta original dentro de `public` | Archivos integrados                                                                                                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `images/logo/`                      | `logo-nexoaprende.png`, `favicon-nexoaprende.png`                                                                                                                                |
| `images/mascota/`                   | `nexito.png`, `nexito-victoria.png`, `nexito-bienvenida.png`                                                                                                                     |
| `images/fondos/`                    | `fondo-infantil.png`, `fondo-juvenil.png`, `fondo-adolescente.png`                                                                                                               |
| `images/fondos/`                    | `portada-principal.png` (bienvenida alternativa infantil), `fondo-actividades.png`, `fondo-tutores.png`, `fondo-profesionales.png`, `fondo-mi-espacio.png`, `fondo-progreso.png` |
| `images/fondos/`                    | `fondo-memoria.png`, `fondo-atencion.png`, `fondo-lectura.png`                                                                                                                   |
| `images/etapas/`                    | `etapa-infantil.jpg`, `etapa-juvenil.jpg`, `etapa-adolescente.jpg`                                                                                                               |
| `videos/`                           | `portada-educativa.mp4`, `actividades-ninos.mp4`                                                                                                                                 |

**Recursos faltantes: ninguno de los solicitados.** No existe una colección adicional en `images/fotos/`; no es necesaria ni se referencia. Los dos archivos vacíos `.empty-file.bak` se conservan como respaldos, sin utilizarlos.

La grabación de CreceActivo se revisó como referencia de interacción. Para preparar la entrega se retiró de `public` y se conservó únicamente en `artifacts/private-reference/`, una carpeta excluida de Git y del ZIP de entrega. No se utiliza ni solicita desde la aplicación. No se copió su código, marca ni formulario.

### Revisión adicional de la grabación

La revisión previa correspondió a una grabación de 19,65 segundos y 1920 × 1020 px. Se extrajeron doce momentos para revisar composición, posiciones y cambio de tema. Tanto la grabación como las capturas de referencia quedan fuera de la entrega pública.

- Las pelotas deportivas tienen volumen, detalles reconocibles y sombras difusas que las separan del fondo. Se distribuyen de manera irregular alrededor de un bloque central compacto.
- La escena utiliza luces ambientales cálidas y turquesas. Hacia el segundo 16 aparece el modo oscuro con iluminación violeta/turquesa y las pelotas mantienen sus colores.
- La diferencia compositiva con NexoAprende es explícita: la referencia rodea el formulario; nuestro universo ocupa un escenario independiente con controles fuera de la zona de arrastre. La lectura y la navegación permanecen protegidas.

La secuencia sirve para valorar profundidad, densidad y ritmo visual. Una grabación no permite comprobar por sí sola cómo están implementadas la física, las colisiones o la accesibilidad de la referencia. Esta revisión adicional no modifica el código de la aplicación.

## Rendimiento y alternativas

- Los 17 PNG suman **36.701.471 bytes**. Los derivados WebP suman **2.399.176 bytes** (aproximadamente 93,5 % menos), sin reemplazar originales. Fondos hasta 1440 px, mascota/logo hasta 480 px y favicon 96 px.
- Tres fotos WebP: 92.722, 175.400 y 98.202 bytes. Dos clips WebM silenciosos: 799.820 y 844.406 bytes, hasta 12 segundos cada uno. Los MP4 completos se conservan.
- `prepare-media.mjs` valida existencia y cabeceras, prioriza derivados y genera un manifiesto tipado. Si falta un original/derivado al preparar la app, solo expone rutas válidas. Existen alternativas CSS/SVG para identidad, mundos y personaje.
- Las rutas siguen siendo lazy. Cada cabecera pide su propio fondo; las imágenes secundarias son lazy. No se descargan todos los fondos para mostrar una pantalla.
- Videos con `muted`, `loop`, `playsinline`, `preload="none"`, control de pausa, visibilidad, alternativa estática y tratamiento de errores. El catálogo exige reproducción manual; móvil, ahorro de datos y movimiento reducido limitan reproducción/carga.
- SVG de los objetos incluidos localmente: no hay CDN, API externa, librería física ni dependencia nueva en producción.

## Ejecutar y comprobar

```powershell
cd nexoaprende-experience
npm start
```

Abrir **http://127.0.0.1:4307/**. Si el servidor ya está abierto en ese puerto, reutilizar la pestaña. Usar `npm ci` únicamente si faltan dependencias.

```powershell
npm run build
npm test
npm run test:e2e
```

Los E2E arrancan su servidor independiente en 4317. Chrome de Windows se utiliza cuando está disponible; Pixel 7 es emulación táctil, no un teléfono físico.

Herramientas opcionales: `npm run media:prepare` vuelve a comprobar archivos; `npm run media:art` optimiza la colección nueva con el navegador de QA; `npm run media:optimize` regenera imágenes y clips; `npm run qa:visual` audita contraste nocturno y guarda capturas del servidor local ya abierto (`NEXO_PREVIEW_URL` permite otra URL). No se ejecuta optimización pesada en cada arranque.

### Verificación final

| Comprobación       | Resultado                                                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`    | Correcto. Carga inicial aproximadamente 338 kB y transferencia estimada 89 kB, sin contar fuentes y multimedia. Por debajo del presupuesto de 500 kB.            |
| `npm test`         | 36 pruebas aprobadas en siete archivos. Incluye límites, colisiones/masas, fricción, posiciones coincidentes, pausas, persistencia y tema.                       |
| `npm run test:e2e` | 22 escenarios aprobados: once en escritorio y once en Pixel 7 emulado.                                                                                           |
| axe                | Doce rutas en día/noche, tres edades, tablero en pausa, resultados y tabla con historial. Sin incidencias detectadas en las comprobaciones realizadas.           |
| Universo           | Mouse, teclado y toque CDP; clic sin puntos, lanzamiento único, cancelación, reinicio, categorías, rebote real, límites, cambio de tamaño y movimiento reducido. |
| Recursos           | 22/22 disponibles; solicitudes multimedia comprobadas y sin imágenes visibles rotas.                                                                             |
| Formato            | Prettier y `git diff --check` correctos.                                                                                                                         |
| Localhost          | `http://127.0.0.1:4307/` devuelve HTTP 200.                                                                                                                      |

Después de ajustar el encuadre del logo y los colores del menú móvil, se repitieron el build y los escenarios nocturnos de escritorio/móvil, incluyendo el menú abierto.

Capturas locales de revisión: [inicio nocturno](../artifacts/review-night-home.png), [selector nocturno](../artifacts/review-night-experiencia.png), [memoria nocturna](../artifacts/review-night-actividadesmemory.png), [inicio móvil](../artifacts/home-mobile.png) y [resultados nocturnos](../artifacts/night-results-mobile.png). `artifacts/` y los reportes de Playwright están excluidos de Git.

### Límites reales

- Atención y lectura siguen siendo demostraciones; no se ampliaron sus mecánicas ni se presentaron funciones simuladas como reales.
- Tutor, profesional y gráfico semanal mantienen su alcance demostrativo; los resultados de memoria siguen siendo locales.
- Física recreativa bidimensional con colisionadores circulares; no pretende una simulación científica ni incluye sonido.
- El contador no persiste entre visitas al inicio. Los resultados educativos sí conservan su persistencia original.
- Se ofrecen día y noche explícitos; no se añadió selección automática de tema del sistema.
- Las comprobaciones automatizadas no sustituyen revisión con lectores de pantalla, pruebas de usabilidad ni ensayos en dispositivos iOS/Android físicos.
