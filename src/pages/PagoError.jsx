import React from "react";
import { Link } from "react-router-dom";

function PagoError() {

    return (
        <main className="container py-5 text-center">

            <div className="alert alert-danger">

                <h1>
                    No se pudo realizar el pago
                </h1>

                <p>
                    Intenta nuevamente o selecciona otro método de pago.
                </p>

            </div>


            <Link
                to="/carrito"
                className="btn btn-danger"
            >
                Volver al carrito
            </Link>

        </main>
    );
}

export default PagoError;