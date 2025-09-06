import { ClassAnimal } from "./ClassAnimal";
import { Volador } from "./Volador.interface";

export class ClassPajaro extends ClassAnimal implements Volador {
    private especie: string;

    constructor(nombre: string, especie: string) {
        super(nombre);
        this.especie = especie;
    }

    hacerSonido(): void {
        console.log(this.nombre + " (" + this.especie + ") hace: pío pío");
    }

    volar(): void {
        console.log(this.nombre + " está volando");
    }
}