import { Vehiculo } from './vehiculo';
import { Electrico } from './electrico.interface';
import { Combustion } from './combustion.interface';

export abstract class Moto extends Vehiculo {

    constructor(
        marca: string,
        modelo: string,
        año: number,
        color: string
    ) {
        super(marca, modelo, año, color);
    }

    override  arrancar(): void {
        console.log(`La moto de ${this.marca} modelo ${this.modelo} arrancó.`);
    }

    override detener(): void {
        console.log(`La moto de ${this.marca} modelo ${this.modelo} se detuvo.`);
    }

    public hacerWheelie(): void {
        console.log('¡Haciendo un Wheelie!');
    }

}

// Clase MotoElectrica
export class MotoElectrica extends Moto implements Electrico {
  private bateria: number;

  constructor(
    marca: string,
    modelo: string,
    año: number,
    color: string,
    bateriaInicial: number = 100 // Valor por defecto 100
  ) {
    super(marca, modelo, año, color);
    this.bateria = bateriaInicial;
  }

  cargarBateria(): void {
    this.bateria = 100;
    console.log('Batería de la moto cargada al 100%.');
  }

  nivelBateria(): number {
    return this.bateria;
  }
}


// Clase MotoCombustion
export class MotoCombustion extends Moto implements Combustion {
  private cilindrada: number;

  constructor(
    marca: string,
    modelo: string,
    año: number,
    color: string,
    cilindrada: number
  ) {
    super(marca, modelo, año, color);
    this.cilindrada = cilindrada;
  }

  public getCilindrada(): number {
    return this.cilindrada;
  }
}