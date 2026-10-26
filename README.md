# NexaGear - Evaluación Parcial 2

NexaGear es una tienda online desarrollada con React para la asignatura **Desarrollo Fullstack II**.

El proyecto corresponde a la continuación de la Evaluación Parcial 1, migrando y ampliando el sitio original desarrollado con HTML, CSS y JavaScript hacia una aplicación frontend basada en componentes React.

---

## Tecnologías utilizadas

- React 17
- React Router DOM 5
- JavaScript
- Bootstrap 5
- Vite
- Vitest 0.34.6
- LocalStorage
- Git
- GitHub
- GitHub Pages

---

# Funcionalidades principales

El proyecto incluye:

- Página de inicio.
- Catálogo de productos.
- Detalle de productos.
- Categorías.
- Productos en oferta.
- Carrito de compras.
- Aumento y disminución de cantidades.
- Eliminación de productos del carrito.
- Cálculo automático de subtotales y total.
- Control de stock.
- Bloqueo de productos sin stock.
- Límite de compra según stock disponible.
- Descuento automático de stock después de una compra.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Formulario de contacto.
- Checkout.
- Validación de datos del checkout.
- Validación de correo electrónico.
- Validación de teléfono.
- Validación de nombres y comuna.
- Registro de pedidos.
- Compra exitosa.
- Panel de administración.
- Administración de productos.
- Administración de categorías.
- Administración de usuarios.
- Administración de pedidos.
- Reportes administrativos.
- Persistencia mediante LocalStorage.
- Pruebas unitarias con Vitest.

---

# Rutas principales

La aplicación utiliza `HashRouter`, por lo que las rutas se muestran utilizando `#` en la URL.

| Ruta | Página | Descripción |
|---|---|---|
| `/#/` | Home | Página de inicio |
| `/#/productos` | Productos | Catálogo completo |
| `/#/producto/:id` | ProductoDetalle | Detalle de un producto |
| `/#/categorias` | Categorías | Productos filtrados por categoría |
| `/#/ofertas` | Ofertas | Productos con descuento |
| `/#/carrito` | Carrito | Productos agregados, cantidades y total |
| `/#/checkout` | Checkout | Datos de envío y confirmación de compra |
| `/#/compra-exitosa` | CompraExitosa | Confirmación del pedido |
| `/#/pago-error` | PagoError | Vista de error de pago |
| `/#/login` | Login | Inicio de sesión |
| `/#/registro` | Registro | Creación de cuenta |
| `/#/contacto` | Contacto | Formulario de contacto |
| `/#/admin` | AdminDashboard | Panel de administración |
| `/#/admin/productos` | AdminProductos | Gestión de productos y stock |
| `/#/admin/categorias` | AdminCategorias | Gestión de categorías |
| `/#/admin/usuarios` | AdminUsuarios | Gestión de usuarios |
| `/#/admin/pedidos` | AdminPedidos | Gestión de pedidos |
| `/#/admin/reportes` | AdminReportes | Reportes administrativos |
| `/#/admin/perfil` | AdminPerfil | Perfil administrativo |

---

# Cómo ejecutar el proyecto

## 1. Requisitos

Se debe tener instalado:

- Node.js
- npm

El proyecto fue preparado para funcionar en el entorno utilizado durante el desarrollo de la asignatura.

Para verificar las versiones instaladas:

```bash
node -v
npm -v
```

---

## 2. Instalar dependencias

Después de descargar o clonar el proyecto, abrir una terminal dentro de la carpeta principal.

Ejecutar:

```bash
npm install
```

Este comando instalará todas las dependencias definidas en `package.json`.

---

# Iniciar la página

Para iniciar NexaGear en modo desarrollo ejecutar:

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

Para detener el servidor:

```text
Ctrl + C
```

---

# Generar versión de producción

Para generar la versión optimizada de producción:

```bash
npm run build
```

Vite generará la carpeta:

```text
dist/
```

Esta carpeta contiene la versión compilada de la aplicación.

---

# GitHub Pages

El proyecto está preparado para ser publicado mediante GitHub Pages utilizando GitHub Actions.

Repositorio:

```text
https://github.com/Matiiki/NexaGear-Parcial-2
```

Dirección de publicación:

```text
https://matiiki.github.io/NexaGear-Parcial-2/
```

Al estar publicado en GitHub Pages no es necesario ejecutar `npm run dev` para visualizar la aplicación.

La configuración de Vite utiliza como ruta base:

```text
/NexaGear-Parcial-2/
```

La aplicación utiliza `HashRouter`, lo que permite mantener correctamente las rutas al utilizar GitHub Pages.

---

# Ejecutar los tests

El proyecto utiliza **Vitest** para desarrollar y ejecutar las pruebas unitarias.

Actualmente existen:

