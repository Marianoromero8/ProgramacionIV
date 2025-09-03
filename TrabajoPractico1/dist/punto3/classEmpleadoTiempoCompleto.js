"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoTiempoCompleto = void 0;
const classEmpleado_1 = require("./classEmpleado");
class EmpleadoTiempoCompleto extends classEmpleado_1.Empleado {
    constructor(nombre, salarioBase) {
        super(nombre, salarioBase);
    }
    calcularSalario() {
        const salarioTiempoCompleto = this.salarioBase + 20000;
        return salarioTiempoCompleto;
    }
}
exports.EmpleadoTiempoCompleto = EmpleadoTiempoCompleto;
//# sourceMappingURL=classEmpleadoTiempoCompleto.js.map