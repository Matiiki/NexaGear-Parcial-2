
import React from "react";
import { Link } from "react-router-dom";

function CompraExitosa() {

    const pedidoGuardado =
        localStorage.getItem("ultimoPedido");

    const pedido = pedidoGuardado
        ? JSON.parse(pedidoGuardado)
        : null;

    function formatoPrecio(valor) {
        return "$" + Number(valor).toLocaleString("es-CL");
    }

    if (!pedido) {
        return (
            <main className="container py-5 text-center">

                <h1>No hay una compra registrada</h1>

                <p className="text-muted">
                    Realiza una compra para visualizar
                    el resumen de tu pedido.
                </p>

                <Link
                    to="/productos"
                    className="btn btn-primary"
                >
                    Ir a productos
                </Link>

            </main>
        );
    }

    const neto = Math.round(pedido.total / 1.19);
    const iva = pedido.total - neto;

    return (
        <main className="container py-5">

            <div className="alert alert-success text-center p-4">

                <h1 className="fw-bold">
                    ✓ ¡Compra exitosa!
                </h1>

                <p className="mb-0">
                    Tu pedido fue registrado correctamente.
                </p>

            </div>

            <div className="row justify-content-center">

                <div className="col-12 col-lg-8">

                    <div className="card shadow-sm mb-4">

                        <div className="card-header bg-dark text-white">
                            <h2 className="h5 mb-0">
                                Información del pedido
                            </h2>
                        </div>

                        <div className="card-body">

                            <p>
                                <strong>Número de pedido:</strong>{" "}
                                #{pedido.id}
                            </p>

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
                                <strong>Tipo de entrega:</strong>{" "}
                                {pedido.entrega === "domicilio"
                                    ? "Envío a domicilio"
                                    : "Retiro en tienda"}
                            </p>

                            {pedido.entrega === "domicilio" && (
                                <p>
                                    <strong>Dirección:</strong>{" "}
                                    {pedido.direccion}, {pedido.comuna}
                                </p>
                            )}

                            <p>
                                <strong>Estado:</strong>{" "}
                                <span className="badge bg-warning text-dark">
                                    {pedido.estado}
                                </span>
                            </p>

                        </div>
                    </div>

                    <div className="card shadow-sm">

                        <div className="card-header bg-dark text-white">
                            <h2 className="h5 mb-0">
                                Detalle de productos
                            </h2>
                        </div>

                        <div className="card-body">

                            {pedido.productos.map(function(producto) {

                                return (
                                    <div
                                        key={producto.id}
                                        className="d-flex justify-content-between border-bottom py-3"
                                    >

                                        <div>
                                            <strong>
                                                {producto.nombre}
                                            </strong>

                                            <p className="text-muted mb-0">
                                                Cantidad: {producto.cantidad}
                                            </p>
                                        </div>

                                        <strong>
                                            {formatoPrecio(
                                                producto.precio *
                                                producto.cantidad
                                            )}
                                        </strong>

                                    </div>
                                );
                            })}

                            <div className="d-flex justify-content-between mt-4">
                                <span>Neto</span>
                                <span>{formatoPrecio(neto)}</span>
                            </div>

                            <div className="d-flex justify-content-between mt-2">
                                <span>IVA incluido (19%)</span>
                                <span>{formatoPrecio(iva)}</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">
                                <strong>Total pagado</strong>

                                <strong className="fs-4 text-success">
                                    {formatoPrecio(pedido.total)}
                                </strong>
                            </div>

                        </div>

                    </div>

                    <div className="text-center mt-4">

                        <Link
                            to="/productos"
                            className="btn btn-primary"
                        >
                            Seguir comprando
                        </Link>

                    </div>

                </div>
            </div>

        </main>
    );
}

export default CompraExitosa;
