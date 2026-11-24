# Video del hero (HyperFrames)

Fuente del video `public/videos/hero-impresora-color.mp4` (12,8 s, 1920x1080, loop, sin sonido).

- `index.html`: raíz, monta dos escenas.
- `compositions/montage.html`: 8 productos, 1,2 s cada uno, fondo de color por producto.
- `compositions/endcard.html`: logo + "Cotiza hoy por WhatsApp" + puente para que el loop no se note.
- `assets/`: copias de las fotos de `public/images` (reemplazar acá si se mejoran las fotos y volver a renderizar).

Render: `npx hyperframes check` y luego `npx hyperframes render --output hero-master.mp4`.
Versión web: `ffmpeg -i hero-master.mp4 -vf scale=1280:720 -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart -an hero-impresora-color.mp4`
Imagen fija: primer cuadro del video a 1280x720.
