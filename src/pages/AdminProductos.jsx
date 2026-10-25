import React, { useState } from "react";

import productosIniciales from "../data/productos.js";


function AdminProductos() {

    const [productos, setProductos] = useState(function() {

        const productosGuardados =
            localStorage.getItem("productosAdmin");


        const lista =
            productosGuardados
                ? JSON.parse(productosGuardados)
                : productosIniciales;


        return lista.map(function(producto) {

            return {
                ...producto,

                stock:
                    producto.stock === undefined ||
                    producto.stock === null
                        ? 10
                        : Number(producto.stock)
            };

        });
    });


    const [formulario, setFormulario] = useState({

        id: "",
        nombre: "",
        categoria: "",
        precio: "",
        stock: "",
        imagen: "",
        descripcion: "",
        oferta: false,
        precioOferta: ""
    });


    const [editando, setEditando] =
        useState(false);

    const [error, setError] =
        useState("");


    const categoriasGuardadas =
        localStorage.getItem(
            "categoriasAdmin"
        );


    const categorias =
        categoriasGuardadas
            ? JSON.parse(categoriasGuardadas)
            : [
                ...new Set(
                    productos.map(
                        function(producto) {

                            return producto.categoria;
                        }
                    )
                )
            ];


    function guardarProductos(
        nuevosProductos
    ) {

        setProductos(nuevosProductos);

        localStorage.setItem(
            "productosAdmin",
            JSON.stringify(nuevosProductos)
        );
    }


    function manejarCambio(evento) {

        const {
            name,
            value,
            type,
            checked
        } = evento.target;


        setFormulario({
            ...formulario,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });


        setError("");
    }


    function limpiarFormulario() {

        setFormulario({

            id: "",
            nombre: "",
            categoria: "",
            precio: "",
            stock: "",
            imagen: "",
            descripcion: "",
            oferta: false,
            precioOferta: ""
        });


        setEditando(false);

        setError("");
    }


    function validarFormulario() {

        if (
            formulario.nombre.trim() === "" ||
            formulario.categoria.trim() === "" ||
            formulario.precio === "" ||
            formulario.stock === ""
        ) {

            setError(
                "Nombre, categoría, precio y stock son obligatorios."
            );

            return false;
        }


        if (
            Number(formulario.precio) <= 0
        ) {

            setError(
                "El precio debe ser mayor a 0."
            );

            return false;
        }


        if (
            Number(formulario.stock) < 0 ||
            !Number.isInteger(
                Number(formulario.stock)
            )
        ) {

            setError(
                "El stock debe ser un número entero igual o mayor a 0."
            );

            return false;
        }


        if (
            formulario.oferta &&
            formulario.precioOferta === ""
        ) {

            setError(
                "Debe ingresar un precio de oferta."
            );

            return false;
        }


        if (
            formulario.oferta &&
            Number(
                formulario.precioOferta
            ) >=
            Number(formulario.precio)
        ) {

            setError(
                "El precio de oferta debe ser menor al precio normal."
            );

            return false;
        }


        return true;
    }


    function agregarProducto(evento) {

        evento.preventDefault();

        setError("");


        if (!validarFormulario()) {
            return;
        }


        const nuevoProducto = {

            id:
                formulario.nombre
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                +
                "-"
                +
                Date.now(),

            nombre:
                formulario.nombre.trim(),

            categoria:
                formulario.categoria.trim(),

            precio:
                Number(formulario.precio),

            stock:
                Number(formulario.stock),

            imagen:
                formulario.imagen.trim() !== ""
                    ? formulario.imagen.trim()
                    : "/img/mouse-logitech.jpg",

            descripcion:
                formulario.descripcion.trim(),

            oferta:
                formulario.oferta,

            precioOferta:
                formulario.oferta
                    ? Number(
                        formulario.precioOferta
                    )
                    : null
        };


        const nuevosProductos = [
            ...productos,
            nuevoProducto
        ];


        guardarProductos(
            nuevosProductos
        );


        limpiarFormulario();
    }


    function cargarProductoParaEditar(
        producto
    ) {

        setFormulario({

            id:
                producto.id,

            nombre:
                producto.nombre,

            categoria:
                producto.categoria,

            precio:
                producto.precio,

            stock:
                producto.stock === undefined
                    ? 10
                    : producto.stock,

            imagen:
                producto.imagen,

            descripcion:
                producto.descripcion,

            oferta:
                producto.oferta || false,

            precioOferta:
                producto.precioOferta || ""
        });


        setEditando(true);

        setError("");
    }


    function actualizarProducto(
        evento
    ) {

        evento.preventDefault();

        setError("");


        if (!validarFormulario()) {
            return;
        }


        const productosActualizados =
            productos.map(
                function(producto) {

                    if (
                        producto.id ===
                        formulario.id
                    ) {

                        return {
                            ...producto,

                            nombre:
                                formulario.nombre.trim(),

                            categoria:
                                formulario.categoria.trim(),

                            precio:
                                Number(
                                    formulario.precio
                                ),

                            stock:
                                Number(
                                    formulario.stock
                                ),

                            imagen:
                                formulario.imagen.trim() !== ""
                                    ? formulario.imagen.trim()
                                    : "/img/mouse-logitech.jpg",

                            descripcion:
                                formulario.descripcion.trim(),

                            oferta:
                                formulario.oferta,

                            precioOferta:
                                formulario.oferta
                                    ? Number(
                                        formulario.precioOferta
                                    )
                                    : null
                        };
                    }


                    return producto;
                }
            );


        guardarProductos(
            productosActualizados
        );


        limpiarFormulario();
    }


    function eliminarProducto(id) {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este producto?"
            );


        if (!confirmar) {
            return;
        }


        const productosFiltrados =
            productos.filter(
                function(producto) {

                    return (
                        producto.id !== id
                    );
                }
            );


        guardarProductos(
            productosFiltrados
        );
    }


    return (

        <main className="container py-5">

            <h1 className="text-center mb-4">
                Administración de productos
            </h1>


            <div className="card shadow-sm mb-5">

                <div className="card-body">

                    <h2 className="h4 mb-4">

                        {editando
                            ? "Editar producto"
                            : "Agregar producto"}

                    </h2>


                    <form
                        onSubmit={
                            editando
                                ? actualizarProducto
                                : agregarProducto
                        }
                    >

                        <div className="row">


                            {/* NOMBRE */}

                            <div className="col-12 col-md-6 mb-3">

                                <label className="form-label">
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    value={
                                        formulario.nombre
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                />

                            </div>


                            {/* CATEGORÍA */}

                            <div className="col-12 col-md-6 mb-3">

                                <label className="form-label">
                                    Categoría
                                </label>

                                <select
                                    name="categoria"
                                    className="form-select"
                                    value={
                                        formulario.categoria
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                >

                                    <option value="">
                                        Seleccione una categoría
                                    </option>


                                    {categorias.map(
                                        function(categoria) {

                                            return (

                                                <option
                                                    key={
                                                        categoria
                                                    }
                                                    value={
                                                        categoria
                                                    }
                                                >
                                                    {categoria}
                                                </option>

                                            );
                                        }
                                    )}

                                </select>

                            </div>


                            {/* PRECIO */}

                            <div className="col-12 col-md-6 mb-3">

                                <label className="form-label">
                                    Precio normal
                                </label>

                                <input
                                    type="number"
                                    name="precio"
                                    min="1"
                                    className="form-control"
                                    value={
                                        formulario.precio
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                />

                            </div>


                            {/* STOCK */}

                            <div className="col-12 col-md-6 mb-3">

                                <label className="form-label">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    min="0"
                                    step="1"
                                    className="form-control"
                                    value={
                                        formulario.stock
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                />

                                <div className="form-text">
                                    Puede ingresar 0 para marcar el producto como agotado.
                                </div>

                            </div>


                            {/* IMAGEN */}

                            <div className="col-12 col-md-6 mb-3">

                                <label className="form-label">
                                    Ruta de imagen
                                </label>

                                <input
                                    type="text"
                                    name="imagen"
                                    className="form-control"
                                    value={
                                        formulario.imagen
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                    placeholder="/img/producto.jpg"
                                />

                            </div>


                            {/* DESCRIPCIÓN */}

                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Descripción
                                </label>

                                <textarea
                                    name="descripcion"
                                    className="form-control"
                                    rows="3"
                                    value={
                                        formulario.descripcion
                                    }
                                    onChange={
                                        manejarCambio
                                    }
                                />

                            </div>


                            {/* OFERTA */}

                            <div className="col-12 mb-3">

                                <div className="form-check">

                                    <input
                                        type="checkbox"
                                        id="oferta"
                                        name="oferta"
                                        className="form-check-input"
                                        checked={
                                            formulario.oferta
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                    <label
                                        htmlFor="oferta"
                                        className="form-check-label"
                                    >
                                        Producto en oferta
                                    </label>

                                </div>

                            </div>


                            {/* PRECIO OFERTA */}

                            {formulario.oferta && (

                                <div className="col-12 col-md-6 mb-3">

                                    <label className="form-label">
                                        Precio de oferta
                                    </label>

                                    <input
                                        type="number"
                                        name="precioOferta"
                                        min="1"
                                        className="form-control"
                                        value={
                                            formulario.precioOferta
                                        }
                                        onChange={
                                            manejarCambio
                                        }
                                    />

                                </div>

                            )}

                        </div>


                        {error && (

                            <div className="alert alert-danger">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className={
                                editando
                                    ? "btn btn-warning me-2"
                                    : "btn btn-primary me-2"
                            }
                        >

                            {editando
                                ? "Guardar cambios"
                                : "Agregar producto"}

                        </button>


                        {editando && (

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={
                                    limpiarFormulario
                                }
                            >
                                Cancelar
                            </button>

                        )}

                    </form>

                </div>

            </div>


            <h2 className="mb-4">
                Productos registrados
            </h2>


            <div className="table-responsive">

                <table className="table table-striped table-bordered align-middle">

                    <thead className="table-dark">

                        <tr>

                            <th>
                                Producto
                            </th>

                            <th>
                                Categoría
                            </th>

                            <th>
                                Precio
                            </th>

                            <th>
                                Stock
                            </th>

                            <th>
                                Oferta
                            </th>

                            <th>
                                Acciones
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {productos.map(
                            function(producto) {

                                return (

                                    <tr key={producto.id}>

                                        <td>
                                            {producto.nombre}
                                        </td>

                                        <td>
                                            {producto.categoria}
                                        </td>

                                        <td>
                                            $
                                            {producto.precio.toLocaleString(
                                                "es-CL"
                                            )}
                                        </td>


                                        <td>

                                            {producto.stock > 0 ? (

                                                <span className="badge bg-success">
                                                    {producto.stock} disponibles
                                                </span>

                                            ) : (

                                                <span className="badge bg-danger">
                                                    Sin stock
                                                </span>

                                            )}

                                        </td>


                                        <td>

                                            {producto.oferta ? (

                                                <span className="badge bg-success">

                                                    $
                                                    {producto.precioOferta.toLocaleString(
                                                        "es-CL"
                                                    )}

                                                </span>

                                            ) : (

                                                <span className="badge bg-secondary">
                                                    Sin oferta
                                                </span>

                                            )}

                                        </td>


                                        <td>

                                            <button
                                                type="button"
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={function() {

                                                    cargarProductoParaEditar(
                                                        producto
                                                    );

                                                }}
                                            >
                                                Editar
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={function() {

                                                    eliminarProducto(
                                                        producto.id
                                                    );

                                                }}
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                );
                            }
                        )}

                    </tbody>

                </table>

            </div>

        </main>
    );
}


export default AdminProductos;