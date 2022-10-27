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
        return(
            <div  className = "relative-main shadow-2-ns h3 br4 ma3 ml3 bg-white">
                <div id = "vertical-center" className="horizontal-align"> 
                    <h3 className="v-mid pl3" >Job</h3>
                    <p className="v-mid pl1" >@ company</p>
                    <a className="v-mid pl4" href = "https://soap2day.sh/TczoyOToiOTZ8fDUwLjk4LjEwMS4xOTJ8fDE2NjIxNDk5MjEiOw.html" target="_blank" rel="noopener noreferrer">
                        Link <img  className="pl1" src = {Link} alt="logo" width="12rem" height="12rem"/>
                    </a>
                    <p className="v-mid pl4" >Last modified: </p>
                    <p className="v-mid pl2">2022-10-26</p>
                </div >
            </div>
        )
    }
}

export default Card; 