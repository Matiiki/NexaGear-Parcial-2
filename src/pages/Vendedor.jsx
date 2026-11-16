
import React from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductos } from "../services/productosService.js";

function Vendedor({ seccion }) {

    const { id } = useParams();

    const productos = obtenerProductos();

    const pedidosGuardados =
        localStorage.getItem("pedidosAdmin");

    const pedidos = pedidosGuardados
        ? JSON.parse(pedidosGuardados)
        : [];

    function precio(valor) {
        return "$" + Number(valor || 0).toLocaleString("es-CL");
    }

    // PRODUCTOS
    if (seccion === "productos") {

        if (id) {

            const producto = productos.find(function(item) {
                return String(item.id) === id;
            });

            if (!producto) {
                return (
                    <main className="container py-5">
                        <h1>Producto no encontrado</h1>
                        <Link to="/vendedor/productos">
                            Volver al listado
                        </Link>
                    </main>
                );
            }

            return (
                <main className="container py-5">

                    <h1>Detalle del producto</h1>

                    <div className="card shadow-sm mt-4">
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
                                {precio(producto.precio)}
                            </p>

                            <p>
                                <strong>Stock:</strong>{" "}
                                {producto.stock}
                            </p>

                            <Link
                                to="/vendedor/productos"
                                className="btn btn-secondary"
                            >
                                Volver
                            </Link>

                        </div>
                    </div>
                </main>
            );
        }

        return (
            <main className="container py-5">

                <h1 className="mb-2">Productos</h1>

                <p className="text-muted">
                    Vista de vendedor — solo consulta.
                </p>

                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

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
                                        <td>{precio(producto.precio)}</td>
                                        <td>{producto.stock}</td>
                                        <td>
                                            <Link
                                                className="btn btn-outline-primary btn-sm"
                                                to={
                                                    "/vendedor/productos/" +
                                                    producto.id
                                                }
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

    // ÓRDENES
    if (id) {

        const pedido = pedidos.find(function(item) {
            return String(item.id) === id;
        });

        if (!pedido) {
            return (
                <main className="container py-5">
                    <h1>Orden no encontrada</h1>
                    <Link to="/vendedor/pedidos">
                        Volver al listado
                    </Link>
                </main>
            );
        }

        const detalle = Array.isArray(pedido.productos)
            ? pedido.productos
            : [];

        return (
            <main className="container py-5">

                <h1>Detalle de orden #{pedido.id}</h1>

                <div className="card shadow-sm mt-4">
                    <div className="card-body">

                        <p>
                            <strong>Cliente:</strong>{" "}
                            {pedido.cliente}
                        </p>

                        <p>
                            <strong>Fecha:</strong>{" "}
                            {pedido.fecha}
                        </p>

                        <p>
                            <strong>Estado:</strong>{" "}
                            {pedido.estado}
                        </p>

                        <p>
                            <strong>Entrega:</strong>{" "}
                            {pedido.entrega}
                        </p>

                        <h2 className="h5 mt-4">
                            Productos de la orden
                        </h2>

                        {detalle.map(function(item) {
                            return (
                                <p key={item.id}>
                                    {item.nombre} × {item.cantidad}
                                    {" — "}
                                    {precio(item.precio * item.cantidad)}
                                </p>
                            );
                        })}

                        <hr />

                        <h3 className="h5">
                            Total: {precio(pedido.total)}
                        </h3>

                        <Link
                            to="/vendedor/pedidos"
                            className="btn btn-secondary mt-3"
                        >
                            Volver
                        </Link>

                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="container py-5">

            <h1 className="mb-2">Órdenes</h1>

            <p className="text-muted">
                Vista de vendedor — solo consulta.
            </p>

            {pedidos.length === 0 ? (
                <div className="alert alert-info">
                    Todavía no hay órdenes registradas.
                </div>
            ) : (
                <div className="table-responsive">

                    <table className="table table-bordered table-striped">

                        <thead className="table-dark">
                            <tr>
                                <th>Número</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Total</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pedidos.map(function(pedido) {
                                return (
                                    <tr key={pedido.id}>
                                        <td>#{pedido.id}</td>
                                        <td>{pedido.cliente}</td>
                                        <td>{pedido.fecha}</td>
                                        <td>{pedido.estado}</td>
                                        <td>{precio(pedido.total)}</td>
                                        <td>
                                            <Link
                                                className="btn btn-outline-primary btn-sm"
                                                to={
                                                    "/vendedor/pedidos/" +
                                                    pedido.id
                                                }
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
            )}

        </main>
    );
}

export default Vendedor;
