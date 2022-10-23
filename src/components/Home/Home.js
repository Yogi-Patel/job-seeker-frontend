import React, {Component} from "react";

class Home extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: this.props.AppState.username,
            signedIn: this.props.AppState.signedIn
        }
    }

    render()
    {
        return (
            <h1>
                {`Hello, ${this.state.username}! You are ${this.state.signedIn && "signed in"}`}
            </h1>
            
        )
    }
}

export default Home;