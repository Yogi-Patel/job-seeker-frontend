import React from "react";
import CardList from "./CardList";
class MainDiv extends React.Component
{
    
    constructor(props)
    {
        super(props)
        this.state = {
        
        }
        
    }

    onUpdateClicked = async () =>
    {
        
        const title = document.getElementById('title').value
        const company = document.getElementById('company').value
        const link = document.getElementById('link').value
        const notes = document.getElementById('note').value
        const category = document.getElementById('category').value

        const updated_information = { title, company, link, notes, category, active: true}
        /* console.log(updated_information)
        console.log(this.props.updateData.id) */
        if(!(link.includes('https') || link.includes('http') || link.length === 0))
        {
            document.getElementById('error').innerText = 'Please enter a valid link'
            return 
        }

        const update = async() => 
        {
            await fetch(`${this.props.api_url}/update`, {
                method: "put",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.props.user_data.username,
                    signedIn: true,
                    job_id: this.props.updateData.id,
                    updated_information: updated_information,
                    
                })
            }).then();
        }
        const refresh_database = async () => 
        {
            await fetch(`${this.props.api_url}/refresh`, {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.props.user_data.username,
                    signedIn: true
                })
            }).then(() => {})
        }

        await update()
        await refresh_database()

        await this.props.refresh_page() 
    }


    onDeleteClicked = async () =>
    {
        const confirmation = window.confirm("You are going to delete this item")
        if(confirmation)
        {
            await fetch(`${this.props.api_url}/delete`, {
                method: "delete",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.props.user_data.username,
                    signedIn: true,
                    job_id: this.props.updateData.id
                })
            }).then(() => {})

            await this.props.refresh_page()
        }
    }


    onAddClicked = async () =>
    {
        const title = document.getElementById('title').value
        const company = document.getElementById('company').value
        const link = document.getElementById('link').value
        const notes = document.getElementById('note').value
        const category = document.getElementById('category').value

        if (company === '')
        {
            document.getElementById('error').innerText = "Company name cannot be empty"
            return 
        }
        if(title ==='')
        {
            document.getElementById('error').innerText = "Title name cannot be empty"
            return
        }
        if(!(link.includes("http") || link.includes('https') || link.length === 0))
        {
            document.getElementById('error').innerText = "Please enter a valid link"
            return
        }

        const new_information = {title, company, link, notes, category}

        await fetch(`${this.props.api_url}/add`, {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.props.user_data.username,
                signedIn: true,
                job: new_information,
                
            })
        }).then(data => { });

        await this.props.refresh_page()
    }


    render()
    {
        if(this.props.task === 'list')
        {
            return(
                <div className="scrollable no-scrollbar h-80 mt5">
                        {/* Start of singular div for displaying a list */}
                        { this.props.filteredData.length !== 0 &&  <CardList filteredData={this.props.filteredData} cardClicked = {this.props.cardClicked} />}
                        
                        
                        {/* End of singular div for displaying a list */}
                        
                    </div>
            )
        }
        else if(this.props.task === 'update')
        {

            
            const updateData = this.props.updateData
            return(
                <div className="centered-div h-80 mt1" onClick={() => { this.props.changeTask('list')}}>
                    <div id = 'container' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center v-mid " onClick = {(event) => { event.stopPropagation()}}>
                        <main className="pa4 black-80">
                        
                          <form className="measure center" onSubmit={(e) => {e.preventDefault();}}>
                            <fieldset id="Update" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">View/Update</legend>
                                <div style={{textAlign: "right"}}>last modified: {updateData.last_modified.split("T")[0]}</div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f5" htmlFor="title">Title</label>
                                    <input className="pa2 input-reset ba w-100" type="text" name="title"  id="title"  defaultValue = {updateData.title}/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="company">Company</label>
                                    <input className=" pa2 input-reset ba w-100" type="text" name="company"  id="company"  defaultValue = {updateData.company}/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="link">Link</label>
                                    <input className=" pa2 input-reset ba w-100" type="text" name="link"  id="link"  defaultValue = {updateData.link}/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="note">Note</label>
                                    <input className="pa2 input-reset ba w-100" type="text" name="note"  id="note"  defaultValue = {updateData.notes}/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="category">Category</label>
                                    <select className="pa2 input-reset ba w-100" type="text" name="category"  id="category"  defaultValue={updateData.category}>
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
                                <input className="b ph3 pv2 input-reset ba b--black grow pointer f5 dib" type="submit" value="Update" onClick={this.onUpdateClicked}/>
                            </div>
                            <div className="lh-copy mt3">
                                <button className="f5 link dim black db button_without_style underline" onClick={() => { this.props.changeTask('list') }} >Cancel</button>
                                <button className=" red f5 link dim black db button_without_style underline" onClick={() => {this.onDeleteClicked()}} >Delete</button>
                            </div>
                          </form>
                        </main>
                    </div>
                </div>
            )
        }
        else if(this.props.task === 'add')
        {
            return(
                <div className="centered-div h-80 mt1" onClick={() => { this.props.changeTask('list')}}>
                    <div id = 'container' className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center v-mid " onClick = {(event) => { event.stopPropagation()}}>
                        <main className="pa4 black-80"> 
                          <form className="measure center" onSubmit={(e) => {e.preventDefault();}}>
                            <fieldset id="Add" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Add Job</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f5" htmlFor="title">Title</label>
                                    <input className="pa2 input-reset ba w-100" type="text" name="title"  id="title"  />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="company">Company</label>
                                    <input className=" pa2 input-reset ba w-100" type="text" name="company"  id="company"  />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="link">Link</label>
                                    <input className=" pa2 input-reset ba w-100" type="text" name="link"  id="link"  />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="note">Note</label>
                                    <input className="pa2 input-reset ba w-100" type="text" name="note"  id="note"  />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="category">Category</label>
                                    <select className="pa2 input-reset ba w-100" type="text" name="category"  id="category"  defaultValue= "applied">
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
                                <input className="b ph3 pv2 input-reset ba b--black grow pointer f5 dib" type="submit" value="Add" onClick={this.onAddClicked}/>
                            </div>
                            <div className="lh-copy mt3">
                                <button className="f5 link dim black db button_without_style underline" onClick={() => { this.props.changeTask('list') }} >Cancel</button>
                            </div>
                          </form>
                        </main>
                    </div>
                </div>
            )
        }
    }
}

export default MainDiv;