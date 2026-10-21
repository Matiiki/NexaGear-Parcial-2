import React, { useState } from "react";

import { obtenerProductos } from "../services/productosService.js";

function AdminCategorias() {

    const productos = obtenerProductos();

    const categoriasIniciales = [
        ...new Set(
            productos.map(function(producto) {
                return producto.categoria;
            })
        )
    ];


    const [categorias, setCategorias] = useState(function() {

        const categoriasGuardadas =
            localStorage.getItem("categoriasAdmin");

        return categoriasGuardadas
            ? JSON.parse(categoriasGuardadas)
            : categoriasIniciales;
    });


    const [nuevaCategoria, setNuevaCategoria] = useState("");

    const [error, setError] = useState("");


    function guardarCategorias(nuevasCategorias) {

        setCategorias(nuevasCategorias);

        localStorage.setItem(
            "categoriasAdmin",
            JSON.stringify(nuevasCategorias)
        );
    }


    function agregarCategoria(evento) {

        evento.preventDefault();

        setError("");

        const categoriaLimpia =
            nuevaCategoria.trim();


        if (categoriaLimpia === "") {

            setError(
                "Debe ingresar un nombre de categoría."
            );

            return;
        }


        const categoriaExiste =
            categorias.some(function(categoria) {

                return (
                    categoria.toLowerCase() ===
                    categoriaLimpia.toLowerCase()
                );
            });


        if (categoriaExiste) {

            setError(
                "La categoría ya existe."
            );

            return;
        }


        const nuevasCategorias = [
            ...categorias,
            categoriaLimpia
        ];


        guardarCategorias(nuevasCategorias);

        setNuevaCategoria("");
    }


    function eliminarCategoria(categoriaEliminar) {

        const productosRelacionados =
            productos.filter(function(producto) {

                return (
                    producto.categoria ===
                    categoriaEliminar
                );
            });


        if (productosRelacionados.length > 0) {

            alert(
                "No puedes eliminar esta categoría porque tiene productos asociados."
            );

            return;
        }


        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar esta categoría?"
            );


        if (!confirmar) {
            return;
        }


        const categoriasActualizadas =
            categorias.filter(function(categoria) {

                return categoria !== categoriaEliminar;
            });


        guardarCategorias(
            categoriasActualizadas
        );
    }


    return (
        <main className="container py-5">

            <h1 className="text-center mb-4">
                Administración de categorías
            </h1>


            <div className="row justify-content-center">

                <div className="col-12 col-lg-8">


                    <div className="card shadow-sm mb-5">

                        <div className="card-body">

                            <h2 className="h4 mb-4">
                                Agregar categoría
                            </h2>


                            <form onSubmit={agregarCategoria}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Nombre de categoría
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nuevaCategoria}
                                        onChange={function(evento) {
                                            setNuevaCategoria(
                                                evento.target.value
                                            );
                                        }}
                                        placeholder="Ej: Monitores"
                                    />

                                </div>


                                {error && (

                                    <div className="alert alert-danger">
                                        {error}
                                    </div>

                                )}


                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Agregar categoría
                                </button>

                            </form>

                        </div>

                    </div>


                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h2 className="h4 mb-4">
                                Categorías registradas
                            </h2>


                            {categorias.length === 0 ? (

                                <div className="alert alert-info">
                                    No hay categorías registradas.
                                </div>

                            ) : (

                                <div className="list-group">

                                    {categorias.map(function(categoria) {

                                        return (
                                            <div
                                                key={categoria}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >

                                                <span>
                                                    {categoria}
                                                </span>


                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-sm"
                                                    onClick={function() {

                                                        eliminarCategoria(
                                                            categoria
                                                        );

                                                    }}
                                                >
                                                    Eliminar
                                                </button>

                                            </div>
                                        );

                                    })}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default AdminCategorias;