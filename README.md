# NexaGear — Desarrollo Fullstack II

**Evaluación Parcial 3 · Versión demostrativa frontend (sin backend)**

NexaGear es una tienda online de productos tecnológicos y accesorios gaming desarrollada con **React, Vite y Bootstrap**. Continúa el trabajo de las Evaluaciones Parciales 1 y 2 e incorpora los flujos y perfiles solicitados para la revisión de la Parcial 3.

> **Alcance de esta entrega:** se presenta una simulación funcional del frontend. El inicio de sesión, los roles, las compras y los pagos se simulan en el navegador con `localStorage` y `sessionStorage`. Esta versión **no implementa Spring Boot, MySQL, JWT ni autorización segura en el servidor**. Si esos componentes siguen siendo obligatorios en la evaluación, deberán implementarse por separado.

## Tecnologías

- React 17 y React Router DOM 5 (`HashRouter`).
- JavaScript y Bootstrap 5 para interfaz responsiva.
- Vite para ejecución y compilación.
- Vitest 0.34.6 para pruebas unitarias.
- `localStorage` y `sessionStorage` para persistencia y simulaciones locales.
- Git y GitHub para control de versiones; configuración de GitHub Pages mediante GitHub Actions.

## Funcionalidades implementadas

### Tienda y cliente

- Inicio, catálogo, detalle de productos, categorías y ofertas.
- Carrito con agregar, aumentar, disminuir, eliminar y vaciar productos; cálculo de cantidades, subtotal y total.
- Control de stock: impide agregar productos agotados o superar las unidades disponibles.
- **Desglose de IVA (19 % incluido en los precios)**: neto, impuesto y total, sin agregar el IVA por segunda vez.
- Registro e inicio/cierre de sesión de demostración, con validaciones de formularios.
- Checkout con nombre, correo, dirección, comuna, teléfono y tipo de entrega.
- **Compra exitosa:** muestra pedido, productos, cantidades, información de entrega, neto, IVA y total; guarda el pedido, descuenta stock y vacía el carrito.
- **Compra fallida simulada:** mediante la opción de rechazo en Checkout; muestra el motivo y permite reintentar. No registra un pedido, no descuenta stock y conserva el carrito.
- Formulario de contacto (sin envío a servidor).

### Administración y vendedor

- **Administrador:** acceso al panel y a las secciones de productos, categorías, usuarios, pedidos, reportes y perfil. Puede gestionar productos y stock.
- **Vendedor:** solo puede acceder a las listas y detalles de **Productos** y **Órdenes**. Estas vistas son de **solo lectura**, sin acciones de creación, edición ni eliminación.
- **Cliente:** accede a las funcionalidades de la tienda; las rutas administrativas se ocultan y se bloquean mediante la lógica de React.

> **Seguridad:** los permisos indicados son restricciones de interfaz, no controles de seguridad del servidor. Los datos de sesión y rol del navegador pueden manipularse. No deben utilizarse para un sistema comercial real.

## Cuentas de demostración

| Perfil | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@nexagear.cl` | `Admin1234!` |
| Vendedor | `vendedor@nexagear.cl` | `Vendedor1234!` |
| Cliente | `cliente@nexagear.cl` | `Cliente1234!` |

Estas credenciales son **únicamente para la demostración académica** y están definidas en el frontend; no son credenciales protegidas por un servidor. Los usuarios creados mediante el registro anterior también se tratan como clientes, pero **no existe verificación real de contraseña** para esas cuentas.

## Requisitos e instalación

Se necesita **Node.js y npm**. Para la configuración actual de Vite/Vitest se recomienda Node.js 18 o superior compatible con el proyecto; **Node 14.17.0 del laboratorio es demasiado antiguo** para algunas de estas dependencias.

Desde la carpeta raíz del proyecto:

```bash
node -v
npm -v
npm install
```

### Iniciar NexaGear

```bash
npm run dev
```

Abrir la URL que muestre Vite, normalmente `http://localhost:3000/`.

Para detener el servidor, usar `Ctrl + C`.

### Compilar para producción

```bash
npm run build
```

