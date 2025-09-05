export abstract class FiguraGeometrica {
    constructor(
        protected nombre:string
    ){
        this.nombre = nombre;
    }

    abstract calcularArea(): number;

    public getNombre(): string {
        return this.nombre;
    }
}