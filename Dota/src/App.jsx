import Header from "./components/Header";
import HeroRoutes from "./components/HeroRoutes";
import ItemRoutes from "./components/ItemRoutes";
import { Routes, Route } from "react-router-dom";

import ItemContextProvider from "./components/ItemContextProvider";
import HeroContextProvider from "./components/HeroContextProvider";

export default function App()
{
    return(
        <>
            <Header />
            <ItemContextProvider>
                <HeroContextProvider>
                    <Routes>
                        <Route path="/*" element={<HeroRoutes />} />
                        <Route path="/items/*" element={<ItemRoutes />} />
                    </Routes>
                </HeroContextProvider>
            </ItemContextProvider>
        </>
    )
}