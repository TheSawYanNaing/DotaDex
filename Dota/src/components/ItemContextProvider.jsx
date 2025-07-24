import { createContext, useContext } from "react";
import items from "./../helpers/items.json"

const itemContext = createContext()

export default function ItemContextProvider({children})
{
    return(
        <itemContext.Provider value={items}>
            {children}
        </itemContext.Provider>
    )
}

export function useItemContext()
{
    return useContext(itemContext)
}