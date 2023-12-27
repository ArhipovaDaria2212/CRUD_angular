import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
  
export class FormValidationService {

  constructor(
  ) { }

  isFormValid(formGroup: FormGroup, toastr: ToastrService) {
    if (formGroup.invalid) {
      toastr.error("Invalid data!", "ERROR");
      return false;
    }
    return true;
  }

  ageValidator(toastr: ToastrService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value > 0 && control.value < 120 || control.value == null || control.value == "";
      if (!valid) toastr.error("You either entered the wrong age, or you can't type too well yet, or you're already dead(", "Invalid age!");

      return !valid ? { age: { invalid: true } } : null;
    };
  }

}
