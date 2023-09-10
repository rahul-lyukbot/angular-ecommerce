import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { LyukShopFormService } from 'src/app/services/lyuk-shop-form.service';
import { LyukShopValidators } from 'src/app/validators/lyuk-shop-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  cardYears: number[] = [];
  cardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private lyukShopFormService: LyukShopFormService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
      }),
      cardDetails: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          LyukShopValidators.notOnlyWhitespace,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // populaten card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log(`start month ${startMonth}`);
    this.lyukShopFormService.getCardMonths(startMonth).subscribe((data) => {
      console.log(`Retrieved card months: ${JSON.stringify(data)}`);
      this.cardMonths = data;
    });

    // populate card years

    this.lyukShopFormService.getCardYears().subscribe((data) => {
      console.log(`Retrieved card years: ${JSON.stringify(data)}`);
      this.cardYears = data;
    });

    // populated countries
    this.lyukShopFormService.getCountries().subscribe((data) => {
      console.log(`Retrieved countries: ${JSON.stringify(data)}`);
      this.countries = data;
    });
  }
  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      (totalQuantity) => (this.totalQuantity = totalQuantity)
    );
    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  // Getters methods
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  // Shipping Address
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  // Billing Address
  get billingAddressStreet() {
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity() {
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState() {
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressCountry() {
    return this.checkoutFormGroup.get('billingAddress.country');
  }
  get billingAddressZipCode() {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  // Card details
  get cardType() {
    return this.checkoutFormGroup.get('cardDetails.cardType');
  }
  get nameOnCard() {
    return this.checkoutFormGroup.get('cardDetails.nameOnCard');
  }
  get cardNumber() {
    return this.checkoutFormGroup.get('cardDetails.cardNumber');
  }
  get securityCode() {
    return this.checkoutFormGroup.get('cardDetails.securityCode');
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log('Handling the submit button');

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log(
      'Country address for shipping is ' +
        this.checkoutFormGroup.get('shippingAddress')?.value.country.name
    );
    console.log(
      'State address for shipping is ' +
        this.checkoutFormGroup.get('shippingAddress')?.value.state.name
    );
  }

  handleMonthsAndYears() {
    const cardFormFroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(cardFormFroup?.value.expirationYear);

    // if current year is equal the selected year then start with the current month
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.lyukShopFormService.getCardMonths(startMonth).subscribe((data) => {
      console.log(`Retrieved credit card months: ${JSON.stringify(data)}`);

      this.cardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.lyukShopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
