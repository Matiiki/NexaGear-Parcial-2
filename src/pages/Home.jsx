import React from "react";
import { Link } from "react-router-dom";

import {
    obtenerProductos
} from "../services/productosService.js";


function Home() {

    const productos =
        obtenerProductos();

    const productosDestacados =
        productos.slice(0, 3);


    return (
        <main>

            {/* HERO PRINCIPAL */}

            <section className="bg-dark text-light py-5">

                <div className="container">

                    <div className="row align-items-center min-vh-50">

                        <div className="col-12 col-lg-7 py-5">

                            <span className="badge bg-primary mb-3 px-3 py-2">
                                NexaGear
                            </span>

                            <h1 className="display-4 fw-bold mb-3">
                                Lleva tu setup al siguiente nivel
                            </h1>

                            <p className="lead text-light mb-4">
                                Encuentra periféricos, accesorios
                                y tecnología para mejorar tu
                                experiencia de juego y trabajo.
                            </p>

                            <div className="d-flex flex-wrap gap-2">

                                <Link
                                    to="/productos"
                                    className="btn btn-primary btn-lg"
                                >
                                    Ver productos
                                </Link>

                                <Link
                                    to="/ofertas"
                                    className="btn btn-outline-light btn-lg"
                                >
                                    Ver ofertas
                                </Link>

                            </div>

                        </div>


                        <div className="col-12 col-lg-5 text-center py-4">

                            <div className="bg-light text-dark rounded-4 shadow p-5">

                                <div
                                    style={{
                                        fontSize: "90px"
                                    }}
                                >
                                    🎮
                                </div>

                                <h2 className="fw-bold mt-3">
                                    Tu setup comienza aquí
                                </h2>

                                <p className="text-muted mb-0">
                                    Productos seleccionados para
                                    gamers y amantes de la tecnología.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CATEGORÍAS */}

            <section className="container py-5">

                <div className="text-center mb-5">

                    <h2 className="fw-bold">
                        Explora nuestras categorías
                    </h2>

                    <p className="text-muted">
                        Encuentra rápidamente lo que necesitas
                        para completar tu setup.
                    </p>

                </div>


                <div className="row g-4">

                    <div className="col-12 col-md-6 col-lg-3">

                        <Link
                            to="/categorias"
                            className="text-decoration-none"
                        >

                            <div className="card h-100 shadow-sm border-0 text-center">

                                <div className="card-body p-4">

                                    <div
                                        className="mb-3"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    >
                                        🖱️
                                    </div>

                                    <h3 className="h5 text-dark">
                                        Mouse
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Precisión y rendimiento
                                        para cada movimiento.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>


                    <div className="col-12 col-md-6 col-lg-3">

                        <Link
                            to="/categorias"
                            className="text-decoration-none"
                        >

                            <div className="card h-100 shadow-sm border-0 text-center">

                                <div className="card-body p-4">

                                    <div
                                        className="mb-3"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    >
                                        ⌨️
                                    </div>

                                    <h3 className="h5 text-dark">
                                        Teclados
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Comodidad y velocidad
                                        para jugar o trabajar.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>


                    <div className="col-12 col-md-6 col-lg-3">

                        <Link
                            to="/categorias"
                            className="text-decoration-none"
                        >

                            <div className="card h-100 shadow-sm border-0 text-center">

                                <div className="card-body p-4">

                                    <div
                                        className="mb-3"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    >
                                        🎧
                                    </div>

                                    <h3 className="h5 text-dark">
                                        Audio
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Escucha cada detalle
                                        con mayor claridad.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>


                    <div className="col-12 col-md-6 col-lg-3">

                        <Link
                            to="/categorias"
                            className="text-decoration-none"
                        >

                            <div className="card h-100 shadow-sm border-0 text-center">

                                <div className="card-body p-4">

                                    <div
                                        className="mb-3"
                                        style={{
                                            fontSize: "50px"
                                        }}
                                    >
                                        🎮
                                    </div>

                                    <h3 className="h5 text-dark">
                                        Accesorios
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Todo lo necesario para
                                        complementar tu espacio.
                                    </p>

                                </div>

                            </div>

                        </Link>

                    </div>

                </div>

            </section>


            {/* PRODUCTOS DESTACADOS */}

            <section className="bg-light py-5">

                <div className="container">

                    <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">
                                Productos destacados
                            </h2>

                            <p className="text-muted mb-0">
                                Algunos de nuestros productos disponibles.
                            </p>

                        </div>


                        <Link
                            to="/productos"
                            className="btn btn-outline-primary"
                        >
                            Ver todos
                        </Link>

                    </div>


                    <div className="row g-4">

                        {productosDestacados.map(function(producto) {

                            const precioFinal =
                                producto.oferta &&
                                producto.precioOferta
                                    ? producto.precioOferta
                                    : producto.precio;


                            return (

                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={producto.id}
                                >

                                    <div className="card h-100 border-0 shadow-sm">

                                        <img
                                            src={producto.imagen}
                                            className="card-img-top p-4"
                                            alt={producto.nombre}
                                            style={{
                                                height: "230px",
                                                objectFit: "contain"
                                            }}
                                        />


                                        <div className="card-body d-flex flex-column">

                                            <span className="text-muted small">
                                                {producto.categoria}
                                            </span>

                                            <h3 className="h5 mt-1">
                                                {producto.nombre}
                                            </h3>


                                            {producto.oferta && (

                                                <span className="badge bg-danger align-self-start mb-2">
                                                    Oferta
                                                </span>

                                            )}


                                            {producto.oferta &&
                                                producto.precioOferta ? (

                                                <div className="mt-auto">

                                                    <p className="text-muted text-decoration-line-through mb-0">
                                                        $
                                                        {producto.precio.toLocaleString(
                                                            "es-CL"
                                                        )}
                                                    </p>

                                                    <p className="fs-4 fw-bold text-danger">
                                                        $
                                                        {precioFinal.toLocaleString(
                                                            "es-CL"
                                                        )}
                                                    </p>

                                                </div>

                                            ) : (

                                                <p className="fs-4 fw-bold mt-auto">
                                                    $
                                                    {precioFinal.toLocaleString(
                                                        "es-CL"
                                                    )}
                                                </p>

                                            )}


                                            <Link
                                                to={
                                                    "/producto/" +
                                                    producto.id
                                                }
                                                className="btn btn-primary"
                                            >
                                                Ver producto
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                </div>

            </section>


            {/* BENEFICIOS */}

            <section className="container py-5">

                <div className="row g-4 text-center">

                    <div className="col-12 col-md-4">

                        <div className="p-4">

                            <div
                                className="mb-3"
                                style={{
                                    fontSize: "45px"
                                }}
                            >
                                🚚
                            </div>

                            <h3 className="h5 fw-bold">
                                Envíos
                            </h3>

                            <p className="text-muted">
                                Selecciona tu método de entrega
                                durante el proceso de compra.
                            </p>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="p-4">

                            <div
                                className="mb-3"
                                style={{
                                    fontSize: "45px"
                                }}
                            >
                                💻
                            </div>

                            <h3 className="h5 fw-bold">
                                Tecnología
                            </h3>

                            <p className="text-muted">
                                Productos para gaming,
                                estudio y trabajo.
                            </p>

                        </div>

                    </div>


                    <div className="col-12 col-md-4">

                        <div className="p-4">

                            <div
                                className="mb-3"
                                style={{
                                    fontSize: "45px"
                                }}
                            >
                                🛒
                            </div>

                            <h3 className="h5 fw-bold">
                                Compra simple
                            </h3>

                            <p className="text-muted">
                                Agrega productos al carrito
                                y completa tu compra fácilmente.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA FINAL */}

            <section className="bg-primary text-white py-5">

                <div className="container text-center">

                    <h2 className="fw-bold">
                        ¿Listo para mejorar tu setup?
                    </h2>

                    <p className="mb-4">
                        Revisa nuestro catálogo y encuentra
                        tu próximo producto.
                    </p>

                    <Link
                        to="/productos"
                        className="btn btn-light btn-lg"
                    >
                        Explorar productos
                    </Link>

                </div>

            </section>

        </main>
    );
}


export default Home;