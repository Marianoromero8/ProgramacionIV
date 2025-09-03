"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.puntoTres = puntoTres;
const classEmpleadoMedioTiempo_1 = require("./classEmpleadoMedioTiempo");
const classEmpleadoTiempoCompleto_1 = require("./classEmpleadoTiempoCompleto");
function puntoTres() {
    const empleados = [];
    const empleado1 = new classEmpleadoTiempoCompleto_1.EmpleadoTiempoCompleto("Mariano", 120000);
    const empleado2 = new classEmpleadoMedioTiempo_1.EmpleadoMedioTiempo("Juan", 120000);
    const empleado3 = new classEmpleadoTiempoCompleto_1.EmpleadoTiempoCompleto("Mario", 600000);
    const empleado4 = new classEmpleadoTiempoCompleto_1.EmpleadoTiempoCompleto("Marian", 300000);
    const empleado5 = new classEmpleadoMedioTiempo_1.EmpleadoMedioTiempo("Mar", 300000);
    empleados.push(empleado1, empleado2, empleado3, empleado4, empleado5);
    empleados.forEach((empleado) => {
        console.log(`El salario de ${empleado.nombre} es ${empleado.calcularSalario()}`);
    });
}
//# sourceMappingURL=index.js.map