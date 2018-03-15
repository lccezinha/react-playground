import React from 'react'
import ReactDOM from 'react-dom'
import Member from './member'
import Family from './family'

ReactDOM.render(
  <Family lastName="White">
    <Member name="Walter 1"></Member>
    <Member name="Walter 2"></Member>
    <Member name="Walter 3"></Member>
  </Family>,
document.getElementById('app'))