Este comando genera `dist/`. Si el proyecto tiene configurado el script correspondiente, se puede revisar la compilación local con `npm run preview`.

## Rutas principales

NexaGear utiliza `HashRouter`; por eso las rutas internas incluyen `#`.

| Ruta | Función | Acceso en la demo |
|---|---|---|
| `/#/` | Inicio | Tienda |
| `/#/productos` y `/#/producto/:id` | Catálogo y detalle | Tienda |
| `/#/categorias` y `/#/ofertas` | Categorías y ofertas | Tienda |
| `/#/registro` y `/#/login` | Registro e inicio de sesión | Público |
| `/#/carrito` | Carrito e IVA | Tienda |
| `/#/checkout` | Datos de entrega y pago simulado | Tienda |
| `/#/compra-exitosa` | Resumen de compra | Tienda |
| `/#/pago-error` | Resultado de pago rechazado | Tienda |
| `/#/contacto` | Contacto | Tienda |
| `/#/admin` | Panel administrativo | Administrador |
| `/#/admin/productos` | CRUD y stock | Administrador |
| `/#/admin/categorias` | Gestión de categorías | Administrador |
| `/#/admin/usuarios` | Gestión de usuarios | Administrador |
| `/#/admin/pedidos` | Órdenes | Administrador |
| `/#/admin/reportes` y `/#/admin/perfil` | Reportes y perfil | Administrador |
| `/#/vendedor/productos` | Lista de productos | Vendedor |
| `/#/vendedor/productos/:id` | Detalle de producto | Vendedor |
| `/#/vendedor/pedidos` | Lista de órdenes | Vendedor |
| `/#/vendedor/pedidos/:id` | Detalle de orden | Vendedor |

## IVA y proceso de compra

Los precios publicados **incluyen IVA**. Para desglosar el total:

```javascript
const neto = Math.round(total / 1.19);
const iva = total - neto;
```

Ejemplo para un producto de **$29.990**:

| Concepto | Importe |
|---|---:|
| Neto | $25.202 |
| IVA incluido (19 %) | $4.788 |
| **Total a pagar** | **$29.990** |

### Flujo de demostración

1. Iniciar sesión con el perfil **Cliente**.
2. Agregar un producto al carrito y revisar cantidades, stock, neto, IVA y total.
3. Completar Checkout y confirmar una **compra exitosa**. Verificar el resumen y el descuento de stock.
4. Repetir una compra marcando **Simular pago rechazado**. Comprobar que el carrito y el stock se conservan.
5. Cerrar sesión e ingresar como **Vendedor**; revisar únicamente productos, órdenes y sus detalles.
6. Cerrar sesión e ingresar como **Administrador**; comprobar el panel, CRUD de productos y demás módulos.
7. Intentar abrir `/#/admin` desde Cliente o Vendedor y verificar la redirección de interfaz.

Las compras y órdenes de esta demostración quedan almacenadas **en el mismo navegador**. Si se utiliza otro navegador o dispositivo, no se comparten los datos.

## Pruebas unitarias con Vitest

El proyecto contiene **28 casos de prueba declarados**, distribuidos en tres archivos:

| Archivo | Casos | Alcance |
|---|---:|---|
| `src/tests/carrito.spec.js` | 4 | Subtotal, total, aumentar y eliminar |
| `src/tests/productosRegistro.spec.js` | 6 | Precios, ofertas, correo y contraseñas |
| `src/tests/casosPosibles.spec.js` | 18 | Casos límite de carrito, productos y validaciones |
| **Total** | **28** | **Pruebas de funciones JavaScript** |

Las pruebas se centran en `src/utils/logicaNexaGear.js`. **No constituyen pruebas automáticas de los roles, del checkout completo ni de la integración con un backend.**

Para ejecutarlas:

```bash
npm test
```

O bien:

```bash
npx vitest run
```

Cuando los archivos tienen correctamente importados `describe`, `it` y `expect` desde `vitest`, el resultado esperado es:

```text
Test Files  3 passed (3)
Tests       28 passed (28)
```

