import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
})

export const search = (description) => {
  const search = description ? `description__regex=/${description}/` : ''
  const request = axios.get(`${URL}?sort=-createdAt&${search}`)
  return {
    type: 'TODO_SEARCHED',
    payload: request
  }
}

export const add = (description) => {
  return dispatch => {
    axios.post(`${URL}`, { description })
      .then(
        response => dispatch(clear())
      )
      .then(
        response => dispatch(search())
      )
  }
}

export const markAsDone = (todo) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(
        response => dispatch(
          { type: 'TODO_MARKED_AS_DONE', payload: response.data }
        )
      )
      .then(
        response => dispatch(search())
      )
  }
}

export const markAsUndone = (todo) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(
        response => dispatch(
          { type: 'TODO_MARKED_AS_UNDONE', payload: response.data }
        )
      )
      .then(
        response => dispatch(search())
      )
  }
}

export const remove = (todo) => {
  return dispatch => {
    axios.delete(`${URL}/${todo._id}`)
      .then(
        response => dispatch(search())
      )
  }
}

export const clear = () => {
  return { type: 'TODO_CLEAR' }
}
