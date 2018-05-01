import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Box from 'grommet/components/Box'
import Label  from 'grommet/components/Label'
import Tabs  from 'grommet/components/Tabs'
import Tab  from 'grommet/components/Tab'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isOwner: false,
      redirect: true
    }

    this.validateAdmin = this.validateAdmin.bind(this)
  }

  async componentDidMount() {
    this.validateAdmin()
  }

  validateAdmin() {
    this.props.Token.deployed().then(async (token) => {
      token.validate({ from: this.props.account }).then((res) => {
        this.setState({
          isOwner: res
        })
      })
    })

    setTimeout(() => {
      this.validateAdmin()
    }, 2000)
  }

  redirect(path) {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      })

      return <Redirect push to={path} />
    } else {
      return ''
    }
  }

  render() {
    return (
        <Box align='center' responsive={true} pad='medium'>
        { this.state.isOwner
          ? <Box>
              <Label align='center'>Token:</Label>
              <Tabs responsive={true} justify='center' onActive={() => { this.setState({ redirect: true }) }}>
                <Tab title='Admin'>
                  { this.redirect('/admin') }
                </Tab>
                <Tab title='Ownership'>
                  { this.redirect('/transfer-ownership') }
                </Tab>
              </Tabs>
            </Box>
          : <Box>
            <Tabs responsive={true} justify='center' onActive={() => { this.setState({ redirect: true }) }}>
              <Tab title='Home'>
                { this.redirect('/') }
              </Tab>
              <Tab title='Send'>
                { this.redirect('/transfer') }
              </Tab>
              <Tab title='My account'>
                { this.redirect('/account') }
              </Tab>
            </Tabs>
          </Box>
        }
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    Token: state.Token,
    account: state.account
  }
}

export default connect(mapStateToProps)(Header)
