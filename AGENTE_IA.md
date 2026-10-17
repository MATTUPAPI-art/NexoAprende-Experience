# Descripción del agente de inteligencia artificial utilizado

**Proyecto:** NexoAprende Experience

**Materia:** Programación Gráfica y Multimedia

**Tecnologías principales:** Angular 22, TypeScript y SCSS

**Agente de IA utilizado:** Codex, integrado en Visual Studio Code

## Introducción

Como estudiante de Ingeniería de Sistemas, desarrollé NexoAprende Experience para aplicar conceptos de programación gráfica y multimedia en una aplicación educativa dirigida a estudiantes de 5 a 18 años. Mi propósito fue combinar una interfaz visual adaptada a distintas edades con navegación, interacción, animaciones y recursos audiovisuales.

Durante el desarrollo me apoyé en Codex como agente de inteligencia artificial. Utilicé esta herramienta para avanzar sobre el proyecto existente, revisar propuestas y solicitar correcciones. Mi participación consistió en definir lo que necesitaba, aportar recursos, revisar la experiencia y orientar los cambios mediante instrucciones concretas.

## Qué entiendo por un agente de IA

Entiendo un agente de IA como una herramienta de software que interpreta instrucciones, analiza el contexto de una tarea y utiliza herramientas para realizar acciones relacionadas con un objetivo. En programación puede examinar archivos, proponer soluciones, modificar código y ejecutar comprobaciones.

En mi proyecto, Codex tuvo un papel de asistente de desarrollo. Su utilidad no estuvo solamente en generar fragmentos de código, sino también en relacionar componentes, servicios, rutas y pruebas dentro de la misma aplicación. Aun así, consideré necesario revisar sus resultados: que una propuesta parezca correcta no garantiza que funcione ni que responda a lo solicitado.

## Cómo di las instrucciones mediante prompts

Organicé mis solicitudes mediante prompts escritos en lenguaje natural. En ellos expliqué el objetivo, las tecnologías que debía conservar y las funciones que esperaba obtener. También indiqué restricciones, como trabajar sobre el proyecto Angular existente, mantener la persistencia local, respetar la accesibilidad y no modificar mi proyecto Laravel original.

Por ejemplo, pedí inspeccionar primero la carpeta `public`, integrar solamente archivos existentes y evitar imágenes rotas. Después solicité tres ambientes visuales por edad, la mascota Nexito, el modo día/noche y un universo de objetos que pudieran arrastrarse y lanzarse. Aclaré que necesitaba física funcional, con velocidad y rebotes, y que los lanzamientos recreativos no debían confundirse con los resultados educativos.

El proceso fue iterativo. Cuando el resultado todavía se parecía demasiado a un panel administrativo, pedí una composición más expresiva. También proporcioné una referencia visual para comunicar mejor el movimiento esperado. La referencia sirvió para analizar la interacción; su grabación no forma parte de la aplicación ni de esta entrega.

## Cómo me ayudó Codex durante el desarrollo

Me apoyé en el agente para organizar componentes reutilizables, interfaces de TypeScript y servicios relacionados con el perfil, las preferencias y los resultados. Esto ayudó a separar la presentación de la lógica y a mantener las rutas de Angular con carga diferida.

En la parte gráfica solicité ajustes de composición, colores, jerarquía visual, animaciones y respuesta al cursor. El agente ayudó a desarrollar los componentes del universo y un motor pequeño de física con `requestAnimationFrame`, sin incorporar una biblioteca pesada. Para el mouse y el toque se utilizaron Pointer Events; para la navegación también se mantuvieron alternativas de teclado.

En multimedia, el trabajo incluyó comprobar los archivos aportados, preparar derivados WebP y WebM y conectar las imágenes y videos a sus componentes. Se conservaron los originales. Los videos cuentan con reproducción silenciosa, pausa y alternativa estática, y se respeta la preferencia de movimiento reducido.

Para el modo día/noche se incorporó un servicio de tema y variables CSS que adaptan las superficies, los textos, los controles y los resultados. La preferencia se conserva en el almacenamiento local del navegador.

