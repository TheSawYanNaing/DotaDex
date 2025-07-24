import itemIds from "./../helpers/item_ids.json"
import Item from "./Item"

import { useSearchParams } from "react-router-dom";
import { useItemContext } from "./ItemContextProvider";

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
    
    const items = useItemContext()
    // Getting the keys from items
    const itemList = Object.values(itemIds);

    // Removing recipe from item list
    const removeRecipe = itemList.filter(function(item)
    {
        return !item.startsWith("recipe")
    })

    // Filtering items based on search param
    const filterItemList = removeRecipe.filter(function(item)
    {

        if (items[item] && items[item].dname)
        {
            return items[item].dname.toLowerCase().includes(decodeURIComponent(q.trim().toLocaleLowerCase()))
        }

        
    })

    // Getting list of item components
    const itemComponents = filterItemList.map(function(item)
    {
        return (
            <Item 
                key = {item}
                name = {item}
            />
        )
    })    

    return(
        <div className="items">
            <h2>Items</h2>
            <input 
                className="search"
                type = "search"
                placeholder = "Search for an item" 
                value={q}
                name = "q"
                onChange = {(e) => handleChange(e)}
            />
            <div className="item-list">
                {itemComponents}
            </div>
        </div>
        
    )
}