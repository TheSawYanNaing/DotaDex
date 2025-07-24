import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import itemIds from "./../helpers/item_ids.json"

import Item from "./Item";

export default function RecommandItems() {

    // Function for getting item
    function getItem(item)
    {
        return(
            <Item 
                key = {item}
                name = {itemIds[item]}
            />
        )
    }
    const {id} = useParams()

    const itemRef = useRef()
    
    // Setting staet for recommand items
    const [recommandItems, setRecommandItems] = useState({})


    useEffect(function()
    {
        async function getRecommandItems()
        {
            try 
            {
                const response = await fetch(`https://api.opendota.com/api/heroes/${id}/itemPopularity`)

                if (response.ok)
                {
                    const data = await response.json()

                    setRecommandItems(data)
                }
            }

            catch(error)
            {
                console.log("Error")
            }
        }

        getRecommandItems()
    }, [])

    useEffect(function()
    {
        if (itemRef.current)
        {
            itemRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recommandItems])

    if (Object.keys(recommandItems).length === 0)
    {
        return null
    }

    const startItems = Object.keys(recommandItems.start_game_items)
    const earlyItems = Object.keys(recommandItems.early_game_items)
    const midItems = Object.keys(recommandItems.mid_game_items)
    const lateItems = Object.keys(recommandItems.late_game_items)

    // Getting early game item components
    const startItemsComponents = startItems.map(getItem)

    // Getting early game item compo
    const earlyItemsComponents = earlyItems.map(getItem)

    // Getting mid game item compo
    const midItemsComponents = midItems.map(getItem)

    // Getting late game item compo
    const lateItemsComponents = lateItems.map(getItem)

    return(
        <div className="recommand-items" ref={itemRef}>
            <div className="start">
                <h3>Start Items</h3>
                <div className="start-container">
                    {startItemsComponents}
                </div>
            </div>
            <div className="early">
                <h3>Early Items</h3>
                <div className="early-container">
                    {earlyItemsComponents}
                </div>
            </div>
            <div className="mid">
                <h3>Mid Items</h3>
                <div className="mid-container">
                    {midItemsComponents}
                </div>
            </div>
            <div className="late">
                <h3>Late Items</h3>
                <div className="late-container">
                    {lateItemsComponents}
                </div>
            </div>
        </div>
    )
    
}    