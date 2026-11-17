# Encriptado SMRLD

Escribe un mensaje, presiona un botón y el texto aparece escrito en un alfabeto cifrado.
Sitio estático: HTML, CSS y JavaScript, sin dependencias ni build.

## Cómo funciona

El cifrado es una sustitución simple: cada letra latina tiene un símbolo propio.
En vez de reemplazar caracteres en JavaScript, el mapeo vive en una fuente
TrueType (`fonts/EncriptadoSMRLD-Regular.ttf`): el texto sigue siendo texto normal y
es el glifo el que cambia.

Ventajas de hacerlo así: se puede copiar, buscar y leer con lector de pantalla
como texto plano, y la misma fuente sirve en Word, Canva o un PDF.

Las mayúsculas y las vocales acentuadas usan el mismo símbolo que su letra base,
porque el alfabeto original no distinguía ninguna de las dos cosas.
Las letras `h`, `k`, `w`, `x`, `z` y `ñ` no existían en el alfabeto original y se
añadieron siguiendo el mismo sistema de forma base más circulito.

## Correr en local

No hay nada que compilar. Cualquier servidor estático sirve:

```bash
npx serve .
# o
python3 -m http.server 3000
```

Luego abre `http://localhost:3000`.

> Conviene usar un servidor en vez de abrir `index.html` con doble clic: algunos
> navegadores bloquean la carga de la fuente bajo el protocolo `file://`.

## Desplegar en Vercel

Vercel detecta el proyecto como sitio estático, así que no hace falta
`vercel.json` ni configuración extra.

Desde la web:

1. Sube el repositorio a GitHub.
2. En Vercel, **Add New → Project** e importa el repositorio.
3. En Framework Preset deja **Other**, y deja vacíos Build Command y Output Directory.
4. **Deploy**.

Desde la terminal:

```bash
npm i -g vercel
vercel        # preview
vercel --prod # producción
```

## Estructura

```
.
├── index.html
├── styles.css
├── app.js
└── fonts/
    └── EncriptadoSMRLD-Regular.ttf
```

## Licencia

MIT, ver `LICENSE`.
