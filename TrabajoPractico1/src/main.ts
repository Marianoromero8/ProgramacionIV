import { Empleado } from "./punto3/classEmpleado";
import { EmpleadoMedioTiempo } from "./punto3/classEmpleadoMedioTiempo";
import { EmpleadoTiempoCompleto } from "./punto3/classEmpleadoTiempoCompleto";
import { AutoElectrico, AutoCombustion } from "./punto5/auto";
import { MotoElectrica, MotoCombustion } from "./punto5/moto";

// Ejercicio 1
// console.log("--------------------------------------------------------- \n");
// Ejercicio 2
// console.log("--------------------------------------------------------- \n");
// Ejercicio 3
export function ejercicioTres() {
  const empleados: Empleado[] = [];

  const empleado1 = new EmpleadoTiempoCompleto("Mariano", 120000);
  const empleado2 = new EmpleadoMedioTiempo("Maiano", 120000);
  const empleado3 = new EmpleadoTiempoCompleto("Mario", 600000);
  const empleado4 = new EmpleadoTiempoCompleto("Marian", 300000);
  const empleado5 = new EmpleadoMedioTiempo("Mar", 300000);

  empleados.push(empleado1, empleado2, empleado3, empleado4, empleado5);

  console.log("-- EJERCICIO 3 --");
  empleados.forEach((empleado) => {
    console.log(
      `El salario de ${empleado.nombre} es ${empleado.calcularSalario()}`
    );
  });
}

ejercicioTres();

console.log("--------------------------------------------------------- \n");
// Ejercicio 4
// console.log("--------------------------------------------------------- \n");
// Ejercicio 5
const autoCombustion = new AutoCombustion(
  "Ford",
  "Mustang",
  2020,
  "Rojo",
  2,
  5000
);
console.log("-- EJERCICIO 5 --");
autoCombustion.arrancar();
console.log(`Color del auto: ${autoCombustion.getColor()}`);
console.log(`Cantidad de puertas: ${autoCombustion.getCantidadPuertas()}`);
console.log(`Cilindrada: ${autoCombustion.getCilindrada()} cc`);
autoCombustion.tocarBocina();
autoCombustion.detener();

console.log("---");

const autoElectrico = new AutoElectrico(
  "Tesla",
  "Model 3",
  2023,
  "Rojo",
  4,
  50
);
autoElectrico.arrancar();
autoElectrico.tocarBocina();
console.log(`Color del auto: ${autoElectrico.getColor()}`);
console.log(`Nivel de batería: ${autoElectrico.nivelBateria()}%`);
console.log(`Cantidad de puertas: ${autoElectrico.getCantidadPuertas()}`);
autoElectrico.cargarBateria();
autoElectrico.detener();

console.log("---");

const moto = new MotoCombustion("Yamaha", "R1", 2019, "Roja", 1000);
moto.arrancar();
console.log(`Color de la moto: ${moto.getColor()}`);
const motoElectrica = new MotoElectrica("Honda", "EM1", 2024, "Verde", 75);
motoElectrica.arrancar();
console.log(`Nivel de batería: ${motoElectrica.nivelBateria()}%`);
console.log(`Color de la moto: ${motoElectrica.getColor()}`);
motoElectrica.cargarBateria();
motoElectrica.detener();
