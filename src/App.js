import React, { Component } from 'react';
import './App.css';
import fire from './fire';
import Home from './Home';
import Login from './Login';
import Test from './Test2'
import Signin from './Signin'
import Checkout from './Checkout'
import Plaid from './plaid'

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
      signup: false
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
     <div>{this.state.user  ? ( <Home/>) 
        : 
        (<Test />)}
      </div>
    )
}
}

 export default App;