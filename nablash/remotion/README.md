# Nablash — 20 segundos con SFX

Composición Remotion `Nablash20`, 1920 × 1080, 30 fps, 600 frames. Seis escenas basadas en el storyboard 03: apertura dentro del isotipo, desorden, presión del día, entrada de marca, calma y cierre. Tipografía sans serif y paleta de Nablash. El isotipo y el nombre se trazaron en SVG a partir de las referencias suministradas.

## Editar

```bash
npm ci
npm run dev
```

Seleccionar `Nablash20` en Remotion Studio. `src/Nablash20.tsx` contiene las escenas y sus entradas por frame. La composición anterior `Nablash` se conserva como referencia.

## Renderizar

```bash
npx remotion render src/index.ts Nablash20 out/nablash-20s-sfx.mp4 --codec=h264 --crf=18
```

En el entorno de nube se utilizó `--browser-executable=/usr/bin/chromium --concurrency=2`. Si la caché predeterminada no es escribible, usar `npm_config_cache=/tmp/nablash-npm npm ci`.

## Sonido

`public/audio/nablash-sfx.wav`: diseño sonoro original de 20 segundos, con barridos, golpes breves y tonos suaves sincronizados con las entradas. No incluye locución ni música. Fuentes locales; no necesita recursos externos en el render.

## Verificación

`npm run lint` valida ESLint y TypeScript. El archivo exportado se verifica con ffprobe para confirmar duración, resolución, framerate y pista de audio.
