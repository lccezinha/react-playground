const INITAL_STATE = {
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
}

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.payload }
    case 'TODO_SEARCHED':
      return { ...state, list: action.payload.data }
    default:
      return state
  }
}
