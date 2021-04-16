const assert = require('assert');
const myMap = new Map();

// podem ter qualquer coisa como chave com
myMap
      .set(1, 'one')
      .set('Andrei', { text: 'two' })
      .set(true, () => 'hello')


// usando um construtor com
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Andrei'), { text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'AndreiSantos' })

// console.log('get', myMap.get(onlyReferenceWorks))

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'AndreiSantos' })

// utilitários
// - No Object seria Object.keys({ a: 1}).listLength
assert.deepStrictEqual(myMap.size, 4)
// para verificar se um item existe no objeto
// item.<key> = se não existe = undefined
// if() = coerção implícita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Andrei }).hasOwnProperty('name')
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.<key>
// imperformático para javascript
assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá para iterar em Objects diretamente
// tem que transformar com Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), 
    JSON.stringify([[1,"one"],["Andrei",{"text":"two"}],[true, () => {}]]))

// for (const [key, value] of myMap) {
//   console.log({ key, value })
// }


// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey' }).toString()  === 'Hey'

// qualquer chave pode colidir, com as propriedades heradas do objecto, como 
// constructor, toString, valueOf e etc.

const actor = {
  name: 'Tais Araújo',
  toString: 'Queen: Tais Araújo'
}

// não precisa restrição de nome de chave que
myMap.set(actor)
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da para limpar um Obj sem reassina-lo
myMap.clear()

assert.deepStrictEqual([...myMap.keys()], [])

//  ---  WeakMap

// Pode ser coletado após perder as referencias
// usado em casos beeem específicos

// tem a maioria dos beneficos do Map
// MAS: nao é iterável
// Só chaves de referencia e que você já conheça
// mais leve e prevê leak de memoria, pq depois que as instancias saem da memoria, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)

