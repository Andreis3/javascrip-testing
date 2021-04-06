const { deepStrictEqual } = require('assert')
let counter = 0
let counter2 = counter
counter2++

const items = { counter: 0 }
const item2 = items

// tipo primitivo gera uma copia em memoria
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

//tipo de referência, copia o endereço de memoria
// e aponta para o mesmo lugar

item2.counter ++
deepStrictEqual(items, { counter: 1 })

items.counter ++
deepStrictEqual(item2, { counter: 2 })