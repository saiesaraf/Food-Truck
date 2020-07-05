import { Component, NgZone } from '@angular/core';
import { DataService } from '../data.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constructor(
    private _zone: NgZone,
    public data: DataService,
    private flashMessage: FlashMessagesService
  ) {}
  title = 'cardFront';
  cardNumber: string;
  expiryMonthYear: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  getToken() {
    this.message = 'Loading...';

    (window as any).Stripe.card.createToken(
      {
        number: this.cardNumber,
        exp_month: this.expiryMonthYear.split('/')[0],
        exp_year: this.expiryMonthYear.split('/')[1],
        cvc: this.cvc
      },
      (status: number, response: any) => {
        // Wrapping inside the Angular zone
        this._zone.run(() => {
          if (status === 200) {
            this.message = `Success! Card token ${response.id}.`;
            const card = {
              amount: this.data.totalCost,
              token: response.id
            };
            this.data.getPayment(card).subscribe((paymentInfo: any) => {
              // console.log(result.total);
              if (paymentInfo['success']) {
                this.flashMessage.show('Successful card payment!', {
                  cssClass: 'alert-success',
                  timeout: 3000
                });
                this.placedOrder();
              } else {
                this.flashMessage.show(JSON.stringify(paymentInfo['msg']), {
                  cssClass: 'alert-danger',
                  timeout: 5000
                });
              }
            });
          } else {
            this.message = response.error.message;
          }
        });
      }
    );
  }

  placedOrder() {
    if (this.data.isloggedin === true) {
      let items: any[] = [];
      for (let i = 0; i < this.data.order.length; i++) {
        if (this.data.order[i].quantity > 0) {
          const newItem = {
            name: this.data.order[i].name,
            cost: this.data.order[i].cost,
            description: this.data.order[i].description,
            quantity: this.data.order[i].quantity
          };
          items.push(newItem);
        }
      }
      const newOrder = {
        email: this.data.userId,
        items: items,
        total: this.data.totalCost,
        date: Date.now()
      };

      console.log('new order', newOrder);
      this.data.postOrder(newOrder).subscribe((orderInfo: any) => {
        if (orderInfo['success']) {
          //this.data.getPrevOrders();
          this.flashMessage.show(
            'items are added in cart, proceed to payment!',
            {
              cssClass: 'alert-success',
              timeout: 3000
            }
          );
        } else {
          this.flashMessage.show(JSON.stringify(orderInfo['msg']), {
            cssClass: 'alert-danger',
            timeout: 5000
          });
        }
      });
    }
  }
}
