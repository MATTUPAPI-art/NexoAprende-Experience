# Fotografías aportadas

Se conservan `etapa-infantil.jpg`, `etapa-juvenil.jpg` y `etapa-adolescente.jpg`. Sus copias WebP en `../optimized/` tienen hasta 1200 px de ancho y pesan entre 90 y 175 kB aproximadamente.

Las fotografías representan escenas de aprendizaje: un aula con globos, juego al aire libre y materiales escolares. Se usan como posters de video y fotografías informativas en tutor y profesional. No representan a los perfiles ficticios de la aplicación.

Los mundos por edad son ilustraciones originales en `WorldSceneComponent`; no dependen de estas fotografías. `StageArtComponent` solo muestra una foto al solicitar `kind="photo"`, con texto alternativo y fallback SVG si la carga falla.

Regeneración: `npm run media:optimize`; inventario: `npm run media:prepare`. Los originales no se sobrescriben.
