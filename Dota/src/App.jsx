import Header from "./components/Header";
import HeroRoutes from "./components/HeroRoutes";
import { Routes, Route } from "react-router-dom";

export default function App()
{
    return(
        <>
            <Header />
            <Routes>
                <Route path="/*" element={<HeroRoutes />} />
            </Routes>
        </>
    )
}