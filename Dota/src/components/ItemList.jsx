import items from "./../helpers/items.json"
import ItemCard from "./ItemCard";

import { useSearchParams } from "react-router-dom";

export default function ItemList()
{

    // Function for handling changes
    function handleChange(event)
    {
        setSearchParams(function(prevParams)
        {
            prevParams.set("q", event.target.value)
            return prevParams
        }, {replace: true} )
    }

    const [searchParams, setSearchParams] = useSearchParams({q : ""});

    // Getting search parameter from URL
    const q = searchParams.get("q");
   
    // Getting the keys from items
    const itemList = Object.keys(items);

    // Filtering items based on search param
    const filterItemList = itemList.filter(function(item)
    {
        if (items[item].dname)
        {
            return items[item].dname.toLowerCase().includes(q.toLowerCase())
        }
    })

    // Getting list of item components
    const itemComponents = filterItemList.map(function(item)
    {
        return (
            <ItemCard
                key = {items[item].id}
                dname = {items[item].dname}
                img = {items[item].img}
                cost = {items[item].cost}
            />
        )
    })    

    return(
        <div className="items">
            <input 
                className="search"
                type = "search"
                placeholder = "Search for an item" 
                value={q}
                name = "q"
                onChange = {(e) => handleChange(e)}
            />
            <div className="hero-list">
                {itemComponents}
            </div>
        </div>
        
    )
}