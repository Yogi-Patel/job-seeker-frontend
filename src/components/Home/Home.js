import React, {Component} from "react";
import logo from '../../Logo.png';
import MainDiv from "./MainDiv";
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
            task: 'list',
            data: [],
            updateData: {}
        }
        
    }


    changeTask = async (value) =>
    {
        await this.setState({task: value})
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
                    
                    { this.state.task === 'list' 
                    &&  
                                <div className="scrollable no-scrollbar h-80 mt5">
                                    {/* Start of singular div for displaying a list */}
                                    { filteredData.length !== 0 &&  <CardList filteredData={filteredData} cardClicked = {this.cardClicked} />}
                                    {/* End of singular div for displaying a list */}
                                </div>
        
                    }    


                    { this.state.task === 'update' 
                    && 
                                <div className="centered-div h-80 mt1" onClick={() => { this.changeTask('list')}}>
                                    <div id = 'container' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center v-mid " onClick = {(event) => { event.stopPropagation()}}>
                                        <main className="pa4 black-80">
                                        <div style={{textAlign: "right"}}>last modified: {this.state.updateData.last_modified.split("T")[0]}</div>
                                          <form className="measure center" onSubmit={(e) => {e.preventDefault();}}>
                                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">

                                                <div className="mt3">
                                                    <label className="db fw6 lh-copy f5" htmlFor="title">Title</label>
                                                    <input className="pa2 input-reset ba w-100" type="text" name="title"  id="title"  defaultValue = {this.state.updateData.title}/>
                                                </div>
                                                <div className="mv3">
                                                    <label className="db fw6 lh-copy f5" htmlFor="company">Company</label>
                                                    <input className=" pa2 input-reset ba w-100" type="text" name="company"  id="company"  defaultValue = {this.state.updateData.company}/>
                                                </div>
                                                <div className="mv3">
                                                    <label className="db fw6 lh-copy f5" htmlFor="link">Link</label>
                                                    <input className=" pa2 input-reset ba w-100" type="text" name="link"  id="link"  defaultValue = {this.state.updateData.link}/>
                                                </div>
                                                <div className="mv3">
                                                    <label className="db fw6 lh-copy f5" htmlFor="note">Note</label>
                                                    <input className="pa2 input-reset ba w-100" type="text" name="note"  id="note"  defaultValue = {this.state.updateData.note}/>
                                                </div>
                                                <div className="mv3">
                                                    <label className="db fw6 lh-copy f5" htmlFor="category">Category</label>
                                                    <select className="pa2 input-reset ba w-100" type="text" name="category"  id="category"  defaultValue={this.state.updateData.category}>
                                                        <option value = "applied" >Applied</option>
                                                        <option value = "wishlist">Wishlist</option>
                                                        <option value = "interview">Interview</option>
                                                        <option value = "offer">Offer</option>
                                                        <option value = "rejected">Rejected</option>
                                                    </select>  
                                                </div>
                                                <div>
                                                    <p id = "error" className='red f6'></p>
                                                </div>
                                            </fieldset>
                                            <div className="">
                                                <input className="b ph3 pv2 input-reset ba b--black grow pointer f5 dib" type="submit" value="Update" onClick={() => {alert("Update button")}}/>
                                            </div>
                                            <div className="lh-copy mt3">
                                                <button className="f5 link dim black db button_without_style underline" onClick={() => { this.changeTask('list') }} >Cancel</button>
                                                <button className=" red f5 link dim black db button_without_style underline" onClick={() => {alert("Need to make the delete functionality")}} >Delete</button>
                                            </div>
                                          </form>
                                        </main>
                                    </div>
                                </div>
                    }
                    { this.state.task === 'add' && < MainDiv task = {'add'}/>}
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