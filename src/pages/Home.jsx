import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <main>
            <section className="bg-dark text-light text-center py-5">
                <div className="container py-5">

                    <h1 className="display-4 fw-bold">
                        Lleva tu setup al siguiente nivel
                    </h1>

                    <p className="lead">
                        Encuentra periféricos y accesorios para mejorar
                        tu experiencia de juego.
                    </p>

                    <Link
                        to="/productos"
                        className="btn btn-primary btn-lg mt-3"
                    >
                        Ver productos
                    </Link>

                </div>
            </section>
        </main>
    );
}

export default Home;