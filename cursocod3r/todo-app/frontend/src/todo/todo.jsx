import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.refresh()
  }

  refresh() {
    axios.get(`${URL}?sort=-createdAt`)
      .then(response => this.setState({ ...this.state, description: '', list: response.data }))
  }

  handleAdd() {
    axios.post(URL, { description: this.state.description })
      .then(this.refresh())
  }

  handleChange(event) {
    this.setState({ ...this.state, description: event.target.value })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <TodoForm
          description={this.state.description}
          handleAdd={this.handleAdd}
          handleChange={this.handleChange} />
        <TodoList list={this.state.list} />
      </div>
    )
  }
}

export default Todo
