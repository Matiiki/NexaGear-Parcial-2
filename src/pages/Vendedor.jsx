
import React, { useState } from "react";
import {
    Link,
    useParams,
    useHistory
} from "react-router-dom";

import {
    obtenerProductos
} from "../services/productosService.js";


function Vendedor({ seccion }) {

    const { id } = useParams();
    const history = useHistory();

    const productos = obtenerProductos();

    const [pedidos, setPedidos] = useState(function() {

        const guardados =
            localStorage.getItem("pedidosAdmin");

        if (!guardados) {
            return [];
        }

        try {
            const datos = JSON.parse(guardados);
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    });


    const estados = [
        "Pendiente",
        "Preparando",
        "Enviado",
        "Entregado"
    ];


    function formatoPrecio(valor) {

        return "$" + Number(valor || 0)
            .toLocaleString("es-CL");
    }


    function guardarPedidos(nuevosPedidos) {

        setPedidos(nuevosPedidos);

        localStorage.setItem(
            "pedidosAdmin",
            JSON.stringify(nuevosPedidos)
        );
    }


    // CAMBIAR ESTADO DE UNA ORDEN

    function cambiarEstado(idPedido, nuevoEstado) {

        if (!estados.includes(nuevoEstado)) {
            return;
        }

        const actualizados = pedidos.map(function(pedido) {

            if (String(pedido.id) === String(idPedido)) {

                return {
                    ...pedido,
                    estado: nuevoEstado
                };
            }

            return pedido;
        });

        guardarPedidos(actualizados);

        // Mantener sincronizado el resumen de última compra
        const ultimoGuardado =
            localStorage.getItem("ultimoPedido");

        if (ultimoGuardado) {

            try {
                const ultimo = JSON.parse(ultimoGuardado);

                if (String(ultimo.id) === String(idPedido)) {

                    localStorage.setItem(
                        "ultimoPedido",
                        JSON.stringify({
                            ...ultimo,
                            estado: nuevoEstado
                        })
                    );
                }

            } catch (error) {
                // Ignorar un resumen antiguo inválido
            }
        }
    }


    // ELIMINAR ORDEN

    function eliminarPedido(idPedido) {

        const confirmar = window.confirm(
            "¿Estás seguro de eliminar la orden #" +
            idPedido +
            "? Esta acción no se puede deshacer."
        );

        if (!confirmar) {
            return;
        }

        const actualizados = pedidos.filter(function(pedido) {

            return String(pedido.id) !== String(idPedido);
        });

        guardarPedidos(actualizados);

        // Eliminar el resumen si corresponde a esa orden
        const ultimoGuardado =
            localStorage.getItem("ultimoPedido");

        if (ultimoGuardado) {

            try {
                const ultimo = JSON.parse(ultimoGuardado);

                if (String(ultimo.id) === String(idPedido)) {
                    localStorage.removeItem("ultimoPedido");
                }

            } catch (error) {
                // Ignorar un resumen antiguo inválido
            }
        }

        history.push("/vendedor/pedidos");
    }


    // ========================================
    // PRODUCTOS: SOLO CONSULTA
    // ========================================

    if (seccion === "productos") {

        if (id) {

            const producto = productos.find(function(item) {
                return String(item.id) === String(id);
            });

            if (!producto) {

                return (
                    <main className="container py-5">
                        <h1>Producto no encontrado</h1>

                        <Link
                            to="/vendedor/productos"
                            className="btn btn-secondary mt-3"
                        >
                            Volver
                        </Link>
                    </main>
                );
            }

            return (
                <main className="container py-5">

                    <h1 className="mb-4">
                        Detalle del producto
                    </h1>

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h2>{producto.nombre}</h2>

                            <p>
                                <strong>Categoría:</strong>{" "}
                                {producto.categoria}
                            </p>

                            <p>
                                <strong>Descripción:</strong>{" "}
                                {producto.descripcion}
                            </p>

                            <p>
                                <strong>Precio:</strong>{" "}
                                {formatoPrecio(producto.precio)}
                            </p>

                            <p>
                                <strong>Stock:</strong>{" "}
                                {producto.stock}
                            </p>

                            <Link
                                to="/vendedor/productos"
                                className="btn btn-secondary"
                            >
                                Volver a productos
                            </Link>

                        </div>
                    </div>

                </main>
            );
        }

        return (
            <main className="container py-5">

                <h1 className="mb-3">
                    Productos
                </h1>

                <p className="text-muted">
                    Consulta de productos disponibles.
                </p>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Detalle</th>
                            </tr>

                        </thead>

                        <tbody>

                            {productos.map(function(producto) {

                                return (
                                    <tr key={producto.id}>

                                        <td>{producto.nombre}</td>

                                        <td>{producto.categoria}</td>

                                        <td>
                                            {formatoPrecio(producto.precio)}
                                        </td>

                                        <td>{producto.stock}</td>

                                        <td>
                                            <Link
                                                to={
                                                    "/vendedor/productos/" +
                                                    producto.id
                                                }
                                                className="btn btn-outline-primary btn-sm"
                                            >
                                                Ver detalle
                                            </Link>
                                        </td>

                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>

                </div>

            </main>
        );
    }


    // ========================================
    // ÓRDENES: CONSULTAR, EDITAR Y ELIMINAR
    // ========================================

    if (seccion === "pedidos") {

        // DETALLE DE UNA ORDEN

        if (id) {

            const pedido = pedidos.find(function(item) {
                return String(item.id) === String(id);
            });

            if (!pedido) {

                return (
                    <main className="container py-5">

                        <div className="alert alert-warning">
                            La orden no existe o fue eliminada.
                        </div>

                        <Link
                            to="/vendedor/pedidos"
                            className="btn btn-secondary"
                        >
                            Volver a órdenes
                        </Link>

                    </main>
                );
            }

            const detalle = Array.isArray(pedido.productos)
                ? pedido.productos
                : [];

            return (
                <main className="container py-5">

                    <h1 className="mb-4">
                        Orden #{pedido.id}
                    </h1>

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h2 className="h4 mb-3">
                                Información del pedido
                            </h2>

                            <p>
                                <strong>Cliente:</strong>{" "}
                                {pedido.cliente}
                            </p>

                            <p>
                                <strong>Correo:</strong>{" "}
                                {pedido.correo}
                            </p>

                            <p>
                                <strong>Fecha:</strong>{" "}
                                {pedido.fecha}
                            </p>

                            <p>
                                <strong>Dirección:</strong>{" "}
                                {pedido.direccion}, {pedido.comuna}
                            </p>

                            <div className="mb-4">

                                <label
                                    htmlFor="estadoDetalle"
                                    className="form-label fw-bold"
                                >
                                    Estado de la compra
                                </label>

                                <select
                                    id="estadoDetalle"
                                    className="form-select"
                                    value={pedido.estado || "Pendiente"}
                                    onChange={function(evento) {
                                        cambiarEstado(
                                            pedido.id,
                                            evento.target.value
                                        );
                                    }}
                                >

                                    {estados.map(function(estado) {

                                        return (
                                            <option
                                                key={estado}
                                                value={estado}
                                            >
                                                {estado}
                                            </option>
                                        );
                                    })}

                                </select>

                                <small className="text-muted">
                                    El cambio se guarda automáticamente.
                                </small>

                            </div>


                            <h3 className="h5">
                                Productos de la orden
                            </h3>

                            {detalle.map(function(item, indice) {

                                return (
                                    <div
                                        key={indice}
                                        className="d-flex justify-content-between border-bottom py-2"
                                    >

                                        <span>
                                            {item.nombre} × {item.cantidad}
                                        </span>

                                        <span>
                                            {formatoPrecio(
                                                item.precio * item.cantidad
                                            )}
                                        </span>

                                    </div>
                                );
                            })}

                            <h3 className="h5 text-end mt-4">
                                Total: {formatoPrecio(pedido.total)}
                            </h3>

                            <div className="d-flex flex-wrap gap-2 mt-4">

                                <Link
                                    to="/vendedor/pedidos"
                                    className="btn btn-secondary"
                                >
                                    Volver a órdenes
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={function() {
                                        eliminarPedido(pedido.id);
                                    }}
                                >
                                    Eliminar orden
                                </button>

                            </div>

                        </div>

                    </div>

                </main>
            );
        }


        // LISTADO DE ÓRDENES

        return (
            <main className="container py-5">

                <h1 className="mb-3">
                    Gestión de órdenes
                </h1>

                <p className="text-muted">
                    Consulta, modifica el estado o elimina órdenes.
                </p>

                {pedidos.length === 0 ? (

                    <div className="alert alert-info">
                        No hay órdenes registradas.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-striped align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>Orden</th>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Estado</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {pedidos.map(function(pedido) {

                                    return (
                                        <tr key={pedido.id}>

                                            <td>#{pedido.id}</td>

                                            <td>{pedido.cliente}</td>

                                            <td>{pedido.fecha}</td>

                                            <td>

                                                <select
                                                    className="form-select form-select-sm"
                                                    aria-label={
                                                        "Estado orden " +
                                                        pedido.id
                                                    }
                                                    value={
                                                        pedido.estado ||
                                                        "Pendiente"
                                                    }
                                                    onChange={function(evento) {

                                                        cambiarEstado(
                                                            pedido.id,
                                                            evento.target.value
                                                        );

                                                    }}
                                                >

                                                    {estados.map(function(estado) {

                                                        return (
                                                            <option
                                                                key={estado}
                                                                value={estado}
                                                            >
                                                                {estado}
                                                            </option>
                                                        );
                                                    })}

                                                </select>

                                            </td>

                                            <td>
                                                {formatoPrecio(pedido.total)}
                                            </td>

                                            <td>

                                                <div className="d-flex flex-wrap gap-2">

                                                    <Link
                                                        to={
                                                            "/vendedor/pedidos/" +
                                                            pedido.id
                                                        }
                                                        className="btn btn-primary btn-sm"
                                                    >
                                                        Ver detalle
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={function() {

                                                            eliminarPedido(
                                                                pedido.id
                                                            );

                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>
        );
    }


    return (
        <main className="container py-5">
            <h1>Sección no disponible</h1>
        </main>
    );
}

export default Vendedor;
