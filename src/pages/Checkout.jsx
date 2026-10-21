import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Checkout({ carrito }) {

    const history = useHistory();

    const [datos, setDatos] = useState({
        nombre: "",
        direccion: "",
        comuna: "",
        telefono: "",
        entrega: ""
    });

    const [error, setError] = useState("");


    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setDatos({
            ...datos,
            [name]: value
        });
    }


    function finalizarCompra(evento) {

        evento.preventDefault();

        if (
            datos.nombre.trim() === "" ||
            datos.direccion.trim() === "" ||
            datos.comuna.trim() === "" ||
            datos.telefono.trim() === "" ||
            datos.entrega === ""
        ) {

            setError("Debe completar todos los datos de envío.");
            return;
        }


        const pagoExitoso = true;

        if (pagoExitoso) {
            history.push("/compra-exitosa");
        } else {
            history.push("/pago-error");
        }
    }


    if (carrito.length === 0) {

        return (
            <main className="container py-5 text-center">

                <h1>
                    No hay productos en el carrito
                </h1>

            </main>
        );
    }


    return (
        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-12 col-lg-7">

                    <h1 className="mb-4">
                        Checkout
                    </h1>


                    <form onSubmit={finalizarCompra}>

                        <div className="mb-3">

                            <label className="form-label">
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                value={datos.nombre}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Dirección
                            </label>

                            <input
                                type="text"
                                name="direccion"
                                className="form-control"
                                value={datos.direccion}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Comuna
                            </label>

                            <input
                                type="text"
                                name="comuna"
                                className="form-control"
                                value={datos.comuna}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Teléfono
                            </label>

                            <input
                                type="text"
                                name="telefono"
                                className="form-control"
                                value={datos.telefono}
                                onChange={manejarCambio}
                            />

                        </div>


                        <div className="mb-3">

                            <label className="form-label">
                                Tipo de entrega
                            </label>

                            <select
                                name="entrega"
                                className="form-select"
                                value={datos.entrega}
                                onChange={manejarCambio}
                            >

                                <option value="">
                                    Seleccione una opción
                                </option>

                                <option value="domicilio">
                                    Envío a domicilio
                                </option>

                                <option value="retiro">
                                    Retiro en tienda
                                </option>

                            </select>

                        </div>


                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="btn btn-success w-100"
                        >
                            Finalizar compra
                        </button>

                    </form>

                </div>

            </div>

        </main>
    );
}

export default Checkout;