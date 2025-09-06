export abstract class ClassAnimal {
    constructor(
        protected nombre:string
    ){
        this.nombre = nombre;
    }

    abstract hacerSonido(): void;

    public getNombre(): string {
        return this.nombre;
    }
}