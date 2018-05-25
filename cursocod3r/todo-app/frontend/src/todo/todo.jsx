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
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
    this.handleMarkAsUndone = this.handleMarkAsUndone.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.handleChange = this.handleChange.bind(this)

    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt&${search}`)
      .then(response => this.setState({ ...this.state, description, list: response.data }))
  }

  handleAdd() {
    axios.post(URL, { description: this.state.description })
      .then(response => this.refresh())
  }

  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then(response => this.refresh(this.state.description))
  }

  handleMarkAsDone(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(response => this.refresh(this.state.description))
  }

  handleMarkAsUndone(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(response => this.refresh(this.state.description))
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleClear() {
    this.refresh()
  }

  handleChange(event) {
    this.setState({ ...this.state, description: event.target.value })
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <TodoForm
          handleAdd={this.handleAdd}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear} />
        <TodoList
          handleRemove={this.handleRemove}
          handleMarkAsDone={this.handleMarkAsDone}
          handleMarkAsUndone={this.handleMarkAsUndone} />
      </div>
    )
  }
}

export default Todo
