import {
    calcularSubtotal,
    calcularTotal,
    aumentarCantidad,
    eliminarProducto,
    obtenerPrecioFinal,
    filtrarOfertas,
    correoEsValido,
    contrasenasCoinciden
} from "../utils/logicaNexaGear.js";


describe("Casos posibles del carrito", function() {

    it("debe mantener el carrito igual al aumentar un id inexistente", function() {

        const carrito = [
            {
                id: "mouse",
                cantidad: 1
            }
        ];

        const carritoActualizado =
            aumentarCantidad(carrito, "teclado");

        expect(carritoActualizado.length).toBe(1);

        expect(
            carritoActualizado[0].id
        ).toBe("mouse");

        expect(
            carritoActualizado[0].cantidad
        ).toBe(1);
    });


    it("no debe modificar el carrito original al aumentar una cantidad", function() {

        const carrito = [
            {
                id: "mouse",
                cantidad: 2
            }
        ];

        const carritoActualizado =
            aumentarCantidad(carrito, "mouse");

        expect(carrito[0].cantidad).toBe(2);

        expect(
            carritoActualizado[0].cantidad
        ).toBe(3);
    });


    it("debe mantener el carrito igual al eliminar un id inexistente", function() {

        const carrito = [
            {
                id: "mouse"
            },
            {
                id: "teclado"
            }
        ];

        const nuevoCarrito =
            eliminarProducto(carrito, "audifonos");

        expect(nuevoCarrito.length).toBe(2);
    });


    it("debe devolver un carrito vacío al eliminar de un carrito vacío", function() {

        const nuevoCarrito =
            eliminarProducto([], "mouse");

        expect(nuevoCarrito.length).toBe(0);
    });


    it("debe calcular un total de 0 cuando el carrito está vacío", function() {

        expect(
            calcularTotal([])
        ).toBe(0);
    });


    it("debe calcular un subtotal de 0 cuando la cantidad es 0", function() {

        expect(
            calcularSubtotal(29990, 0)
        ).toBe(0);
    });

});


describe("Casos posibles de productos y ofertas", function() {

    it("debe usar el precio normal si la oferta no tiene precio de oferta", function() {

        const producto = {
            precio: 29990,
            oferta: true,
            precioOferta: null
        };

        expect(
            obtenerPrecioFinal(producto)
        ).toBe(29990);
    });


    it("debe usar el precio normal si el precio de oferta es 0", function() {

        const producto = {
            precio: 29990,
            oferta: true,
            precioOferta: 0
        };

        expect(
            obtenerPrecioFinal(producto)
        ).toBe(29990);
    });


    it("debe usar el precio normal si el producto no tiene la propiedad oferta", function() {

        const producto = {
            precio: 14990
        };

        expect(
            obtenerPrecioFinal(producto)
        ).toBe(14990);
    });


    it("debe devolver un arreglo vacío al filtrar ofertas de un arreglo vacío", function() {

        expect(
            filtrarOfertas([]).length
        ).toBe(0);
    });


    it("debe devolver un arreglo vacío si ningún producto está en oferta", function() {

        const productos = [
            {
                id: "mouse",
                oferta: false
            },
            {
                id: "teclado",
                oferta: false
            }
        ];

        expect(
            filtrarOfertas(productos).length
        ).toBe(0);
    });

});


describe("Casos posibles de validaciones", function() {

    it("debe aceptar un correo con mayúsculas y espacios", function() {

        expect(
            correoEsValido("  USUARIO@GMAIL.COM  ")
        ).toBeTrue();
    });


    it("debe rechazar un correo con dos puntos seguidos", function() {

        expect(
            correoEsValido("usuario..test@gmail.com")
        ).toBeFalse();
    });


    it("debe rechazar un correo sin punto en el dominio", function() {

        expect(
            correoEsValido("usuario@gmail")
        ).toBeFalse();
    });


    it("debe rechazar un correo con dos arrobas", function() {

        expect(
            correoEsValido("usuario@@gmail.com")
        ).toBeFalse();
    });


    it("debe rechazar un correo con dominio de una sola letra", function() {

        expect(
            correoEsValido("a@b.c")
        ).toBeFalse();
    });


    it("debe indicar que dos contraseñas distintas no coinciden", function() {

        expect(
            contrasenasCoinciden(
                "NexaGear123",
                "NexaGear456"
            )
        ).toBeFalse();
    });


    it("debe indicar que dos contraseñas vacías coinciden", function() {

        expect(
            contrasenasCoinciden("", "")
        ).toBeTrue();
    });

});
