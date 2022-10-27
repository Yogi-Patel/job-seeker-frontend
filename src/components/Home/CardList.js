import React from "react";
import Card from "./Card";

class CardList extends React.Component

{
    constructor(props)
    {
        super(props)
        this.state = {}
    }

    render()
    {
        
        return (
            this.props.filteredData.map(dataItem => {
                
                return (
                    <Card key = {dataItem.id} dataItem={dataItem} cardClicked = {this.props.cardClicked}/>
                )
                
            })
        )
    }
}

export default CardList;