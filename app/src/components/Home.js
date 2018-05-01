 import React from 'react';
import { connect } from 'react-redux'

import Async from './Async'
const Balance = Async(() => import('./users/Balance'))
const Address = Async(() => import('./users/Address'))

const Home = () => (
  <div>
    <Address />
    <Balance />
  </div>
)

function mapStateToProps(state) {
  return { }
}

export default connect(mapStateToProps)(Home)
