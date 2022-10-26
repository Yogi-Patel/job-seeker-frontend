import React from "react";
import Card from "./Card";

const CardList = (props) => 
{
    console.log(props.filteredData)
    return (
        props.filteredData.map(dataItem => {
            return (
                <Card Key = {dataItem.id} dataItem={dataItem} />
            )
            
        })
        
    )
} 


export default CardList;