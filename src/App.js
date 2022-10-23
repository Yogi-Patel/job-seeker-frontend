import React, { Component } from "react";
import Signin from './components/Signin/Signin';
import ParticlesBg from 'particles-bg'
import './App.css';

const api_url = 'http://localhost:3000';

const initialState = {
  route : 'signin',
  username: '',
  signedIn: false
};
// route in state can hold the following values: 'signin', 'home', 'register', 'demo'
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = initialState;
  }


  changeState = async (field, value) =>
  {
    /* 
    Function receives the state variable and its new value in an object
    The object is passed to the setState method to change the state of the application
    */

    switch(field)
    {
      case 'username': await this.setState({username: value});
      break;

      case 'signedIn': await this.setState({signedIn: value}); 
      break;

      case 'route': await this.setState({route: value}); 
      break;

      default: break;
    }

    
  }

  render()
  {
    console.log(this.state)
    return (
      <div className="App ">
        
        {this.state.route === 'signin' && <Signin api_url = {api_url} changeState = {this.changeState} />}
        
        <ParticlesBg type="circle" bg={true} />
      </div>
    );
  }
  
  
  
}

export default App;
