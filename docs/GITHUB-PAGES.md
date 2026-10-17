# Despliegue en GitHub Pages

Sitio público: **https://mattupapi-art.github.io/NexoAprende-Experience/**.

Repositorio: https://github.com/MATTUPAPI-art/NexoAprende-Experience.

## Build y rutas

La configuración `production` de `angular.json` establece `baseHref: "/NexoAprende-Experience/"`, conservando exactamente las mayúsculas del nombre del repositorio. El build de Angular genera la aplicación estática en **`dist/nexoaprende-experience/browser`**, no en el directorio padre.

En producción se activa `withHashLocation()` mediante el reemplazo del archivo de entorno. Las rutas públicas tienen esta forma:

- Inicio: `/NexoAprende-Experience/#/`.
- Actividades: `/NexoAprende-Experience/#/actividades`.
- Memoria: `/NexoAprende-Experience/#/actividades/memory`.
- Progreso: `/NexoAprende-Experience/#/progreso`.

El navegador solicita el mismo `index.html` al recargar estas direcciones, por lo que GitHub Pages no necesita un fallback de servidor ni un `404.html` que simule una respuesta válida. La navegación local de desarrollo sigue usando rutas habituales como `http://127.0.0.1:4307/actividades`.

El manifiesto multimedia expone rutas relativas, por ejemplo `images/optimized/nexito.webp` y `videos/optimized/portada-educativa.webm`. El `<base>` resuelve estos recursos dentro de la carpeta del repositorio. Las fuentes se empaquetan localmente con el CSS. Los enlaces para saltar al contenido y al universo utilizan Angular Router y fragmentos compatibles con ambas estrategias.

## Despliegue automático

El workflow [.github/workflows/deploy-pages.yml](../.github/workflows/deploy-pages.yml) se ejecuta al hacer push a `main` y también admite ejecución manual desde Actions. Sus pasos son:

1. Descargar el código con `actions/checkout` y preparar Node.js 24 con `actions/setup-node`.
2. Instalar desde el lockfile mediante `npm ci`.
3. Ejecutar pruebas unitarias y compilar con `npm run build:pages`.
4. Verificar la carpeta real, el `baseHref`, los 22 recursos, las fuentes y la ausencia de material privado en el build.
5. Ejecutar E2E de desarrollo y del build estático servido bajo la subruta real.
6. Subir solamente la carpeta estática con `actions/upload-pages-artifact`.
7. Configurar Pages con `actions/configure-pages` y publicar con `actions/deploy-pages` en el entorno `github-pages`.

El script de verificación escribe el directorio detectado en `GITHUB_OUTPUT`; la acción de subida usa ese resultado. No se sube toda la carpeta del proyecto como sitio web.

El trabajo de build utiliza `contents: read`. El trabajo de publicación utiliza solamente `pages: write` e `id-token: write`; no se necesita guardar un PAT ni otra contraseña como secreto. Los despliegues se serializan y solo `main` puede publicar. No se usa una rama `gh-pages`, force push ni un paquete adicional de despliegue.

## Configuración del repositorio

En **Settings → Pages → Build and deployment → Source**, seleccionar **GitHub Actions**. En la comprobación mediante la API del repositorio esta opción ya estaba activa, con HTTPS habilitado.

En **Actions**, abrir **Deploy NexoAprende to GitHub Pages** para consultar los trabajos y su resultado. Si fuera necesario repetir un despliegue sin cambiar el código, utilizar **Run workflow** sobre `main`. Si la organización o cuenta restringe Actions, debe permitir las acciones oficiales utilizadas por este workflow.

## Comprobación local del sitio de producción

```sh
npm install
npm run build:pages
npm run serve:pages
```

Abrir **http://127.0.0.1:4327/NexoAprende-Experience/**. Este servidor de prueba devuelve 404 para archivos inexistentes y rutas fuera de la subruta; no añade un fallback SPA que pueda ocultar errores de despliegue.

Pruebas disponibles:

```sh
npm test
npm run test:e2e
npm run test:e2e:pages
```

El último comando arranca su propio servidor estático en 4327; cerrar la vista previa manual antes de ejecutarlo. En equipos sin Chrome compatible instalado, preparar Chromium con `npx playwright install chromium`. En el runner Linux el workflow instala Chromium y sus dependencias del sistema automáticamente.

Para verificar el sitio público con los mismos escenarios, en PowerShell:

```powershell
$env:NEXO_PAGES_URL = 'https://mattupapi-art.github.io/NexoAprende-Experience/'
npm run test:e2e:pages
Remove-Item Env:NEXO_PAGES_URL
```

Se comprueban recarga de rutas, resolución de todos los recursos, fuentes, tema persistente, selector, arrastre, toque emulado, contador, movimiento reducido, reproducción y pausa de ambos videos, finalización de memoria, resultados y persistencia del historial. Las pruebas móviles son emulación, no una validación en un teléfono físico.

## Verificación realizada el 17 de octubre de 2026

- Build de producción correcto: 22 recursos multimedia y 7 archivos de fuentes locales; ningún archivo privado en el artefacto.
- 36 pruebas unitarias y 22 E2E de desarrollo aprobadas.
- 6 E2E del build local bajo `/NexoAprende-Experience/` aprobadas.
- [Primer despliegue automático](https://github.com/MATTUPAPI-art/NexoAprende-Experience/actions/runs/39076789100) completado, incluyendo todas esas pruebas en el runner Linux.
- Sitio público con respuesta HTTP 200 y `baseHref` correcto; las mismas 6 E2E de producción aprobadas contra la URL real de GitHub Pages, en escritorio y móvil emulado.

La comprobación de rutas espera el encabezado concreto de cada pantalla antes de recargar. Así valida también la carga diferida de componentes con latencia de red y evita confundir el encabezado anterior con el de la ruta solicitada.

## Exclusiones

`node_modules`, `.angular`, `dist`, temporales, reportes y evidencias locales permanecen ignorados por Git. El build excluye `public/local` y respaldos; la grabación ajena de CreceActivo sigue fuera de los archivos públicos y del artefacto de Pages. Los originales educativos se conservan y la interfaz prioriza los derivados optimizados.

## Referencias técnicas

- [Workflows oficiales de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
- [Despliegue con Angular CLI y base href](https://angular.dev/tools/cli/deployment).
- [withHashLocation de Angular Router](https://angular.dev/api/router/withHashLocation).
