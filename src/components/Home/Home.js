import React, {Component} from "react";
import logo from '../../Logo.png';
import CardList from "./CardList";
class Home extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: this.props.AppState.username,
            signedIn: this.props.AppState.signedIn,
            filter: "all",
            searchField: '',
            add: false,
            update: false,
            data: []
        }
        
    }

    componentDidMount()
    {
        this.fetchData('all')
    }
    fetchData = async (filter) =>
    {
        await fetch(`${this.props.api_url}/jobs`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: (this.state.username),
              signedIn: (this.state.signedIn),
              filter: this.state.filter 
            })
        })
        .then(data => {
            return data.json()
        })
        .then(result =>
        {
            
            this.setState({data: result.result})
        })
    }

    changeFilter = async (event) =>
    {
        
        
        await this.setState({filter: event.target.id})
        this.fetchData(event.target.id)
        
    }

    onSearchChange = (event) =>
    {
        this.setState({searchField: event.target.value})
    }


    

    render()
    {
        /* console.log("STATE")
        console.log(this.state) */
        let filteredData = []
        if (this.state.data.length !== 0)
        {
            /* console.log(this.state.data) */
             filteredData = this.state.data.filter(single =>{
                return single.company.toLowerCase().includes(this.state.searchField.toLowerCase());
              })
        }
        /* console.log("filteredData")
        console.log(filteredData) */
        
        return (
            <article id = 'home_container' className=" center br2 mb5  shadow-5-ns ">
                
                
                {/* Start of left side home div */}
                <div className = 'home-div fl w-75 pa2 lightest-gray'>
                    <div id = "main" className = "shadow-2-ns h-10 br4 ma3 ml3 bg-white">
                        <div id = "vertical-center" className="horizontal-align">
                            <img  src = {logo} alt="logo" /> 
                            <h2  className="v-mid pl3" >Application Tracker</h2> 
                            <button className="no-underline near-white bg-animate home-color hover-bg-light-green  inline-flex items-center ma2 tc br-pill pa2 ml3 button_without_style">
                                <svg className="dib h2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" 
                                strokeMiterlimit="1.414">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" fillRule="nonzero"/></svg>
                                <span className="f5 ml3 pr2">Add job</span>
                            </button>
                        </div >
                    </div>

                    {/* Start of Scrollable list of all the jobs that have been added */}
                    <div className="scrollable no-scrollbar h-80 mt5">
                        {/* Start of singular div for displaying a list */}
                        { filteredData.length !== 0 &&  <CardList filteredData={filteredData}/>}
                        {/* <div  className = "relative-main shadow-2-ns h3 br4 ma3 ml3 bg-white">
                            <div id = "vertical-center" className="horizontal-align"> 
                                <h3 className="v-mid pl3" >Job</h3>
                                <p className="v-mid pl1" >@ company</p>
                                <a className="v-mid pl4" href = "https://soap2day.sh/TczoyOToiOTZ8fDUwLjk4LjEwMS4xOTJ8fDE2NjIxNDk5MjEiOw.html" target="_blank" rel="noopener noreferrer">
                                    Link <img  className="pl1" src = {Link} alt="logo" width="12rem" height="12rem"/>
                                </a>
                                <p className="v-mid pl4" >Last modified: </p>
                                <p className="v-mid pl2">2022-10-26</p>
                            </div >
                        </div> */}
                        
                        {/* End of singular div for displaying a list */}
                        
                    </div>
                    {/* End of Scrollable list of all the jobs that have been added */}

                </div>
                {/* End of left side home div */}


                {/* Start of sidebar on the right of the home div */}
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
                            <li id = "rejected" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'rejected' && "home-color"}`} onClick = {this.changeFilter}>Rejected</li>
                            <li id = "inactive" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'inactive' && "home-color"}`} onClick = {this.changeFilter}>Inactive</li>
                        </ul>
                    </div>
                </div>
                {/* End of sidebar on the right of the home div */}

            </article>
            
            
        )
    }
}

export default Home;