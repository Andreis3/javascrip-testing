export default class Payment {
  constructor(paymentsSubject) {
    this.paymentsSubject = paymentsSubject;
  }

  creditCard(paymentData) {
    console.log(`\na payment ocurred from ${paymentData.userName}`);
    this.paymentsSubject.notify(paymentData);
  }
}