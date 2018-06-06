import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, search, clear } from './todoActions'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.keyHandler = this.keyHandler.bind(this)
  }

  componentWillMount() {
    this.props.search()
  }

  keyHandler(event) {
    const { add, search, description, clear } = this.props
    if (event.key === 'Enter') {
      event.shiftKey ? search(description) : add(description)
    } else if (event.key === 'Escape') {
      clear()
    }
  }

  render() {
    const { add, search, description, clear } = this.props
    return (
      <div role='form' className='todoForm'>
        <Grid cols='12 9 10'>
          <input id='description'
                 className='form-control'
                 placeholder='Add uma tarefa'
                 onChange={this.props.changeDescription}
                 onKeyUp={this.keyHandler}
                 value={description} />
        </Grid>

        <Grid cols='12 3 2'>
          <IconButton style='primary' icon='plus' onClick={() => add(description)} />
          <IconButton style='info' icon='search' onClick={() => search(description)} />
          <IconButton style='default' icon='close' onClick={() => clear()} />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  description: state.todo.description
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      add, changeDescription, search, clear
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
