# Segunda mejora visual — revisión local

**Registro de la fase anterior.** La entrega actual activa los medios reales y añade Nexito y mundos ilustrados. Consultar [RENOVACION-ARTISTICA.md](RENOVACION-ARTISTICA.md) para el estado vigente.

Se conservan Angular 22.2.3, todas las rutas, los modelos y servicios de dominio, el motor de memoria y las claves de localStorage. No se agregaron dependencias. No se hace push ni despliegue.

## Dirección visual y pantallas

- **Inicio:** portada oscura con tipografía de mayor escala, acento lima y subrayado dibujado; órbitas CSS lentas, reacción al cursor y alternativas estáticas. Secciones numeradas, ilustración según edad, colección de actividades y vínculos a los tres mundos.
- **Selector:** tres composiciones propias. Taller infantil cálido y orgánico; laboratorio juvenil violeta con retícula y lima; estudio adolescente verde petróleo, más sobrio y recto. Selección por tarjetas, slider y previsualización conservan su funcionamiento y persistencia.
- **Catálogo:** memoria como experiencia destacada, atención y lectura como entradas complementarias. Se mantienen filtros, estados y enlaces. El segundo video está preparado exclusivamente aquí, con reproducción manual, para su futura activación.
- **Mi espacio:** cabecera ilustrada según etapa; perfil local, gráfico simulado, meta real y último resultado conservados.
- **Progreso:** estadísticas con composición editorial y mayor jerarquía; mismo historial y agregados locales.
- **Tutor y profesional:** cabeceras y ambientación diferentes; mantienen sus advertencias de demostración, perfiles, accesos y guías.
- **Memoria:** nueva superficie de tablero, respuesta breve al encontrar parejas y celebración finita en los resultados. No cambian las reglas, temporizadores ni el registro de partidas.

## Interactividad y accesibilidad

`DepthDirective` limita las actualizaciones del cursor a requestAnimationFrame y las aplica solo con ratón y movimiento permitido. `RevealDirective` añade una única entrada suave al aparecer cada sección, conservando el contenido visible antes de observarla. El fondo suspende movimiento fuera de pantalla. El movimiento reducido anula animaciones, entradas, inclinaciones y transiciones; se conservan foco visible, teclado y controles táctiles.

El video preparado usa reproducción silenciosa e inline, `preload="none"`, visibilidad de pantalla y pestaña, control propio de pausa y las preferencias globales. En móvil o ahorro de datos, no se carga automáticamente. El contenido real de MP4 deberá revisarse y optimizarse al activar la integración; las pruebas unitarias comprueban los estados del componente, no sustituyen la revisión de reproducción de esos archivos.

## Recursos locales y estado de integración

Al comenzar solo existían los favicons. Posteriormente aparecieron los cinco archivos; se verificaron sus cabeceras y se inspeccionaron las tres fotografías. La última indicación del usuario pide continuar con CSS e ilustraciones y esperar su aviso antes de integrar medios. Por eso **`media.config.json` conserva `enabled: false`**. La versión que se entrega para revisar no solicita los MP4 ni las fotografías.

| Archivo conservado | Tamaño aproximado | Uso preparado, pendiente de activación |
| --- | --- | --- |
| `public/videos/portada-educativa.mp4` | 39,24 MB | Fondo de portada con overlay y pausa. |
| `public/videos/actividades-ninos.mp4` | 16,84 MB | Sección audiovisual del catálogo, inicio manual. |
| `public/images/etapas/etapa-infantil.jpg` | 1,95 MB | Mundo infantil, tarjetas y fondos. |
| `public/images/etapas/etapa-juvenil.jpg` | 3,47 MB | Mundo juvenil, tarjetas y fondos. |
| `public/images/etapas/etapa-adolescente.jpg` | 3,05 MB | Mundo adolescente, tarjetas y fondos. |

No faltan actualmente los cinco originales. Antes de activarlos conviene generar versiones optimizadas para pantalla y móvil, conservando estos originales. No se afirma que la selección fotográfica represente edades verificadas: los nombres corresponden a los archivos aportados.

Recursos **utilizados ahora**: ilustraciones SVG propias del taller, laboratorio y estudio, ilustraciones e iconos originales de las actividades, fuentes locales existentes y CSS animado. No se descargan imágenes externas ni se simulan fotografías con rutas ficticias.

`scripts/prepare-media.mjs` lee solo la cabecera de cada recurso, comprueba existencia y firma básica, y genera `src/app/core/constants/media-manifest.ts`. Cuando se confirme la integración, se activará la configuración y se regenerará el inventario. Si faltase un archivo válido, no se emitirá su URL; los componentes mantienen alternativas gráficas y manejan errores de carga.

Los nombres `public/images` y `public/videos` llegaron a existir como archivos vacíos. Se conservaron como `images.empty-file.bak` y `videos.empty-file.bak`, y se crearon carpetas reales sin borrar esos archivos.

## Revisión y pruebas

Abrir **http://127.0.0.1:4307/**. El servidor que ya estaba activo se conserva; para volver a iniciarlo, usar `npm start`. Los E2E usan el puerto separado 4317.

```powershell
npm run build
npm test
npm run test:e2e
git diff --check
```

La suite ampliada contiene 28 pruebas unitarias y 14 escenarios E2E. Los escenarios existentes siguen verificando memoria completa, cronómetro, pausa, reinicio, modal, historial, localStorage, movimiento reducido, teclado y análisis axe-core de doce rutas. Los nuevos verifican las composiciones, los tres mundos por teclado y que solo se soliciten recursos verificados y activados. Capturas en `artifacts/`; reportes en `playwright-report/` y `test-results/`.

Resultados finales comprobados el 17 de octubre de 2026:

| Comprobación | Resultado |
| --- | --- |
| Build de producción | Aprobado, sin errores ni advertencias del compilador. |
| Tamaño inicial | 314,45 kB; transferencia estimada de 85,47 kB, fuentes aparte. |
| Unitarias | 28 aprobadas, cuatro archivos. |
| E2E | 14 aprobados, siete de escritorio y siete móviles; 53,2 segundos. |
| axe-core | Sin infracciones en las comprobaciones automatizadas ejecutadas. |
| Consola y solicitudes | Sin errores de consola en los escenarios; la revisión desactivada no solicita videos ni fotografías. |
| Formato y Git | Prettier correcto y `git diff --check` sin errores. |
| Localhost 4307 | HTTP 200, título NexoAprende; servidor previo conservado. |

No se hicieron pruebas en dispositivos físicos ni con lectores de pantalla reales. La reproducción y optimización de los medios originales sigue pendiente de activar esa integración. Los servicios de dominio, las rutas y el lockfile no tienen modificaciones en esta mejora.

El cambio previo de `angular.json` y los archivos multimedia aportados se conservan. El código queda disponible para revisión local antes de cualquier push.
