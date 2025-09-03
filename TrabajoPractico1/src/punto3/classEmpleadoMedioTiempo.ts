import { Empleado } from "./classEmpleado";

export class EmpleadoMedioTiempo extends Empleado {
  constructor(nombre: string, salarioBase: number) {
    super(nombre, salarioBase);
  }
  calcularSalario(): number {
    const salarioMedioTiempo = this.salarioBase / 2;
    return salarioMedioTiempo;
  }
}
