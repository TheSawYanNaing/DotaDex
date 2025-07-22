import ItemList from "./ItemList";

import {Routes, Route} from "react-router-dom";

export default function ItemRoutes()
{
    return(
        <Routes>
            <Route index element={<ItemList />} />
        </Routes>
    )
}