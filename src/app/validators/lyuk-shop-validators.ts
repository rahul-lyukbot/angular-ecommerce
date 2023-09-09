import { FormControl, ValidationErrors } from '@angular/forms';

export class LyukShopValidators {
  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors {
    // check if string only have white space
    if (control.value != null && control.value.trim().length === 0) {
      // invalid string, return error object
      return { notOnlyWhitespace: true };
    } else {
      return null!;
    }
  }
}
