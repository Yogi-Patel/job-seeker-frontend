import React from "react";
import Link from './Link-symbol.png';

class Card extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    render()
    {
        const dataItem = this.props.dataItem

        return(
            <div  className = "relative-main shadow-2-ns h3 br4 ma3 ml3 bg-white pointer" onClick={ (event ) => { this.props.cardClicked(true, dataItem.id);}}>      
                <div id = "vertical-center" className=" horizontal-align"> 
                    <h3 className="v-mid pl3 no-wrapping " >{dataItem.title}</h3>
                    <p className="v-mid pl1 no-wrapping" >@ {dataItem.company}</p>
                    <a className="v-mid pl3 no-wrapping" href = {dataItem.link} target="_blank" rel="noopener noreferrer" onClick={(event) =>{this.props.cardClicked(false,  dataItem.id); event.stopPropagation()}}>
                        Link <img  className="pl1" src = {Link} alt="logo" width="12rem" height="12rem"/>
                    </a>
                    <p className="b v-mid pl3 no-wrapping " >Status: </p>
                    <p className="v-mid pl2 no-wrapping">{dataItem.category.charAt(0).toUpperCase() + dataItem.category.slice(1)} </p>
                    <p className="b v-mid pl3 no-wrapping " >Last modified: </p>
                    <p className="v-mid pl2 no-wrapping">{dataItem.last_modified.split("T")[0]} </p>                
                </div>                
            </div>
        )
    }
}

export default Card; 

/* <div  className = "relative-main shadow-2-ns h3 br4 ma3 ml3 bg-white">
                            <div id = "vertical-center" className="horizontal-align"> 
                                <h3 className="v-mid pl3" >Job</h3>
                                <p className="v-mid pl1" >@ company</p>
                                <a className="v-mid pl4" href = "https://soap2day.sh/TczoyOToiOTZ8fDUwLjk4LjEwMS4xOTJ8fDE2NjIxNDk5MjEiOw.html" target="_blank" rel="noopener noreferrer">
                                    Link <img  className="pl1" src = {Link} alt="logo" width="12rem" height="12rem"/>
                                </a>
                                <p className="v-mid pl4" >Last modified: </p>
                                <p className="v-mid pl2">2022-10-26</p>
                            </div >
                        </div> */




/* <div  className = "relative-main shadow-2-ns h3 br4 ma3 ml3 bg-white">
                
                <div id = "vertical-center" className=" horizontal-align"> 
                    <h3 className="v-mid pl3 no-wrapping " >{dataItem.title}</h3>
                    <p className="v-mid pl1 no-wrapping" >@ {dataItem.company}</p>
                    <a className="v-mid pl3 no-wrapping" href = {dataItem.link} target="_blank" rel="noopener noreferrer">
                        Link <img  className="pl1" src = {Link} alt="logo" width="12rem" height="12rem"/>
                    </a>
                    <p className="v-mid pl4 no-wrapping " >Last modified: </p>
                    <p className="v-mid pl2 no-wrapping">{dataItem.last_modified} </p>
                
                </div>
                
            </div> */