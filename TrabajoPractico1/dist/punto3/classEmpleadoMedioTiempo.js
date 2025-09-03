"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoMedioTiempo = void 0;
const classEmpleado_1 = require("./classEmpleado");
class EmpleadoMedioTiempo extends classEmpleado_1.Empleado {
    constructor(nombre, salarioBase) {
        super(nombre, salarioBase);
    }
    calcularSalario() {
        const salarioMedioTiempo = this.salarioBase / 2;
        return salarioMedioTiempo;
    }
}
exports.EmpleadoMedioTiempo = EmpleadoMedioTiempo;
//# sourceMappingURL=classEmpleadoMedioTiempo.js.map