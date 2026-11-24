# Videos verticales para redes (HyperFrames)

`python3 gen.py A|B|C` genera `index.html` (1080x1920, 15 s) con el mismo cuerpo y 3 ganchos:
- A: problema («¿Necesitas imprimir para tu negocio?»)
- B: resultado (calendario 2027 impreso primero)
- C: dato real («Desde 1991 imprimiendo Chillán»)

Render: `npx hyperframes render --output ganchoX.mp4`. Versión 4:5: `ffmpeg -i in.mp4 -vf crop=1080:1350:0:285 ...`.
Los videos terminados NO van en `public/` (no son de la web): están en la carpeta `videos-redes/` del PC de Marcelo.
