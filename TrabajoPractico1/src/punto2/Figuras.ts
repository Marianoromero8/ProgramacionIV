import { FiguraGeometrica } from "./FiguraGeometrica";

export class Cuadrado extends FiguraGeometrica {
    constructor(public nombre:string, public lado:number){
        super(nombre)
        this.lado = lado
    }

    calcularArea(): number {
        return this.lado * this.lado
    }
}

export class Circulo extends FiguraGeometrica {
    constructor(public nombre:string, public radio: number){
        super(nombre)
        this.radio = radio
    }

    calcularArea(): number {
        const pi = 3.14159
        return Math.pow((pi * this.radio), 2)
    }
}

export class Triangulo extends FiguraGeometrica{
    constructor(public nombre:string, public base:number, public altura:number){
        super(nombre)
        this.base = base
        this.altura = altura
    }

    calcularArea(): number {
        return (this.base * this.altura) / 2
    }
}

