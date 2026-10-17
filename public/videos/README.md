# Videos reales de NexoAprende

Se conservan los originales `portada-educativa.mp4` (14,2 s, 3840 × 2160) y `actividades-ninos.mp4` (27 s, 1920 × 1080).

La aplicación usa copias en `optimized/`: clips WebM de hasta 12 segundos, 960 px de ancho, 24 fps y sin audio. Cada uno pesa aproximadamente 0,8 MB. La portada inicia automáticamente solo en escritorio cuando el movimiento está permitido y el video es visible. El clip de actividades se usa solo en el catálogo y empieza por acción del usuario. Ambos tienen pausa.

`npm run media:optimize` permite regenerar los derivados mediante el navegador de QA ya instalado; no modifica los originales. `npm run media:prepare` verifica existencia y cabeceras antes de generar el inventario. Si falta una copia optimizada, comprueba el MP4 original como alternativa; si tampoco existe, omite su URL y mantiene la presentación estática.