```text
28 pruebas unitarias
```

distribuidas en 3 archivos de prueba.

Para ejecutar todas las pruebas:

```bash
npx vitest run
```

También puede utilizarse:

```bash
npm test
```

si el script se encuentra configurado en `package.json`.

El resultado correcto es similar a:

```text
Test Files  3 passed (3)
Tests       28 passed (28)
```

Esto significa que las 28 pruebas finalizaron correctamente.

---

# Archivos de testing

Las pruebas se encuentran en:

```text
src/tests/
```

Actualmente se utilizan:

| Archivo | Pruebas | Contenido |
|---|---:|---|
| `carrito.spec.js` | 4 | Subtotal, total, aumento y eliminación |
| `productosRegistro.spec.js` | 6 | Ofertas, precios, correo y contraseñas |
| `casosPosibles.spec.js` | 18 | Casos límite de carrito, productos y validaciones |

Total:

```text
28 pruebas
```

---

# Funciones probadas

La lógica principal utilizada por las pruebas se encuentra en:

```text
src/utils/logicaNexaGear.js
```

Entre las funciones probadas se encuentran:

```javascript
calcularSubtotal()
calcularTotal()
aumentarCantidad()
eliminarProducto()
obtenerPrecioFinal()
filtrarOfertas()
correoEsValido()
contrasenasCoinciden()
```

---

# Casos cubiertos por los tests

## Carrito

Las pruebas verifican:

- Cálculo correcto del subtotal.
- Cálculo correcto del total.
- Aumento de cantidad.
- Eliminación de productos.
- Intento de aumentar un producto inexistente.
- Eliminación de un producto inexistente.
- Carrito vacío.
- Cantidad igual a cero.
- Inmutabilidad del arreglo original.

## Productos y ofertas

Las pruebas verifican:

- Precio normal.
- Precio de oferta.
- Filtrado de productos en oferta.
- Producto sin propiedad de oferta.
- Precio de oferta igual a cero.
- Oferta sin precio de oferta.
- Lista de productos vacía.
- Lista sin productos en oferta.

## Correos electrónicos

Las pruebas verifican:

- Correo válido.
- Correo inválido.
- Correo con mayúsculas.
- Espacios adicionales.
- Dos puntos seguidos.
- Dos arrobas.
- Dominio incompleto.
- Extensión de dominio inválida.

Ejemplo rechazado:

```text
usuario..test@gmail.com
```

Ejemplo aceptado:

```text
usuario@gmail.com
```

## Contraseñas

Las pruebas verifican:

- Contraseñas iguales.
- Contraseñas diferentes.
- Comportamiento con valores vacíos.

---

# Ejemplo de un test con Vitest

```javascript
import {
    describe,
    it,
    expect
} from "vitest";

describe("Carrito NexaGear", function() {

    it("debe calcular correctamente el subtotal", function() {

        const resultado =
            calcularSubtotal(29990, 2);

        expect(resultado).toBe(59980);
    });

});
```

Si la función devuelve:

```text
59980
```

la prueba finaliza correctamente.

---

# Demostrar un test fallido

Para demostrar el funcionamiento de Vitest durante la presentación puede modificarse temporalmente un resultado esperado.

Test correcto:

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

Ejecutar:

```bash
npx vitest run
```

Vitest mostrará una prueba fallida porque:

```text
Valor recibido: 59980
Valor esperado: 50000
```

Después de la demostración se debe restaurar:

```javascript
expect(
    calcularSubtotal(29990, 2)
).toBe(59980);
```

y volver a ejecutar:

```bash
npx vitest run
```

El resultado debe volver a:

```text
Tests 28 passed (28)
```

---

# Cobertura de testing

Para ejecutar las pruebas con cobertura:

```bash
npx vitest run --coverage
```

Si existe el script correspondiente en `package.json`, también puede utilizarse:

```bash
npm run coverage
```

Vitest permite analizar:

- Statements.
- Branches.
- Functions.
- Lines.

Los porcentajes utilizados en el informe de cobertura deben corresponder a los resultados reales entregados por Vitest.

---

# Generar reporte TXT de los tests

Para guardar el resultado de las pruebas en un archivo de texto utilizando Git Bash:

```bash
npx vitest run > reporte_tests_vitest.txt 2>&1
```

Esto genera:

```text
reporte_tests_vitest.txt
```

Para guardar el reporte de cobertura:

```bash
npx vitest run --coverage > reporte_cobertura_vitest.txt 2>&1
```

Esto genera:

```text
reporte_cobertura_vitest.txt
```

Estos archivos pueden utilizarse como evidencia del proceso de testing.

---

# Comandos principales

