import React from "react";
import { Link } from "react-router-dom";

function CompraExitosa() {

    return (
        <main className="container py-5 text-center">

            <div className="alert alert-success">

                <h1>
                    Compra realizada correctamente
                </h1>

                <p>
                    Tu pedido fue procesado exitosamente.
                </p>

            </div>


            <Link
                to="/productos"
                className="btn btn-primary"
            >
                Volver a productos
            </Link>

        </main>
    );
}

export default CompraExitosa;