También pedí ejecutar el build y las pruebas disponibles, revisar los errores y corregirlos. Las comprobaciones y sus límites están documentados en los archivos de verificación del proyecto; no los interpreto como una garantía absoluta de ausencia de fallos.

## Funcionalidades reales de la aplicación

Al revisar el código y las comprobaciones documentadas, identifico las siguientes funciones operativas:

- Perfil local con nombre o apodo y edad de 5 a 18 años. La selección adapta la presentación a infancia, etapa juvenil o adolescencia.
- Navegación entre Inicio, selección de edad, Mi espacio, Actividades, Mi progreso y las secciones de acompañamiento y ayuda.
- Universo interactivo con planetas, pelotas y animales ilustrados. Permite cambiar de categoría, arrastrar con mouse o toque, lanzar y observar rebotes y colisiones.
- Contador de lanzamientos con efecto visual `+1`, pausa y reinicio. Un clic sin desplazamiento no suma. Este contador es recreativo y está separado del historial educativo.
- Juego de memoria funcional con doce tarjetas y seis parejas, cronómetro, pausa, reinicio y presentación de resultados.
- Historial de partidas de memoria y estadísticas descriptivas almacenadas en el navegador.
- Tema día/noche persistente, control de animaciones y tratamiento de movimiento reducido.
- Integración del logotipo, Nexito, fondos por edad y sección, fotografías y dos videos educativos. Nexito saluda y cambia de presentación para celebrar.

Distingo estas funciones de las partes demostrativas: atención y lectura son vistas previas, el gráfico semanal es un ejemplo y los perfiles y vínculos de tutores y profesionales son simulados. No presento estas secciones como servicios completos. La aplicación no incluye autenticación real, una API conectada ni una base de datos de usuarios, y sus resultados no realizan diagnósticos.

## Interacción y verificación

Mi interacción con el agente siguió un ciclo de planificación, implementación, revisión visual y solicitud de correcciones. Primero definí el alcance; después revisé las pantallas en localhost y pedí cambios específicos. Finalmente solicité comprobar que las funciones estuvieran conectadas a la interfaz y que no fueran solamente elementos decorativos.

La documentación registra un build de producción correcto, 36 pruebas unitarias y 22 escenarios E2E aprobados. Estas pruebas cubren lógica, persistencia, navegación, memoria, multimedia, temas e interacción del universo. También se utilizaron comprobaciones automáticas de accesibilidad con axe. La prueba táctil automatizada utiliza emulación móvil; no afirmo haber realizado una validación equivalente en un teléfono físico ni una auditoría completa con lectores de pantalla.

## Beneficios y limitaciones

El apoyo de Codex me permitió explorar distintas soluciones visuales, relacionar los requisitos con componentes concretos y revisar problemas mediante pruebas reproducibles. También me ayudó a comprender la importancia de formular instrucciones precisas: explicar el contexto y los criterios de aceptación produjo resultados más útiles que pedir únicamente una interfaz atractiva.

Encontré límites que debo considerar al usar un agente de IA. Puede proponer diseños genéricos, interpretar de manera incompleta una instrucción o generar cambios que requieren correcciones. Además, las pruebas automatizadas no sustituyen la revisión de usabilidad, del contenido educativo ni del funcionamiento en distintos dispositivos. La selección de recursos, su procedencia y la decisión sobre qué publicar siguen requiriendo mi atención.

## Conclusión

Con este proyecto aprendí que una aplicación gráfica y multimedia necesita coordinación entre diseño, interacción y lógica. Una animación debe respetar las preferencias del usuario, un recurso visual debe cargarse correctamente y un control debe estar conectado a una función verificable.

Considero que trabajar con un agente de IA fue una oportunidad para practicar la definición de requisitos, la revisión crítica y la validación del software. El aprendizaje no consistió solamente en obtener código, sino en entender qué hace la aplicación, reconocer sus límites y poder explicar las decisiones tomadas durante su desarrollo.
