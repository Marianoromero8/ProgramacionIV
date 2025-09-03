import { Vehiculo } from './vehiculo';
import { Electrico } from './electrico.interface';
import { Combustion } from './combustion.interface';

export abstract class Auto extends Vehiculo {

    constructor(
        marca: string,
        modelo: string,
        año: number,
        color: string,
        private cantidadPuertas: number
    ) {
        super(marca, modelo, año, color);
        this.cantidadPuertas = cantidadPuertas
    }

    override arrancar(): void {
        console.log(`El auto de ${this.marca} modelo ${this.modelo} arrancó.`);
    }

    override detener(): void {
        console.log(`El auto de ${this.marca} modelo ${this.modelo} se detuvo.`);
    }

    public tocarBocina(): void {
        console.log('¡Beep beep!');
    }

    public getCantidadPuertas():number{
        return this.cantidadPuertas;
    }
}

export class AutoElectrico extends Auto implements Electrico {
    private bateria: number;

    constructor(
        marca: string,
        modelo: string,
        año: number,
        color: string,
        cantidadPuertas: number,
        bateriaInicial: number = 100 // valor por defecto 100
    ) {
        super(marca, modelo, año, color, cantidadPuertas);
        this.bateria = bateriaInicial;
    }

    cargarBateria(): void {
        this.bateria = 100;
        console.log('Batería del auto cargada al 100%.');
    }

    nivelBateria(): number {
        return this.bateria;
    }
}

export class AutoCombustion extends Auto implements Combustion {
  private cilindrada: number;

  constructor(
    marca: string,
    modelo: string,
    año: number,
    color: string,
    cantidadPuertas: number,
    cilindrada: number
  ) {
    super(marca, modelo, año, color, cantidadPuertas);
    this.cilindrada = cilindrada;
  }

  public getCilindrada(): number {
    return this.cilindrada;
  }
}