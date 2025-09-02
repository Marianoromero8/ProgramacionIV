"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangulo = exports.Circulo = exports.Cuadrado = void 0;
const FiguraGeometrica_1 = require("./FiguraGeometrica");
class Cuadrado extends FiguraGeometrica_1.FiguraGeometrica {
    constructor(nombre, lado) {
        super(nombre);
        this.nombre = nombre;
        this.lado = lado;
        this.lado = lado;
    }
    calcularArea() {
        return this.lado * this.lado;
    }
}
exports.Cuadrado = Cuadrado;
class Circulo extends FiguraGeometrica_1.FiguraGeometrica {
    constructor(nombre, radio) {
        super(nombre);
        this.nombre = nombre;
        this.radio = radio;
        this.radio = radio;
    }
    calcularArea() {
        const pi = 3.14159;
        return Math.pow((pi * this.radio), 2);
    }
}
exports.Circulo = Circulo;
class Triangulo extends FiguraGeometrica_1.FiguraGeometrica {
    constructor(nombre, base, altura) {
        super(nombre);
        this.nombre = nombre;
        this.base = base;
        this.altura = altura;
        this.base = base;
        this.altura = altura;
    }
    calcularArea() {
        return (this.base * this.altura) / 2;
    }
}
exports.Triangulo = Triangulo;
