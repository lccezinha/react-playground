import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  todo: () => ({
    description: 'Ler',
    list: [{
      _id: 1,
      description: 'Comprar camisa do brasil',
      done: true
    }, {
      _id: 2,
      description: 'Hexa',
      done: false
    }, {
      _id: 3,
      description: 'Gol da Alemanha',
      done: true
    }]
  })
})

export default rootReducer
