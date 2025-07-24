import { createContext, useContext } from "react";

import heroes from "./../helpers/heroes.json"

const heroContext = createContext()

export default function HeroContextProvider({children})
{
    return(
        <heroContext.Provider value = {heroes}>
            {children}
        </heroContext.Provider>
    )
}

export function useHeroContext()
{
    return useContext(heroContext)
}