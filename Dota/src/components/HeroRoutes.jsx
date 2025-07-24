import {Routes, Route} from "react-router-dom";
import HeroList from "./HeroList";
import HeroLayout from "./HeroLayout";
import RecommandItems from "./RecommandItems";
import MatchUp from "./MatchUp";
import Matches from "./Matches";


export default function HeroRoutes()
{

    return(
        <Routes>
            <Route index element={<HeroList />} />
            <Route path = "/hero/:id" element={<HeroLayout/>}>
                <Route index element={<RecommandItems/>}/>
                <Route path="items" element={<RecommandItems/>} />
                <Route path="matchup" element={<MatchUp />} />
                <Route path="matches" element={<Matches />} />
            </Route>
        </Routes>
    )
}