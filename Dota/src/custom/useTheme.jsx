import { useEffect, useState } from "react";

export default function useTheme(key, intialValue)
{
    const [theme, setTheme] = useState(function()
    {
        return localStorage.getItem(key) || intialValue
    })


    // Function for toggling theme
    function toggle()
    {
        setTheme(function(prevTheme)
        {
            if (prevTheme === "light")
            {
                return "dark"
            }

            return "light"
        })
    }

    // Toggle class of body and storing theme into local storage
    useEffect(function()
    {
        document.body.className = theme 
        localStorage.setItem(key, theme)
    }, [theme])

    return [theme, toggle]
}