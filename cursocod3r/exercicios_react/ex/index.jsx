import React from 'react'
import ReactDOM from 'react-dom'
import Member from './member'
import Family from './family'

ReactDOM.render(
  <Family>
    <Member name="Walter" lastName="White #1"></Member>
    <Member name="Walter" lastName="White #2"></Member>
    <Member name="Walter" lastName="White #3"></Member>
  </Family>,
document.getElementById('app'))
