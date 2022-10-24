import React, {Component} from "react";

class HomeBanner extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {

        }
    }


    render()
    {
        return (
            <article id = 'container' className="mw7 center ph3 ph5-ns tc br2 pv5  mb5">
                <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
                This is the landing page for Job Seeker
                </h1>
                <h2 className="fw2 f4 lh-copy mt0 mb3">
                This application should help you keep track of your Job applications!!
                </h2>
                <p className="fw1 f5 mt0 mb3">
                Sign up to start using!
                </p>
                <div>
                    <button className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3 " onClick = {() => {this.props.changeState('route', 'register')}}>
                    Sign Up
                    </button>
                    <button className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib button_without_style" onClick = { () => {this.props.changeState('route', 'signin')}}>
                    Sign In
                    </button>

                </div>
                <button style = {{paddingTop: "20px"}}className="center f5 link dim black db button_without_style underline" onClick={() => {this.props.demo()}} >I just want to demo</button>
            </article>

        );
    }
}

export default HomeBanner;