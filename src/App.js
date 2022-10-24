import React, { Component } from "react";
import Signin from "./components/Signin/Signin";
import HomeBanner from "./components/HomeBanner/HomeBanner";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About"
import ParticlesBg from "particles-bg";


const api_url = "http://localhost:3000";

const initialState = {
    route: "start",
    username: "",
    signedIn: false,
};
// route in state can hold the following values: 'start', 'signin', 'register', 'home'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    changeState = async (field, value) => 
    {
        /* 
        Function receives the state variable and its new value in an object
        The object is passed to the setState method to change the state of the application
        */

        switch (field) {
          case "username":
            await this.setState({ username: value });
            break;

          case "signedIn":
            await this.setState({ signedIn: value });
            break;

          case "route":
            await this.setState({ route: value });
            break;

          default:
            break;
        }
    };
    
    demo = () =>
    {
        this.changeState('route', "home")
        this.changeState('username', 'demo')
        this.changeState('signedIn', true)
    }

    render() 
    {
        const AppStateForHome = {
            username: this.state.username,
            signedIn: this.state.signedIn
        }
        console.log(this.state)
        
        return (
            <>
                <Navbar route = {this.state.route} changeState={this.changeState} signedIn ={this.state.signedIn} />
                <div className={ ['signin', 'register', 'start', 'about'].includes(this.state.route)? "App centered-div": "App" } >
                    { this.state.route === 'start' && <HomeBanner changeState={this.changeState} demo={this.demo}/> }
                    { this.state.route === 'about' && <About /> }
                    { this.state.route === "signin" && <Signin api_url={api_url} changeState={this.changeState} demo={this.demo}/> }
                    { this.state.route === 'register' && <Register api_url={api_url} changeState={this.changeState} demo={this.demo}/> }
                    { this.state.route === 'home' && <Home AppState = {AppStateForHome} />}
                    <ParticlesBg type="circle" bg={true} />
                </div>
            </>
        );
    }
}

export default App;
