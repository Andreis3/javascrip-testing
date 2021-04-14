import mocha from "mocha";
import chai from "chai";

import Person from "../src/person.js";

const { describe, it } = mocha;
const { expect } = chai;

describe("Person", () => {
  it("should return a person instance form a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Carro 2000 2020-02-02 2020-03-03"
    );

    const expected = {
      from: "2020-02-02",
      to: "2020-03-03",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "2000",
      id: "1",
    };
    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      from: "2020-02-02",
      to: "2020-03-03",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "2000",
      id: "1",
    });

    const result = person.formatted("pt-BR");

    const expected = {
      id: 1,
      vehicles: "Bike e Carro",
      kmTraveled: "2.000 km",
      from: "02 de fevereiro de 2020",
      to: "03 de março de 2020",
    };

    
    expect(result).to.be.deep.equal(expected);
  });
});
