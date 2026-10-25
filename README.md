# NexaGear - Evaluación Parcial 2

NexaGear es una tienda online desarrollada con React para la asignatura **Desarrollo Fullstack II**.

El proyecto corresponde a la continuación de la Evaluación Parcial 1, migrando el sitio original desarrollado con HTML, CSS y JavaScript hacia una aplicación basada en componentes React.

## Tecnologías utilizadas

- React 17
- React Router DOM 5
- JavaScript
- Bootstrap 5
- Vite
- LocalStorage
- Jasmine
- Karma

## Funcionalidades principales

El proyecto incluye:

- Página de inicio.
- Catálogo de productos.
- Detalle de productos.
- Categorías.
- Productos en oferta.
- Carrito de compras.
- Control de cantidades.
- Control de stock.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Formulario de contacto.
- Checkout.
- Validaciones de formularios.
- Registro de pedidos.
- Compra exitosa.
- Panel de administración.
- Administración de productos.
- Administración de categorías.
- Administración de usuarios.
- Administración de pedidos.
- Reportes.
- Persistencia mediante LocalStorage.
- Pruebas unitarias con Jasmine y Karma.

---

# Cómo ejecutar el proyecto

## 1. Requisitos

Se debe tener instalado:

- Node.js
- npm

El proyecto fue desarrollado utilizando una versión compatible con:

```bash
node v14.x
npm 6.x
```

## 2. Instalar dependencias

Después de descargar o clonar el proyecto, abrir una terminal dentro de la carpeta del proyecto.

Ejecutar:

```bash
npm install
```

Este comando instalará todas las dependencias especificadas en `package.json`.

---

# Iniciar la página

Para iniciar NexaGear ejecutar:

```bash
npm run dev
```

Vite iniciará el servidor de desarrollo.

En la terminal aparecerá una dirección similar a:

```text
Local: http://localhost:3000/
```

Abrir esa dirección en el navegador.

Ejemplo:

```text
http://localhost:3000/
```

Para detener el servidor presionar:

```text
Ctrl + C
```

---

# Ejecutar los tests

El proyecto utiliza:

- Jasmine para escribir las pruebas unitarias.
- Karma para ejecutar las pruebas.

Para ejecutar todas las pruebas:

```bash
npm test
```

Si todas las pruebas funcionan correctamente, la terminal mostrará un resultado similar a:

```text
TOTAL: 10 SUCCESS
```

Esto significa que las 10 pruebas fueron ejecutadas correctamente.

---

# Ejemplo de un test exitoso

Un test puede comprobar el cálculo del subtotal de un producto:

```javascript
expect(
    calcularSubtotal(29990, 2)
).toBe(59980);
```

Si la función devuelve `59980`, la prueba será exitosa.

---

# Ejemplo para demostrar un test fallido

Para demostrar el funcionamiento de las pruebas durante la presentación se puede modificar temporalmente el resultado esperado.

Ejemplo correcto:

```javascript
expect(
    calcularSubtotal(29990, 2)
).toBe(59980);
```

Modificar temporalmente a:

```javascript
expect(
    calcularSubtotal(29990, 2)
).toBe(50000);
```

Luego ejecutar:

```bash
npm test
```

Karma y Jasmine deberían indicar que existe una prueba fallida.

Después de la demostración se debe restaurar el valor correcto:

```javascript
expect(
    calcularSubtotal(29990, 2)
).toBe(59980);
```

Y volver a ejecutar:

```bash
npm test
```

El resultado debería volver a mostrar:

```text
TOTAL: 10 SUCCESS
```

---

# Comandos principales

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

Ejecutar pruebas:

```bash
npm test
```

Ver versión de Node.js:

```bash
node -v
```

Ver versión de npm:

```bash
npm -v
```

---

# Estructura general

```text
NexaGear-Parcial-2
│
├── public
│   └── img
│
├── src
│   ├── components
│   ├── data
│   ├── pages
│   ├── services
│   ├── tests
│   ├── utils
│   ├── app.jsx
│   └── Main.jsx
│
├── index.html
├── karma.conf.js
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# Persistencia de datos

NexaGear utiliza `localStorage` para simular la persistencia de información en el navegador.

Se almacenan datos como:

- Productos.
- Stock.
- Usuarios registrados.
- Sesión del usuario.
- Carrito.
- Pedidos.
- Categorías.
- Datos administrativos.

Esto permite mantener la información aunque se actualice la página.

---

# Testing

Las pruebas se encuentran principalmente en:

```text
src/tests/
```

La lógica utilizada por las pruebas se encuentra en:

```text
src/utils/logicaNexaGear.js
```

Las pruebas permiten verificar funcionalidades como:

- Cálculo de subtotales.
- Cálculo del total del carrito.
- Aumento de cantidades.
- Eliminación de productos.
- Precio de productos en oferta.
- Filtrado de ofertas.
- Validación de correos.
- Validación de contraseñas.

---

# Importante

No es necesario incluir la carpeta:

```text
node_modules
```

al comprimir el proyecto para la entrega.

Las dependencias pueden recuperarse nuevamente ejecutando:

```bash
npm install
```

## Proyecto académico

Proyecto desarrollado para la **Evaluación Parcial 2 de Desarrollo Fullstack II**.

## Integrantes 
-Matias Acevedo
-Felipe Marchant 
