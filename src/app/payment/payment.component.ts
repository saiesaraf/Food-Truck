import { Component, NgZone } from '@angular/core';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent  {

  constructor(private _zone: NgZone) {}
  title = 'cardFront';
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  getToken() {
  this.message = 'Loading...';

  (window as any).Stripe.card.createToken({
    number: this.cardNumber,
    exp_month: this.expiryMonth,
    exp_year: this.expiryYear,
    cvc: this.cvc
  }, (status: number, response: any) => {
    // Wrapping inside the Angular zone
    this._zone.run(() => {
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
      } else {
        this.message = response.error.message;
      }
    });
  });
}
}

