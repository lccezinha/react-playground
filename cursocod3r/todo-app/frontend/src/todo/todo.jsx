import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

class Todo extends Component {
  handleAdd() {
    console.log('handleAdd works!')
  }

  render() {
    return (
      <div>
        <PageHeader name='Tarefas' small='Cadastro' />
        <TodoForm handleAdd={this.handleAdd}/>
        <TodoList />
      </div>
    )
  }
}

export default Todo
