import React, { Component } from 'react'
import PlaidLink from 'react-plaid-link'

class App extends Component {
  handleOnSuccess(token, metadata) {
    console.log(token)
  }
  handleOnExit() {
    // handle the case when your user exits Link
  }
  render() {
    return (
      <PlaidLink
        clientName="Your app name"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="PLAID_PUBLIC_KEY"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}>
        Open Link and connect your bank!
      </PlaidLink>
    )
  }
}
export default App