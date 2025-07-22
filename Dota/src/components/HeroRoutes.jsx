import {Routes, Route} from "react-router-dom";
import HeroList from "./HeroList";

export default function HeroRoutes()
{
    return(
        <Routes>
            <Route index element={<HeroList />} />
            {/* Additional routes can be added here */}
        </Routes>
    )
}