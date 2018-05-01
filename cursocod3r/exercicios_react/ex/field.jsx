import React, { Component } from 'react'
import { connect } from 'react-redux'

class Field extends Component {
  render() {
    return(
      <div>
        <label>{this.props.my_value}</label>
        <input onChange={this.handleChange} value={this.props.my_value} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    my_value: state.field.value
  }
}

export default connect(mapStateToProps)(Field)
