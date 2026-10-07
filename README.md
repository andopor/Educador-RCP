# Educador RCP · IES María Soliño

Web estática para 1.º y 2.º de ESO. Sin dependencias de producción ni paso de compilación.

## Desarrollo

Desde esta carpeta, ejecutar `python3 -m http.server 8080 --bind 127.0.0.1` y abrir `http://127.0.0.1:8080`.
Los módulos JavaScript requieren un servidor HTTP; no abrir el HTML directamente con `file://`.

- `index.html`: estructura accesible y portada.
- `css/style.css`: diseño adaptable, identidad y reducción de movimiento.
- `js/content.js`: protocolos, lecciones, situaciones y preguntas.
- `js/app.js`: navegación y renderizado de actividades.
- `js/quiz.js`: estado y evaluación proporcional de conocimientos.
- `js/audio.js`: lectura y metrónomo con planificación Web Audio.

`npm test` comprueba puntuación, niveles y recorridos de la simulación. `npm run check` verifica sintaxis.

## Contenido

Revisado el 7 de octubre de 2026 con las guías ERC 2025:

- Adulto: https://www.erc.edu/media/wrhj5sye/gl2025-04-bls-e.pdf
- Pediátrico: https://www.erc.edu/media/03xnpjmj/gl2025-09-pls-e.pdf

La llamada al 112 sucede en cuanto se comprueba que la persona no responde. Los jadeos no se consideran respiración normal. La excepción pediátrica de un minuto antes de alejarse para pedir ayuda corresponde solo a estar solo sin teléfono disponible. La relación pediátrica depende de la formación específica en SVB pediátrico. La profundidad se adapta al tórax, con el límite máximo de 6 cm.

Las actividades no acreditan la técnica. La lista de práctica es observación docente con maniquí. No se guardan datos personales ni se incluyen analíticas. La sección Recursos ha sido eliminada; el DEA se enseña en su propia lección y las fuentes están en el pie.

## Publicación

Repositorio: https://github.com/andopor/Educador-RCP
Proyecto: educador-rcp. Web: https://educador-rcp.vercel.app/

Servir los archivos desde la raíz. Si Vercel solicita un preset, usar Other, sin comando de compilación ni directorio de salida personalizado. Un cambio local no actualiza producción hasta publicar un despliegue.
