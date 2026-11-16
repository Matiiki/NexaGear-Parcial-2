
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminPedidos() {

    const [pedidos, setPedidos] = useState(function() {

        try {
            const guardados = localStorage.getItem("pedidosAdmin");
            const datos = guardados ? JSON.parse(guardados) : [];

            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            return [];
        }
    });

    const estados = [
        "Pendiente",
        "Preparando",
        "Enviado",
        "Entregado"
    ];

    function guardarPedidos(lista) {

        setPedidos(lista);

        localStorage.setItem(
            "pedidosAdmin",
            JSON.stringify(lista)
        );
    }

    function actualizarUltimoPedido(id, cambios) {

        const guardado = localStorage.getItem("ultimoPedido");

        if (!guardado) {
            return;
        }

        try {
            const ultimo = JSON.parse(guardado);

            if (String(ultimo.id) === String(id)) {

                if (cambios === null) {
                    localStorage.removeItem("ultimoPedido");
                } else {
                    localStorage.setItem(
                        "ultimoPedido",
                        JSON.stringify({
                            ...ultimo,
                            ...cambios
                        })
                    );
                }
            }
        } catch (error) {
            // No modificar otros pedidos si el resumen es inválido.
        }
    }

    function cambiarEstado(id, nuevoEstado) {

        if (!estados.includes(nuevoEstado)) {
            return;
        }

        const actualizados = pedidos.map(function(pedido) {

            if (String(pedido.id) === String(id)) {
                return {
                    ...pedido,
                    estado: nuevoEstado
                };
            }

            return pedido;
        });

        guardarPedidos(actualizados);
        actualizarUltimoPedido(id, { estado: nuevoEstado });
    }

    function eliminarPedido(id) {

        const confirmar = window.confirm(
            "¿Estás seguro de eliminar el pedido #" +
            id +
            "? Esta acción no se puede deshacer."
        );

        if (!confirmar) {
            return;
        }

        const actualizados = pedidos.filter(function(pedido) {
            return String(pedido.id) !== String(id);
        });

        guardarPedidos(actualizados);
        actualizarUltimoPedido(id, null);
    }

    function formatoPrecio(valor) {
        return "$" + Number(valor || 0).toLocaleString("es-CL");
    }

    return (
        <main className="container py-5">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                <h1 className="mb-0">
                    Administración de pedidos
                </h1>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Volver al panel
                </Link>

            </div>

            <p className="text-muted">
                Consulta las órdenes, actualiza su estado
                o elimina los registros de prueba.
            </p>

            {pedidos.length === 0 ? (

                <div className="alert alert-info">
                    No hay pedidos registrados.
                </div>

            ) : (

                <div className="table-responsive">

                    <table className="table table-striped table-bordered align-middle">

                        <thead className="table-dark">
                            <tr>
                                <th>N.º de pedido</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Entrega</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {pedidos.map(function(pedido) {

                                return (
                                    <tr key={pedido.id}>

                                        <td>#{pedido.id}</td>

                                        <td>{pedido.cliente}</td>

                                        <td>{pedido.fecha}</td>

                                        <td>
                                            {pedido.entrega === "domicilio"
                                                ? "Envío a domicilio"
                                                : pedido.entrega === "retiro"
                                                    ? "Retiro en tienda"
                                                    : pedido.entrega}
                                        </td>

                                        <td>
                                            {formatoPrecio(pedido.total)}
                                        </td>

                                        <td>
                                            <select
                                                className="form-select"
                                                aria-label={
                                                    "Estado del pedido " + pedido.id
                                                }
                                                value={
                                                    pedido.estado || "Pendiente"
                                                }
                                                onChange={function(evento) {
                                                    cambiarEstado(
                                                        pedido.id,
                                                        evento.target.value
                                                    );
                                                }}
                                            >
                                                {estados.map(function(estado) {
                                                    return (
                                                        <option
                                                            key={estado}
                                                            value={estado}
                                                        >
                                                            {estado}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={function() {
                                                    eliminarPedido(pedido.id);
                                                }}
                                            >
                                                Eliminar
                                            </button>
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
