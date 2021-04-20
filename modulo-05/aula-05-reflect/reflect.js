'use strict'

const assert = require('assert')

// garantir semantica e segurança em objetos para

// ----apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// Function.prototype.apply = () => { throw new TypeError('Eita!')}
// myObj.add.apply = function () { throw new Error('Vixxx')}


assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20}, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!')}

// esse aqui pode acontecer
myObj.add.apply = function () { throw new TypeError('Vixxx')}

assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: 'Vixxx'
  }
)

const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// ----apply

// ----defineProperty

// questões semântica 
function MyDate() {}

// feio pra Kct, tudo é Object, mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

// agora faz mais sentido
Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')
// ----defineProperty

// ----deleteProperty
const withDelete = { user: 'test' }
// imperformatico, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'test' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// ----deleteProperty

//  ---- get
// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)

// com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, 'userName', TypeError))
//  ---- get

// ---- has

assert.ok('superman' in { superman: ''})
assert.ok(Reflect.has({batman: ''}, 'batman'))
// ---- has

// ---- ownKeys
const user = Symbol('user')
const databaseUser = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'andreisantos'
}

// Com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
  ...Object.getOwnPropertyNames(databaseUser),
  ...Object.getOwnPropertySymbols(databaseUser)
]

// console.log('objectKeys', objectKeys)

assert.deepStrictEqual(objectKeys, [ 'id', Symbol.for('password'), user])

// com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), [ 'id', Symbol.for('password'), user])
// ---- ownKeys
