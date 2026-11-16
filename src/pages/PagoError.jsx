
import React from "react";
import { Link } from "react-router-dom";

function PagoError() {

    const pagoGuardado =
        sessionStorage.getItem("ultimoPagoFallido");

    const pago = pagoGuardado
        ? JSON.parse(pagoGuardado)
        : null;

    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow-sm border-danger">

                        <div className="card-body text-center p-4">

                            <div
                                className="text-danger mb-3"
                                style={{ fontSize: "65px" }}
                            >
                                ✕
                            </div>

                            <h1 className="fw-bold text-danger">
                                No se pudo realizar el pago
                            </h1>

                            <p className="text-muted mt-3">
                                Tu compra no fue procesada.
                                Puedes volver al Checkout
                                e intentar nuevamente.
                            </p>

                            {pago && (
                                <div className="alert alert-light border text-start">

                                    <p>
                                        <strong>Fecha:</strong>{" "}
                                        {pago.fecha}
                                    </p>

                                    <p>
                                        <strong>Motivo:</strong>{" "}
                                        {pago.motivo}
                                    </p>

                                    <p className="mb-0">
                                        <strong>Total:</strong>{" "}
                                        ${pago.total.toLocaleString("es-CL")}
                                    </p>

                                </div>
                            )}

                            <div className="alert alert-info text-start">
                                No se generó ningún pedido,
                                no se descontó stock y tus
                                productos siguen en el carrito.
                            </div>

                            <Link
                                to="/checkout"
                                className="btn btn-primary w-100 mb-2"
                            >
                                Reintentar pago
                            </Link>

                            <Link
                                to="/carrito"
                                className="btn btn-outline-secondary w-100"
                            >
                                Volver al carrito
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default PagoError;
