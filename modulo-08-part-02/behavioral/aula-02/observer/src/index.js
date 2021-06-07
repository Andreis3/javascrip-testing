import Payment from "./events/payments.js";
import Marketing from "./observers/marketing.js";
import Shipment from "./observers/shipment.js";
import PaymentSubject from "./subjects/paymentsSubject.js";


const subject = new PaymentSubject()
const marketing = new Marketing()
subject.subscribe(marketing)

const shipment = new Shipment()
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({ userName : 'erickwendel', id: Date.now()})

subject.unsubscribe(marketing)

// só vai disparar para a area de shipment
payment.creditCard({ userName: 'mariazinha', id: Date.now()})