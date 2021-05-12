const rewiremock = require('rewiremock/node');


const { deepStrictEqual } = require('assert');

const dbData = [{ name: 'Maria'}, {name: 'João'}];

// <poderia estar em outro arquivo>
class MockDatabase {
  connect = () => this;

  find = async (query) => dbData;
}
// <poderia estar em outro arquivo>

rewiremock (() => require('./../src/util/database')).with(MockDatabase);

;(async () => {
  {
    const expected = [{ name: 'MARIA'}, {name: 'JOÃO'}];

    rewiremock.enable();
    const UserFactory = require('./../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    deepStrictEqual(result, expected);

    rewiremock.disable();
  }

  {
    const expected = [{ name: 'ERICKWENDEL'}];

    const UserFactory = require('./../src/factory/userFactory');

    const userFactory = await UserFactory.createInstance();

    const result = await userFactory.find();

    deepStrictEqual(result, expected);

  }
})()