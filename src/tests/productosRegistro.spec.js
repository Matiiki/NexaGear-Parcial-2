import {
    obtenerPrecioFinal,
    filtrarOfertas,
    correoEsValido,
    contrasenasCoinciden
} from "../utils/logicaNexaGear.js";


describe("Productos y registro NexaGear", function() {

    it("debe utilizar el precio de oferta cuando el producto está en oferta", function() {

        const producto = {
            precio: 29990,
            oferta: true,
            precioOferta: 24990
        };

        expect(
            obtenerPrecioFinal(producto)
        ).toBe(24990);
    });


    it("debe utilizar el precio normal cuando el producto no está en oferta", function() {

        const producto = {
            precio: 54990,
            oferta: false,
            precioOferta: null
        };

        expect(
            obtenerPrecioFinal(producto)
        ).toBe(54990);
    });


    it("debe filtrar solamente los productos en oferta", function() {

        const productos = [
            {
                id: "mouse",
                oferta: true
            },
            {
                id: "teclado",
                oferta: false
            },
            {
                id: "audifonos",
                oferta: true
            }
        ];

        const ofertas =
            filtrarOfertas(productos);

        expect(ofertas.length).toBe(2);

        expect(
            ofertas[0].id
        ).toBe("mouse");

        expect(
            ofertas[1].id
        ).toBe("audifonos");
    });


    it("debe detectar un correo electrónico inválido", function() {

        expect(
            correoEsValido("usuario@")
        ).toBeFalse();
    });


    it("debe aceptar un correo electrónico válido", function() {

        expect(
            correoEsValido(
                "usuario@gmail.com"
            )
        ).toBeTrue();
    });


    it("debe comprobar que las contraseñas coincidan", function() {

        expect(
            contrasenasCoinciden(
                "NexaGear123",
                "NexaGear123"
            )
        ).toBeTrue();
    });

});