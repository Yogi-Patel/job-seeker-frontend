import React, { Component } from 'react';
import './Signin.css';
class Signin extends Component 
{
    /* 
    Signin class is sent the following props: 
      - api_url //Sent from App.js so that the url can be changed from one place
      - changeState //This function should be able to change the state of the entire application 
    */
    constructor(props)
    {
        super(props)
        this.state = {
            signInUsername: '',
            signInPassword: ''
        }
    }

    onUsernameChange = (event) => 
    {
      this.setState({signInUsername: event.target.value})     
    }
  
    onPasswordChange = (event) => 
    {
      this.setState({signInPassword: event.target.value})   
    }
  
    onSubmitSignIn = () => 
    {
      fetch(`${this.props.api_url}/signin`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.signInUsername,
          password: this.state.signInPassword
        })
      })
      .then(data => {
        return data.json()
      })
      .then(data => {
        
        if(data.success)
        {
          this.props.changeState('route', "home")
          this.props.changeState('username', data.username)
          this.props.changeState('signedIn', true)
        }
        else
        {
          document.getElementById('username').value = ''
          document.getElementById('password').value = ''
          document.getElementById('error').innerText = "Credentials are invalid. Try again."
        }
      })
      
    }

    formPreventDefault = (e) => { 
      e.preventDefault();
    }


    render() 
    {

        return (
          <div id = 'container' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center v-mid ">
            <main className="pa4 black-80">
              <form className="measure center" onSubmit={this.formPreventDefault}>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                  <div className="mt3">
                    <label className="db fw6 lh-copy f4" htmlFor="username">Username</label>
                    <input className="pa2 input-reset ba w-100" type="text" name="username"  id="username" onChange={this.onUsernameChange}/>
                  </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                  </div>
                  <div>
                    <p id = "error" className='red f6'></p>
                  </div>
                </fieldset>
                <div className="">
                <input className="b ph3 pv2 input-reset ba b--black grow pointer f5 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
                </div>
                <div className="lh-copy mt3">
                  <button className="f5 link dim black db button_without_style underline" onClick={() => {alert('You need to add functionality for registering')}}>Register</button>
                  <button className="f5 link dim black db button_without_style underline" onClick={() => {alert('You need to add functionality for demos ')}}>I just want to demo</button>
                </div>
              </form>
            </main>
            
          </div>
         
        );
      }
}


export default Signin;