> Este resultado se obtuvo en una ejecución anterior; **debe verificarse nuevamente en la versión que se entregue**, ya que también se detectó una ejecución posterior con imports de Vitest faltantes.

### Reportes TXT

En Git Bash pueden generarse evidencias con:

```bash
npx vitest run > reporte_tests_vitest.txt 2>&1
npx vitest run --coverage > reporte_cobertura_vitest.txt 2>&1
```

Para la cobertura debe estar instalado el proveedor compatible (`@vitest/coverage-v8@0.34.6`). Los porcentajes deben copiarse de la **ejecución real** y corresponden únicamente a los archivos incluidos en la medición; no se presupone cobertura del 100 % del frontend.

## Organización del código

```text
NexaGear-Parcial-2/
├── public/img/
├── src/
│   ├── components/       # Header, Footer y componentes reutilizables
│   ├── pages/            # Tienda, checkout, admin y vendedor
│   │   └── Vendedor.jsx
│   ├── data/             # Productos iniciales
│   ├── services/         # Acceso a datos simulados
│   ├── utils/            # Lógica reutilizable
│   ├── tests/            # Pruebas Vitest
│   ├── app.jsx           # Rutas y carrito
│   └── Main.jsx          # Entrada a React
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

Esta es una organización por responsabilidades; **no se afirma que se haya implementado Atomic Design completo**.

## Persistencia local

| Clave | Contenido |
|---|---|
| `carrito` | Ítems y cantidades del carrito |
| `productosAdmin` | Productos y stock |
| `categoriasAdmin` | Categorías administradas |
| `usuariosAdmin` | Usuarios registrados en la demo |
| `sesionUsuario` | Datos y rol del usuario conectado |
| `pedidosAdmin` | Pedidos exitosos registrados |
| `ultimoPedido` | Resumen de la última compra exitosa |
| `perfilAdmin` | Perfil del administrador |
| `sessionStorage: ultimoPagoFallido` | Datos temporales del último rechazo simulado |

Para reiniciar todos los datos locales **de ese sitio**, desde la consola del navegador:

```javascript
localStorage.clear();
sessionStorage.clear();
```

**Atención:** esto elimina los registros de prueba, pedidos, productos personalizados y el carrito que existan en ese navegador.

## GitHub y publicación

**Repositorio frontend:** https://github.com/Matiiki/NexaGear-Parcial-2

**URL prevista de GitHub Pages:** https://matiiki.github.io/NexaGear-Parcial-2/

El repositorio contiene una configuración de despliegue por GitHub Actions. **Se debe comprobar que la publicación abre correctamente**; una ejecución previa mostró la página en blanco por un problema de rutas/base de Vite. GitHub Pages solo publica el frontend estático y no proporciona por sí mismo base de datos ni backend.

## Limitaciones de la versión presentada

- Inicio de sesión y cuentas de demostración **sin autenticación segura en servidor**.
- Permisos de Administrador/Vendedor/Cliente implementados **solo en la interfaz React**; se pueden alterar manipulando el navegador.
- Los usuarios del registro anterior no validan realmente la contraseña introducida.
- No hay API REST, Spring Boot, base de datos compartida, Spring Security ni JWT.
- Los productos, usuarios y órdenes viven en el `localStorage` del navegador.
- Pagos exitosos y rechazados **simulados**, sin cobro real ni pasarela de pago.
- El contacto no envía mensajes a un servidor.

**Importante para la evaluación:** esta versión cubre la demostración frontend de roles y vistas de compra indicada por el profesor, **pero no sustituye** los requisitos de backend y seguridad presentes en la rúbrica escrita de la Parcial 3. Se presentará como entrega definitiva solo si el docente autoriza expresamente ese alcance.

## Preparación del ZIP

Incluir los archivos de código fuente, `public`, `src`, `package.json`, `package-lock.json`, configuración de Vite/Vitest, README y el workflow de despliegue si corresponde. No incluir carpetas generadas ni internas como:

```text
node_modules/
dist/
coverage/
.git/
```

## Integrantes

- Matias Acevedo
- Felipe Marchant

**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Proyecto:** NexaGear — versión frontend para revisión de Evaluación Parcial 3.
