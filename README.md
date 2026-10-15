# Interfaz de Usuario - Frontend

Este repositorio contiene la aplicación **Frontend** para interactuar de forma visual con el ecosistema de APIs de la aplicación.

---

## 🛠️ Prerrequisitos Local

Antes de encender la interfaz, asegúrate de cumplir las siguientes condiciones:
1. Tener el servidor de base de datos **PostgreSQL** corriendo con la base de datos `nuevaeps`.
2. Tener las APIs **`api-auth`** y **`api-solicitudes`** encendidas y escuchando en sus respectivos puertos locales.

---

## 🚀 Instalación y Despliegue

### 1. Clonar e Instalar Dependencias
Abre una terminal en la raíz de este proyecto y descarga los módulos necesarios del sistema:

```bash
npm install
```

### 2. Configurar Variables de Entorno (Opcional)
Si tus servicios locales corren en puertos personalizados, asegúrate de crear un archivo `.env` en la raíz de este proyecto apuntando a las APIs:
```env
API_AUTH_URL=http://localhost:8081
API_SOLICITUDES_URL=http://localhost:8082
```

### 3. Levantar Servidor de Desarrollo
Para arrancar el proyecto en tu entorno local, ejecuta:

```bash
npm run dev
```

Abre tu navegador e ingresa a la dirección provista por la consola (comúnmente `http://localhost:3000` o `http://localhost:5173`).

# Front

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
