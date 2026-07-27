import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ticketValidator(maxAvailableSeats: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const value = Number(control.value);

        if (isNaN(value)) {
        return { invalidNumber: true };
        }

        if (value < 1) {
        return { minSeats: true };
        }

        if (value > 6) {
        return { maxSeats: true };
        }

        if (value > maxAvailableSeats) {
        return { unavailableSeats: true };
        }

        return null;

    };

}