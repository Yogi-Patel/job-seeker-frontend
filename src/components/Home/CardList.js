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
                    <Card Key = {dataItem.id} dataItem={dataItem} />
                )
                
            })
        )
    }
}

export default CardList;