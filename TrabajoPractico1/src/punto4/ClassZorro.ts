import { ClassAnimal } from "./ClassAnimal";

export class ClassZorro extends ClassAnimal {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(this.nombre + " (" + this.especie + ") hace: aaauuuuuu");
    }
}