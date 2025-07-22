import {Routes, Route} from "react-router-dom";
import HeroList from "./HeroList";
import HeroInfo from "./HeroInfo";

export default function HeroRoutes()
{
    return(
        <Routes>
            <Route index element={<HeroList />} />
            <Route path="hero/:id" element={<HeroInfo />} />
            {/* Additional routes can be added here */}
        </Routes>
    )
}