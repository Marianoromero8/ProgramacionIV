export abstract class Empleado {
  constructor(public nombre: string, public salarioBase: number) {
    this.nombre = nombre;
    this.salarioBase = salarioBase;
  }

  abstract calcularSalario(): number;
}