| Comando | Descripción |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Inicia NexaGear en desarrollo |
| `npm run build` | Genera la aplicación para producción |
| `npm run preview` | Visualiza localmente la compilación |
| `npx vitest run` | Ejecuta las 28 pruebas |
| `npx vitest run --coverage` | Ejecuta pruebas y calcula cobertura |
| `npm test` | Ejecuta Vitest si está configurado en scripts |
| `node -v` | Muestra la versión de Node.js |
| `npm -v` | Muestra la versión de npm |
| `git status` | Muestra el estado del repositorio |
| `git pull --rebase origin main` | Actualiza el repositorio local |
| `git push origin main` | Sube los cambios a GitHub |

---

# Estructura general del proyecto

```text
NexaGear-Parcial-2
│
├── .github
│   └── workflows
│       └── deploy.yml
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
│   │   ├── carrito.spec.js
│   │   ├── productosRegistro.spec.js
│   │   └── casosPosibles.spec.js
│   │
│   ├── utils
│   │   └── logicaNexaGear.js
│   │
│   ├── app.jsx
│   └── Main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

# Persistencia de datos

NexaGear utiliza `localStorage` para simular la persistencia de información en el navegador.

Las principales claves utilizadas son:

| Clave | Contenido |
|---|---|
| `carrito` | Productos agregados, cantidades y precios |
| `productosAdmin` | Catálogo y stock actualizado |
| `categoriasAdmin` | Categorías creadas desde administración |
| `usuariosAdmin` | Usuarios registrados |
| `sesionUsuario` | Usuario con sesión activa |
| `pedidosAdmin` | Pedidos realizados |
| `ultimoPedido` | Último pedido generado |
| `perfilAdmin` | Información del perfil administrativo |

Esto permite mantener la información aunque se actualice la página.

Para borrar los datos almacenados durante las pruebas se puede utilizar en la consola:

```javascript
localStorage.clear();
```

---

# Control de stock

Los productos poseen una cantidad de stock disponible.

El sistema permite:

- Definir stock desde el panel de administración.
- Mostrar el stock disponible al cliente.
- Mostrar `Sin stock` cuando la cantidad llega a cero.
- Deshabilitar la compra de productos agotados.
- Impedir superar el stock disponible desde el carrito.
- Validar nuevamente el stock durante el checkout.
- Descontar automáticamente el stock después de realizar una compra.

Ejemplo:

```text
Stock inicial: 2
Compra: 1 unidad
Stock restante: 1
```

Si se compra la última unidad:

```text
Stock: 0
Estado: Sin stock
```

---

# Validaciones

## Registro

El formulario de registro valida:

- Nombre obligatorio.
- Nombre solo con letras.
- Apellido obligatorio.
- Apellido solo con letras.
- Correo electrónico válido.
- Correo no duplicado.
- Contraseña mínima.
- Confirmación de contraseña.
- Contraseñas coincidentes.
- Fecha de nacimiento no futura.

## Checkout

El checkout valida:

- Nombre completo.
- Nombre solo con letras.
- Correo electrónico válido.
- Dirección obligatoria.
- Comuna obligatoria.
- Comuna solo con letras.
- Teléfono de exactamente 9 números.
- Tipo de entrega.
- Stock disponible antes de confirmar la compra.

Ejemplo de teléfono válido:

```text
912345678
```

Ejemplo de correo inválido:

```text
matias@gmail..com
```

---

# Arquitectura del proyecto

La aplicación divide responsabilidades utilizando diferentes carpetas:

```text
components/
```

Componentes reutilizables de interfaz.

```text
pages/
```

Vistas principales de la aplicación.

```text
services/
```

Funciones relacionadas con acceso y persistencia de datos.

```text
data/
```

Datos iniciales de productos.

```text
utils/
```

Funciones reutilizables de lógica.

```text
tests/
```

Pruebas unitarias ejecutadas con Vitest.

Esta separación facilita el mantenimiento y organización del código.

---

# Limitaciones conocidas

NexaGear es una aplicación frontend desarrollada con fines académicos.

Actualmente presenta las siguientes limitaciones:

- No utiliza una base de datos real.
- La información se almacena mediante `localStorage`.
- Los datos son locales a cada navegador.
- El inicio de sesión es simulado.
- No existe autenticación mediante backend.
- Las rutas administrativas no poseen autorización mediante servidor.
- El formulario de contacto no envía información a un servidor.
- El procesamiento de pagos es simulado.

---

# Entrega del proyecto

Para comprimir el proyecto no es necesario incluir:

```text
node_modules
```

Tampoco es necesario incluir:

```text
dist
```

si el proyecto será compilado nuevamente.

Las dependencias pueden recuperarse ejecutando:

```bash
npm install
```

---

# Proyecto académico

Proyecto desarrollado para la **Evaluación Parcial 2 de Desarrollo Fullstack II**.

## Integrantes

- Matias Acevedo
- Felipe Marchant
