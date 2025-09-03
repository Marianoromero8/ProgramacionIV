import { Empleado } from "./punto3/classEmpleado";
import { EmpleadoMedioTiempo } from "./punto3/classEmpleadoMedioTiempo";
import { EmpleadoTiempoCompleto } from "./punto3/classEmpleadoTiempoCompleto";

// Ejercicio 3
export function ejercicioTres() {
  const empleados: Empleado[] = [];

  const empleado1 = new EmpleadoTiempoCompleto("Mariano", 120000);
  const empleado2 = new EmpleadoMedioTiempo("Maiano", 120000);
  const empleado3 = new EmpleadoTiempoCompleto("Mario", 600000);
  const empleado4 = new EmpleadoTiempoCompleto("Marian", 300000);
  const empleado5 = new EmpleadoMedioTiempo("Mar", 300000);

  empleados.push(empleado1, empleado2, empleado3, empleado4, empleado5);

  empleados.forEach((empleado) => {
    console.log(
      `El salario de ${empleado.nombre} es ${empleado.calcularSalario()}`
    );
  });
}

ejercicioTres();
