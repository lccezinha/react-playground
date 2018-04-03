import React, { Component } from 'react'
// import React from 'react'

// class MyComponent extends React.Component {
class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { value: props.initialValue }
  }

  sum(delta) {
    this.setState({ value: this.state.value + delta })
  }

  render() {
    return (
      <div>
        <h1>{this.props.label}</h1>
        <h2>{this.state.value}</h2>
        <button onClick={() => this.sum(-1)}>-</button>
        <button onClick={() => this.sum(1)}>+</button>
      </div>
    )
  }
}

export default MyComponent
