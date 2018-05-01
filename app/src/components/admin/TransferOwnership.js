import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toast from 'grommet/components/Toast'
import Heading from 'grommet/components/Heading'
import Box from 'grommet/components/Box'
import TextInput from 'grommet/components/TextInput'
import Button from 'grommet/components/Button'
import Label  from 'grommet/components/Label'
import Form  from 'grommet/components/Form'

class TransferOwnership extends Component {
  constructor(props) {
    super(props)

    this.state = {
      to: '',
      success: '',
      failure: '',
      modalOpen: false,
      loading: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { target } = event
    const { name } = target

    this.setState({
      [name]: target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.to != null) {
      this.setState({
        loading: true
      })

      this.props.Token.deployed().then(async (token) => {
        const _gas = await token.transferOwnership.estimateGas(this.state.to)
          .catch((err) => {
            console.log('Gas estimation', err)
          })

        token.transferOwnership(this.state.to, { from: this.props.account, gas: _gas, gasPrice: this.props.gasPrice })
          .then((receipt) => {
            // console.log(receipt)
            this.setState({
              modalOpen: true,
              success: `Success! Your tx: ${receipt.tx}`,
              loading: false
            })
        })
        .catch((err) => {
          // console.log(err)
          this.setState({
            modalOpen: true,
            failure: `Error occurred: ${err.message}`,
            loading: false
          })
        })
      })
    } else {
      this.setState({
        modalOpen: true,
        failure: `If you want to transfer ownership, you need to fill the form.`
      })
    }
  }

  render() {
    return (
      <Box align='center'>
        <Heading>Transfer Ownership</Heading>
        <Box align='center'>
          <Form onSubmit={this.handleSubmit}>
            <Box pad='small' align='center'>
              <Label labelFor="toInput">Who is the new owner:</Label>
            </Box>
            <Box pad='small' align='center'>
              <TextInput id='toInput'
                type='text'
                name='to'
                onDOMChange={this.handleChange}
                value={this.state.to}
                placeHolder='New owner address' />
            </Box>
            <Box pad='small' align='center'>
              { this.state.loading ? "Loading..." :
                <Button primary={true} type='submit' label='Do it' />
              }
            </Box>
          </Form>
        </Box>
          { this.state.modalOpen && <Toast
            status={this.state.success ? 'ok' : 'critical' }>
              <p>{ this.state.success ? this.state.success : null }</p>
              <p>{ this.state.failure ? this.state.failure : null }</p>
            </Toast>
          }
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    Token: state.Token,
    account: state.account,
    web3: state.web3,
    gasPrice: state.gasPrice
  }
}

export default connect(mapStateToProps)(TransferOwnership)
