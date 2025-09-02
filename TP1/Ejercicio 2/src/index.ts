import { Circulo, Triangulo, Cuadrado } from "./FiguraGeometrica/Figuras";

const ci1 = new Circulo('Jorge', 224)
const t1 = new Triangulo('Manuel', 15, 70)
const cu1 = new Cuadrado('Franco', 15)

console.log(`Area de: Circulo = ${ci1.calcularArea()}cm2, Triangulo = ${t1.calcularArea()}cm2, Cuadrado = ${cu1.calcularArea()}cm2`)