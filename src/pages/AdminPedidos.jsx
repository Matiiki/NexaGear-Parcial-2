import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPedidos() {

    const [pedidos, setPedidos] = useState(function() {

        const pedidosGuardados =
            localStorage.getItem("pedidosAdmin");

        return pedidosGuardados
            ? JSON.parse(pedidosGuardados)
            : [];
    });


    function cambiarEstado(id, nuevoEstado) {

        const pedidosActualizados =
            pedidos.map(function(pedido) {

                if (pedido.id === id) {

                    return {
                        ...pedido,
                        estado: nuevoEstado
                    };
                }

                return pedido;
            });


        setPedidos(pedidosActualizados);


        localStorage.setItem(
            "pedidosAdmin",
            JSON.stringify(pedidosActualizados)
        );
    }


    return (
        <main className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1>
                    Administración de pedidos
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>


            {pedidos.length === 0 ? (

                <div className="alert alert-info text-center">
                    No hay pedidos registrados.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-bordered align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Entrega</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>

                        </thead>


                        <tbody>

                            {pedidos.map(function(pedido) {

                                return (
                                    <tr key={pedido.id}>

                                        <td>
                                            {pedido.id}
                                        </td>

                                        <td>
                                            {pedido.cliente}
                                        </td>

                                        <td>
                                            {pedido.fecha}
                                        </td>

                                        <td>
                                            {pedido.entrega}
                                        </td>

                                        <td>
                                            $
                                            {pedido.total.toLocaleString(
                                                "es-CL"
                                            )}
                                        </td>

                                        <td>

                                            <select
                                                className="form-select"
                                                value={pedido.estado}
                                                onChange={function(evento) {

                                                    cambiarEstado(
                                                        pedido.id,
                                                        evento.target.value
                                                    );

                                                }}
                                            >

                                                <option value="Pendiente">
                                                    Pendiente
                                                </option>

                                                <option value="Preparando">
                                                    Preparando
                                                </option>

                                                <option value="Enviado">
                                                    Enviado
                                                </option>

                                                <option value="Entregado">
                                                    Entregado
                                                </option>

                                            </select>

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

export default AdminPedidos;