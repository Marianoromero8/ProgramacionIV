import { FiguraGeometrica } from "./FiguraGeometrica";

export class Cuadrado extends FiguraGeometrica {
    constructor(
        nombre:string, 
        private lado:number
    ){
        super(nombre);
        this.lado = lado;
    }

    override calcularArea(): number {
        return (this.lado * this.lado);
    }

    public getLado(): number {
        return this.lado;
    }
}

export class Circulo extends FiguraGeometrica {
    constructor(
        nombre:string,
        private radio: number
    ){
        super(nombre);
        this.radio = radio;
    }

    override calcularArea(): number {
        return Math.PI * this.radio * this.radio;
    }

    public getRadio(): number {
        return this.radio;
    }
}

export class Triangulo extends FiguraGeometrica{
    constructor(
        nombre:string, 
        private base:number, 
        private altura:number
    ){
        super(nombre);
        this.base = base;
        this.altura = altura;
    }

    override calcularArea(): number {
        return (this.base * this.altura) / 2;
    }

    public getBase(): number {
        return this.base;
    }

    public getAltura(): number {
        return this.altura;
    }
}

