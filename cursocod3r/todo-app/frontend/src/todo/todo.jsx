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
  }

  handleAdd() {
    axios.post(URL, { description: this.state.description })
      .then(response => console.log(response))
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
        <TodoList />
      </div>
    )
  }
}

export default Todo
