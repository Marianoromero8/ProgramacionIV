export abstract class FiguraGeometrica {
    constructor(public nombre:string){
        this.nombre = nombre
    }

    abstract calcularArea(): number
}