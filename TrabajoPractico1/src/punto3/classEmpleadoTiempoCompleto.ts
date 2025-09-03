import { Empleado } from "./classEmpleado";

export class EmpleadoTiempoCompleto extends Empleado {
  constructor(nombre: string, salarioBase: number) {
    super(nombre, salarioBase);
  }
  calcularSalario(): number {
    const salarioTiempoCompleto = this.salarioBase + 20000;
    return salarioTiempoCompleto;
  }
}
