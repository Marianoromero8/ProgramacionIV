import { Empleado } from "./classEmpleado";

export class EmpleadoMedioTiempo extends Empleado {
  constructor(
    nombre: string, 
    salarioBase: number
  ) {
    super(nombre, salarioBase);
  }
  override calcularSalario(): number {
    return (this.salarioBase / 2);
  }
}
