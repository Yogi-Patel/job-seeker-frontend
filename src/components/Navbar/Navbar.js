import React, {Component} from "react";

class Navbar extends Component 
{
    constructor(props)
    {
        super(props);   
        this.state = {}
    }

    render()
    {
        let route = this.props.route === 'home' || this.props.signedIn ?'home': 'start'
        
        return (
            <header className="bg-black-70 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            <nav className="f6 fw6 ttu tracked">
                <button className="link dim white dib mr3 f5 button_without_style" title="Home" onClick={()=> { this.props.changeState('route', route)}}>Home</button>
                <button className="link dim white dib mr3 f5 button_without_style" title="About" onClick={() => {this.props.changeState('route', 'about')}}>About</button>
                
            </nav>
            </header>
        )
    }
}

export default Navbar;