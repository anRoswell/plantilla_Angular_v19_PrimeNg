import { FormControl } from "@angular/forms";

export class FormValidators {
    // Validador Personalizado
    static greaterThanZero(control: FormControl) {
        const value = control.value;
        if (value > 0) {
            return null;  // La validación pasa si el valor es mayor que cero
        } else {
            return { greaterThanZero: true };  // La validación falla si el valor es menor o igual a cero
        }
    }
}