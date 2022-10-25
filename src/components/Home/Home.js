import React, {Component} from "react";
import logo from '../../Logo.png'

class Home extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: this.props.AppState.username,
            signedIn: this.props.AppState.signedIn,
            filter: "all",
            searchField: ''
        }
    }

    changeFilter = (event) =>
    {
        
        
        this.setState({filter: event.target.id})
        
    }

    onSearchChange = (event) =>
    {
        this.setState({searchField: event.target.value})
    }

    render()
    {
        
        return (
            <article id = 'home_container' className=" center br2 mb5  shadow-5-ns ">
                <div className = 'home-div fl w-75 pa2 lightest-gray'>
                    <div id = "main" className = "shadow-2-ns h-10 br4 ma3 ml3 ">
                        <div id = "vertical-center" className="horizontal-align">
                            <img  src = {logo} alt="logo" /> 
                            <h2  className="v-mid pl3" >Application Tracker</h2> 
                            <button class="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma2 tc br-pill pa2 ml3 button_without_style">
                                <svg class="dib h2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" 
                                stroke-miterlimit="1.414">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" fill-rule="nonzero"/></svg>
                                <span class="f5 ml3 pr2">Add job</span>
                            </button>
                            
                        </div>
                        
                    </div>

                </div>
                <div className = " home-div shadow-left fl w-25 pa0 ">
                    <div id = "main" className ="home-color " ><h1 id = "bottom" className="f3 f2-m f1-l fw2 black-90 mt0 tl ml3 mb2">Menu</h1></div>
                    <div className="pa0 mt4">
                        <h1 className="f4 b db mb2 ml3">Search:</h1>
                        <input id="name" className="input-reset ba b--black-90 pa2 mb0 db w-90 center" type="text" onChange={this.onSearchChange} 
                        placeholder="Search by company name"></input>
                        <h1 className="f4 b db mb2 ml3">Filter by:</h1>
                        <ul className="list pl0 ma0 center">
                            <li id = "all" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'all' && "home-color"}`} onClick = {this.changeFilter} >All</li>
                            <li id = "applied" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'applied' && "home-color"}`} onClick = {this.changeFilter}>Applied</li>
                            <li id = "wishlist" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'wishlist' && "home-color"}`} onClick = {this.changeFilter}>Wishlist</li>
                            <li id = "interview" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'interview' && "home-color"}`} onClick = {this.changeFilter}>Interview</li>
                            <li id = "offer" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'offer' && "home-color"}`} onClick = {this.changeFilter}>Offer</li>
                            <li id = "rejection" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'rejection' && "home-color"}`} onClick = {this.changeFilter}>Rejection</li>
                            <li id = "inactive" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'inactive' && "home-color"}`} onClick = {this.changeFilter}>Inactive</li>
                        </ul>
                    </div>
                </div>

            </article>
            
            
        )
    }
}

export default Home;