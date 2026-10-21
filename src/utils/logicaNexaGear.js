export function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}


export function calcularTotal(carrito) {

    return carrito.reduce(function(acumulado, producto) {

        return acumulado +
            producto.precio * producto.cantidad;

    }, 0);
}


export function aumentarCantidad(carrito, id) {

    return carrito.map(function(producto) {

        if (producto.id === id) {

            return {
                ...producto,
                cantidad: producto.cantidad + 1
            };
        }

        return producto;
    });
}


export function eliminarProducto(carrito, id) {

    return carrito.filter(function(producto) {
        return producto.id !== id;
    });
}


export function obtenerPrecioFinal(producto) {

    if (
        producto.oferta === true &&
        producto.precioOferta
    ) {

        return producto.precioOferta;
    }

    return producto.precio;
}


export function filtrarOfertas(productos) {

    return productos.filter(function(producto) {
        return producto.oferta === true;
    });
}


export function correoEsValido(correo) {

    const valorCorreo =
        correo.trim().toLowerCase();

    const expresionCorreo =
        /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

    return (
        expresionCorreo.test(valorCorreo) &&
        !valorCorreo.includes("..")
    );
}


export function contrasenasCoinciden(
    contrasena,
    confirmarContrasena
) {

    return contrasena === confirmarContrasena;
}