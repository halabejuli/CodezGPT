# Nablash — storyboard 03, revisión animada

Composición principal: **NablashFilm**, 1920 × 1080, 30 fps, 600 fotogramas (20 segundos), con SFX originales.

La revisión conserva los materiales, luces y encuadres del storyboard 03. Las seis placas de fondo de `public/film/` se derivaron de las viñetas aprobadas, sin textos. Remotion compone esas placas con movimientos de cámara, tipografía Inter animada por separado, profundidad aparente en los textos, isotipo SVG con material, partículas y transiciones diagonales. Es una composición de capas con apariencia de relieve; las placas no son una escena 3D editable.

## Editar

```bash
npm ci
npm run dev
```

Seleccionar **NablashFilm**. `src/NablashFilm.tsx` contiene sus seis planos. `Nablash20` conserva la primera animación como historial; `Nablash` conserva el primer video de 53 segundos.

## Renderizar

```bash
npx remotion render src/index.ts NablashFilm out/nablash-storyboard03-v2.mp4 --codec=h264 --crf=18
```

En el entorno de nube se utilizó `--browser-executable=/usr/bin/chromium --concurrency=2`. Si la caché de npm no es escribible: `npm_config_cache=/tmp/nablash-npm npm ci`.

## Audio y marcas de entrada

`public/audio/nablash-sfx.wav` es diseño sonoro original, sin música ni locución. Está sincronizado con las entradas de texto y los seis bloques (0, 3, 6, 9, 12 y 16 segundos). El volumen de la revisión es 1.65 veces el nivel de la pista original, sin recorte de picos.

El isotipo y la palabra Nablash están trazados en SVG a partir de las referencias enviadas. Los planos 04 y 06 reutilizan esos vectores, con sombreado y textura.

## Verificación

`npm run lint` valida ESLint y TypeScript. Se revisan fotogramas representativos de los seis planos contra el storyboard, y se comprueba la exportación y la pista de audio con ffprobe y una decodificación completa de ffmpeg.
