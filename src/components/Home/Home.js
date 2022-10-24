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
            <h1 className="center">This is the heading</h1>
            
            
        )
    }
}

export default Home;