# Preparación de la entrega académica

**Proyecto:** NexoAprende Experience

**Materia:** Programación Gráfica y Multimedia

## Archivos para el aula virtual

1. `AGENTE_IA.md`, en la raíz del proyecto: descripción en primera persona del uso de Codex, metodología, funciones reales y límites.
2. `NexoAprende-Experience-codigo.zip`: código fuente y recursos multimedia de la aplicación. Descomprimir, entrar en `nexoaprende-experience` y ejecutar `npm install` y `npm start`.
3. El video explicativo de la aplicación, grabado por el estudiante por separado. No es la grabación de CreceActivo ni los videos de fondo de la aplicación.

El paquete local se prepara en `artifacts/entrega/`, una carpeta excluida de Git. El archivo Markdown también está dentro del código fuente, pero puede adjuntarse por separado para facilitar su revisión.

## Repositorio de la entrega

La rama de entrega es `main`. El remoto `origin` corresponde a `https://github.com/MATTUPAPI-art/NexoAprende-Experience.git`. El commit de entrega agrupa el código, la documentación académica, las pruebas, la configuración y los recursos multimedia educativos.

Repositorio: **https://github.com/MATTUPAPI-art/NexoAprende-Experience**.

La comprobación previa encontró el repositorio público vacío y el push en modo simulación fue aceptado. La publicación se realiza mediante un push normal a `main`, sin reescribir el historial ni utilizar `git push --force`. No se guardan contraseñas ni tokens en el proyecto.

## Descargar el código desde GitHub

Para descargar el código del repositorio público:

1. Abrir la URL del repositorio.
2. Seleccionar la rama `main`.
3. Pulsar **Code → Download ZIP**.
4. Descomprimir el archivo y seguir el README.

También se puede utilizar el ZIP local preparado anteriormente. Para obtener la versión actual del repositorio, usar **Code → Download ZIP**. No se debe comprimir toda la carpeta de trabajo, porque contiene dependencias, builds y evidencias privadas que están excluidas del paquete preparado.

## Archivos y privacidad

- `.gitignore` excluye dependencias, `.angular`, `dist`, reportes de Playwright, resultados, artefactos, copias `.bak`, temporales, archivos `.env` y claves privadas.
- La grabación ajena fue retirada de `public` y conservada solamente en `artifacts/private-reference/`. Esta carpeta, sus capturas y la grabación no se incluyen en Git ni en el ZIP.
- El build también excluye `public/local`, respaldos y archivos de documentación multimedia de sus recursos públicos.
- Se conservan código, configuración, lockfile, pruebas y los originales y derivados de las imágenes y videos educativos. El manifiesto comprueba 22 recursos disponibles.
- Se desactivó la analítica del CLI y se retiró su identificador de la configuración que se entregará.
- La revisión de archivos candidatos y patrones de secretos en el historial local no detectó credenciales. Es una comprobación preventiva y no una certificación de seguridad.
- La inspección de metadatos de las veinte imágenes originales no detectó campos GPS ni de autor.
- Los perfiles y resultados reales de uso permanecen en el navegador; no se exportaron datos de localStorage a la entrega. Los nombres de ejemplo en el código son ficticios.

## Comprobaciones de la entrega

En la preparación de esta entrega se ejecutaron:

- `npm run build`: correcto; carga inicial 338,44 kB y transferencia estimada 88,82 kB, fuentes y multimedia aparte.
- `npm test`: 36 pruebas unitarias aprobadas en siete archivos.
- `npm run test:e2e`: 22 escenarios aprobados, once en escritorio y once en emulación móvil, incluyendo controles, persistencia, multimedia y accesibilidad automática.
- Revisión de exclusiones y secretos: sin hallazgos en los archivos candidatos y patrones revisados en el historial local.
- Exclusión de la referencia: ausente de `public` y del build de producción.

El ZIP local se construye con la lista de archivos revisados; se comprueba que sus entradas coincidan con los archivos fuente y que contenga el documento académico, la configuración, el código y los videos optimizados. Las verificaciones funcionales se detallan en [COMPROBACION-FUNCIONAL.md](COMPROBACION-FUNCIONAL.md).

No se modificó el proyecto Laravel original.
