import React from "react";
import { Link } from "react-router-dom";

import { obtenerProductos } from "../services/productosService.js";

function AdminReportes() {

    const productos = obtenerProductos();

    const usuariosGuardados =
        localStorage.getItem("usuariosAdmin");

    const usuarios =
        usuariosGuardados
            ? JSON.parse(usuariosGuardados)
            : [];


    const pedidosGuardados =
        localStorage.getItem("pedidosAdmin");

    const pedidos =
        pedidosGuardados
            ? JSON.parse(pedidosGuardados)
            : [];


    const totalProductos =
        productos.length;


    const totalUsuarios =
        usuarios.length;


    const totalPedidos =
        pedidos.length;


    const totalVentas =
        pedidos.reduce(function(acumulado, pedido) {

            return acumulado + pedido.total;

        }, 0);


    const productosEnOferta =
        productos.filter(function(producto) {

            return producto.oferta === true;
        });


    const pedidosPendientes =
        pedidos.filter(function(pedido) {

            return pedido.estado === "Pendiente";
        });


    return (
        <main className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Reportes
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>


            <div className="row">


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Productos
                            </h2>

                            <p className="display-6 fw-bold">
                                {totalProductos}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Usuarios registrados
                            </h2>

                            <p className="display-6 fw-bold">
                                {totalUsuarios}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Pedidos
                            </h2>

                            <p className="display-6 fw-bold">
                                {totalPedidos}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Ventas acumuladas
                            </h2>

                            <p className="display-6 fw-bold">
                                $
                                {totalVentas.toLocaleString(
                                    "es-CL"
                                )}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Productos en oferta
                            </h2>

                            <p className="display-6 fw-bold">
                                {productosEnOferta.length}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="col-12 col-md-6 col-lg-4 mb-4">

                    <div className="card shadow-sm h-100">

                        <div className="card-body text-center">

                            <h2 className="h5">
                                Pedidos pendientes
                            </h2>

                            <p className="display-6 fw-bold">
                                {pedidosPendientes.length}
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            <div className="card shadow-sm mt-3">

                <div className="card-body">

                    <h2 className="h4 mb-4">
                        Resumen de pedidos
                    </h2>


                    {pedidos.length === 0 ? (

                        <div className="alert alert-info">
                            No hay pedidos registrados.
                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-striped table-bordered">

                                <thead className="table-dark">

                                    <tr>
                                        <th>
                                            Cliente
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                        <th>
                                            Estado
                                        </th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {pedidos.map(function(pedido) {

                                        return (
                                            <tr key={pedido.id}>

                                                <td>
                                                    {pedido.cliente}
                                                </td>

                                                <td>
                                                    $
                                                    {pedido.total.toLocaleString(
                                                        "es-CL"
                                                    )}
                                                </td>

                                                <td>
                                                    {pedido.estado}
                                                </td>

                                            </tr>
                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </main>
    );
}

export default AdminReportes;