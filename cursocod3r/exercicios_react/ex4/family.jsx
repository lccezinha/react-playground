import React from 'react'
import { childreWithProps } from '../utils/reactUtils'

export default props => (
  <div>
    <h1>Família</h1>
    { childreWithProps(props.children, props) }
  </div>
)
