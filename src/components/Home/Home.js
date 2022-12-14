import React, {Component} from "react";
import logo from '../../Logo.png';
import MainDiv from "./MainDiv";
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
            task: 'list',
            data: [],
            updateData: {},
            counts: {}
        }
        
    }


    changeTask = async (value) =>
    {
        await this.setState({task: value})
    }


    componentDidMount()
    {
        this.fetchData('all')
        this.fetchCounts()
        
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


    fetchCounts = async() =>
    {
        let count = {}
        await fetch(`${this.props.api_url}/stats`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: (this.state.username),
              signedIn: (this.state.signedIn), 
            })
        })
        .then(data => {
            return data.json()
        })
        .then(async (data) => { count = data.counts})

        await this.setState({counts: count})
    }


    changeFilter = async (id) =>
    {     
        await this.setState({filter: id})
        this.fetchData(id)
        
    }


    onSearchChange = (event) =>
    {
        this.setState({searchField: event.target.value})
    }

    cardClicked = async (notLink, id) =>
    {
        /* Function to know which car was clicked on when the  */
        // notLink ?console.log(id): console.log("Link")  


        if (notLink)
        {
            /* It is very important to have #1 before #2 
            This is because when a card is clicked, its data is needs to be fetched before changing the state to update. 
            Otherwise, the state of the application will change and it will try to access the information of the card that was clicked and it won't work  */

            // await setState #1 
            await this.setState({updateData: this.state.data.filter(single =>{
                return single.id === id
              })[0]})

            // await setState #2 
            await this.setState({task: 'update'})
             
        }
        
    }

    refresh_page = async() =>
    {
        /* await this.setState({filter: 'all'}) */
        await this.fetchData('all')
        await this.fetchCounts()        
        await this.changeTask('list')
        
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

        const user_data = {username: this.state.username, signedIn: this.state.signedIn}
        
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
                            <button className="no-underline near-white bg-animate home-color hover-bg-light-green  inline-flex items-center ma2 tc br-pill pa2 ml3 button_without_style" 
                            onClick ={ () => {this.changeTask('add')}} >
                                <svg className="dib h2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" 
                                strokeMiterlimit="1.414">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" fillRule="nonzero"/></svg>
                                <span className="f5 ml3 pr2">Add job</span>
                            </button>
                        </div >
                    </div>



                    {/* Scrollable list of jobs */}                
                    
                    { this.state.task === 'list' && < MainDiv task = {'list'} filteredData = {filteredData} cardClicked = {this.cardClicked}  /> }
                    { this.state.task === 'update' && < MainDiv task = {'update'} updateData = {this.state.updateData} changeTask = {this.changeTask} api_url = {this.props.api_url} user_data = {user_data} refresh_page = {this.refresh_page}/> }
                    { this.state.task === 'add' && < MainDiv task = {'add'} api_url = {this.props.api_url} user_data = {user_data} changeTask = {this.changeTask} refresh_page = {this.refresh_page}/>}
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
                            ${this.state.filter === 'all' && "home-color"}`} onClick = {() => this.changeFilter('all')} >
                                All <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('all')} >{this.state.counts.all}</div>
                            </li>
                            <li id = "applied" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'applied' && "home-color"}`} onClick = {() => this.changeFilter('applied')}>
                                Applied <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('applied')} >{this.state.counts.applied}</div>
                            </li>
                            <li id = "wishlist" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'wishlist' && "home-color"}`} onClick = {() => this.changeFilter('wishlist')}>
                                Wishlist <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('wishlist')} >{this.state.counts.wishlist}</div>
                            </li>
                            <li id = "interview" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'interview' && "home-color"}`} onClick = {() => this.changeFilter('interview')}>
                                Interview <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('interview')} >{this.state.counts.interview}</div>
                            </li>
                            <li id = "offer" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'offer' && "home-color"}`} onClick = {() => this.changeFilter('offer')}>
                                Offer <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('offer')} >{this.state.counts.offer}</div>
                            </li>
                            <li id = "rejected" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'rejected' && "home-color"}`} onClick = {() => this.changeFilter('rejected')}>
                                Rejected <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('rejected')} >{this.state.counts.rejected}</div>
                            </li>
                            <li id = "inactive" className = {`lh-copy pl5 pv2 ba bl-0 bt-0 br-0 b--dotted b--black-30 pointer 
                            ${this.state.filter === 'inactive' && "home-color"}`} onClick = {() => this.changeFilter('inactive')}>
                                Inactive <div className="f6 br3 ml2 ph3 pv0 ma0 dib white bg-black" onClick = {() => this.changeFilter('inactive')} >{this.state.counts.inactive}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* End of sidebar on the right of the home div */}

            </article>
            
            
        )
    }
}

export default Home;