import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import '../../node_modules/grommet-css'
import App from 'grommet/components/App'
import Box from 'grommet/components/Box'
import ReactGA from 'react-ga'

import * as actions from '../actions'
import Async from './Async'
import env from '../env'
ReactGA.initialize(env.GA)
const supportsHistory = 'pushState' in window.history
const Help = Async(() => import('./Help'))
const Home = Async(() => import('./Home'))
const Header = Async(() => import('./Header'))
const Footer = Async(() => import('./Footer'))
const Status = Async(() => import('./Status'))
const TransferOwnership = Async(() => import('./admin/TransferOwnership'))
const Admin = Async(() => import('./admin/Admin'))
const NoMatch = Async(() => import('./NoMatch'))
const TransferTokens = Async(() => import('./TransferTokens'))

class _App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      initiated: false,
      deployed: true
    }
  }

  async componentDidMount() {
    this.props.initWeb3()

    this.setState({
      initiated: true
    })

    setInterval(() => {
      this.props.fetchAccount(this.props.web3)
      this.props.fetchGasPrice(this.props.web3)
    }, 2000)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.web3 !== nextProps.web3) {
      this.props.fetchAccount(this.props.web3)
      this.props.fetchGasPrice(this.props.web3)
      this.props.initIPFS(this.props.web3)

      if (nextProps.web3.web3Initiated) {
        this.props.initToken(nextProps.web3)
      }
    }

    if (this.props.account !== nextProps.account && typeof nextProps.account === 'string') {
      this.setState({
        initiated: true
      })
    }
  }

  pageviewTracking() {
    ReactGA.pageview(window.location.pathName)
  }

  render() {
    return (
      <App>
        <div>
          <BrowserRouter onUpdate={this.pageviewTracking} forceRefresh={!supportsHistory}>
            <div>
              <Box align='center' responsive={true} pad='large'>
                <Status
                  account={this.props.account}
                  metamask={this.props.web3}
                  initiated={this.state.initiated}
                  deployed={this.state.deployed} {...this.props} />

                { this.state.deployed && typeof this.props.account === 'string' && this.props.account !== 'empty'
                  ? <div>
                      <Header />
                      <Switch>
                      <Route exact strict sensitive path='/' component={Help} />
                      <Route exact strict sensitive path='/account' component={Home} />
                      <Route exact strict sensitive path='/transfer' component={TransferTokens} />

                      <Route exact strict sensitive path='/admin' component={Admin} />
                      <Route exact strict sensitive path='/transfer-ownership' component={TransferOwnership} />

                      <Route component={NoMatch} />
                      </Switch>
                    </div>
                  : null
                }
              </Box>
              <Footer />
            </div>
          </BrowserRouter>
        </div>
      </App>
    )
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account
  }
}

export default connect(mapStateToProps, actions)(_App)
