import { expect, describe, jest, test, beforeAll } from "@jest/globals";
import Payment from "../src/events/payments.js";
import Marketing from "../src/observers/marketing.js";
import Shipment from "../src/observers/shipment.js";
import PaymentSubject from "../src/subjects/paymentsSubject.js";

describe("Test Suite for Observer Pattern", () => {
  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {});
  });
  test("#PaymentSubject notify observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    const data = "hello world!";
    const expected = data;

    subject.subscribe(observer);
    subject.notify(data);

    expect(observer.update).toBeCalledWith(expected);
  });

  test("#PaymentSubject should not notify unsubscribed observers", () => {
    const subject = new PaymentSubject();
    const observer = {
      update: jest.fn(),
    };
    const data = "hello world!";

    subject.subscribe(observer);
    subject.unsubscribe(observer);
    subject.notify(data);

    expect(observer.update).not.toHaveBeenCalled();
  });
  test("#Payment should notify subject after a credit card transaction", () => {
    const subject = new PaymentSubject();
    const payment = new Payment(subject);

    const paymentSubjectNotifySpy = jest.spyOn(
      payment.paymentsSubject,
      payment.paymentsSubject.notify.name
    );

    const data = { username: "erickwendel", id: Date.now() };
    payment.creditCard(data);

    expect(paymentSubjectNotifySpy).toBeCalledWith(data);
  });

  test("#All should notify subscribers after a credit card payment", () => {
    const subject = new PaymentSubject();
    const shipment = new Shipment();
    const marketing = new Marketing();

    const shipmentSpy = jest.spyOn(shipment, shipment.update.name);
    const marketingSpy = jest.spyOn(marketing, marketing.update.name);

    subject.subscribe(shipment);
    subject.subscribe(marketing);

    const payment = new Payment(subject);
    const data = { userName: "erickwendel", id: Date.now() };
    payment.creditCard(data);

    expect(shipmentSpy).toBeCalledWith(data);
    expect(marketingSpy).toBeCalledWith(data);
  });
});
