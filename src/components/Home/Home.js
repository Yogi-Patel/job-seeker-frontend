import React, {Component} from "react";


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
                <div className = 'home-div fl w-75 pa2'>

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