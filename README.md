# Combustibles CR

Explorador web de los tres recursos públicos documentados por RECOPE:

- precios vigentes al consumidor;
- precios vigentes en plantel;
- precios internacionales, con filtro opcional por fechas.

La aplicación usa un proxy local y otro en el servidor SSR para evitar el bloqueo CORS del API oficial.

## Development server

Ejecuta `npm start` y abre `http://localhost:4200/`. El proxy de desarrollo se carga automáticamente.

## Build

Ejecuta `npm run build`. Para servir el resultado con SSR y el proxy incluido, ejecuta después `npm run serve:ssr:apprecope`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Fuente de datos: [API pública de RECOPE](https://datosabiertos.recope.go.cr/servicio-api).
