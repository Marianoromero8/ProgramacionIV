"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Figuras_1 = require("./FiguraGeometrica/Figuras");
const ci1 = new Figuras_1.Circulo('Jorge', 224);
const t1 = new Figuras_1.Triangulo('Manuel', 15, 70);
const cu1 = new Figuras_1.Cuadrado('Franco', 15);
console.log(`Area de: Circulo = ${ci1.calcularArea()}cm2, Triangulo = ${t1.calcularArea()}cm2, Cuadrado = ${cu1.calcularArea()}cm2`);
