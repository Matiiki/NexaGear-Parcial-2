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

# Rutas principales

La aplicación utiliza `HashRouter`, por lo que las rutas se muestran con `#` en la URL.

| Ruta | Página | Descripción |
|---|---|---|
| `/#/` | Home | Página de inicio |
| `/#/productos` | Productos | Catálogo completo |
| `/#/producto/:id` | ProductoDetalle | Detalle de un producto |
| `/#/categorias` | Categorías | Productos filtrados por categoría |
| `/#/ofertas` | Ofertas | Productos con descuento |
| `/#/carrito` | Carrito | Productos agregados y total |
| `/#/checkout` | Checkout | Datos de envío y confirmación de compra |
| `/#/compra-exitosa` | CompraExitosa | Confirmación del pedido |
| `/#/login` | Login | Inicio de sesión |
| `/#/registro` | Registro | Creación de cuenta |
| `/#/contacto` | Contacto | Formulario de contacto |
| `/#/admin` | AdminDashboard | Panel de administración |

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

También fue probado con Node.js 22 y npm 10 sin necesidad de modificar el código.

## 2. Instalar dependencias

Después de descargar o clonar el proyecto, abrir una terminal dentro de la carpeta del proyecto.

Ejecutar:

```bash
npm install
```

Este comando instalará todas las dependencias especificadas en `package.json`.

> **Nota para Windows:** si usas PowerShell y el comando `npm` está bloqueado por la política de ejecución de scripts, utiliza `npm.cmd` (por ejemplo, `npm.cmd install` o `npm.cmd run dev`).

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
TOTAL: 28 SUCCESS
```

Esto significa que las 28 pruebas fueron ejecutadas correctamente.

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
TOTAL: 28 SUCCESS
```

---

# Comandos principales

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias del proyecto |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión compilada |
| `npm test` | Ejecuta las pruebas con Karma y Jasmine |
| `node -v` | Muestra la versión de Node.js |
| `npm -v` | Muestra la versión de npm |

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

Las claves utilizadas son:

| Clave | Contenido |
|---|---|
| `carrito` | Productos agregados, cantidades y precios |
| `productosAdmin` | Catálogo y stock actualizado desde el panel |
| `categoriasAdmin` | Categorías creadas por el administrador |
| `usuariosAdmin` | Usuarios registrados |
| `sesionUsuario` | Datos del usuario con sesión activa |
| `pedidosAdmin` | Pedidos generados en el checkout |
| `ultimoPedido` | Copia del último pedido realizado |
| `perfilAdmin` | Datos del perfil del administrador |

Esto permite mantener la información aunque se actualice la página.

Para reiniciar los datos se puede ejecutar `localStorage.clear()` en la consola del navegador o eliminar los datos del sitio desde las herramientas de desarrollo.

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

Los archivos de prueba son:

| Archivo | Contenido |
|---|---|
| `src/tests/carrito.spec.js` | 4 pruebas sobre subtotales, total, cantidades y eliminación |
| `src/tests/productosRegistro.spec.js` | 6 pruebas sobre ofertas, precios, correos y contraseñas |
| `src/tests/casosPosibles.spec.js` | 18 pruebas sobre casos posibles del carrito, ofertas y validaciones |

En total se ejecutan **28 pruebas**, con **100% de cobertura** en sentencias, ramas, funciones y líneas. Además, Karma genera un reporte de cobertura en `coverage/html/index.html`.

---

# Limitaciones conocidas

Este proyecto es una simulación académica, por lo que presenta las siguientes limitaciones:

- El inicio de sesión es simulado: no se almacena ni se compara la contraseña.
- Las rutas de administración no cuentan con control de acceso.
- La información se guarda en `localStorage`, por lo que es local a cada navegador.
- El formulario de contacto no persiste los mensajes enviados.
- La página de error de pago existe, pero no está conectada a un flujo real.
- Las categorías creadas en el panel no se muestran en la vista pública si no tienen productos asociados.

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

- Matias Acevedo
- Felipe Marchant
