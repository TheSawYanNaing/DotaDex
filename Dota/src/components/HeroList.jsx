import { useEffect, useState } from "react";
import HeroCard from "./HeroCard";
import { useSearchParams } from "react-router-dom";
export default function HeroList()
{
    const [heroes, setHeroes] = useState([])

    // For filtering heroes
    const [searchParams, setSearchParams] = useSearchParams({type : "", q : ""})

    const type = searchParams.get("type")
    const q = searchParams.get("q")

    // Function for handling search input
    function handleChange(event)
    {
        setSearchParams(function(prevParams)
        {
            prevParams.set("q", event.target.value)
            return prevParams
        }, {replace: true} )
    }
    
    // Function for handling type button click
    function handleClick(heroType)
    {   
        if (type === heroType)
        {
            setSearchParams(function(prevParams)
            {
                prevParams.set("type", "")
                return prevParams
            }, {replace: true} )
        }

        else 
        {
            setSearchParams(function(prevParams)
            {
                prevParams.set("type", heroType)
                return prevParams
            }, {replace: true} )
        }
        
    }

    // filtering heroes based on type and search query
    const filteredHeroes = heroes.filter(function(hero)
    {
        if (type)
        {
            return hero.localized_name.toLowerCase().includes(q.toLowerCase()) && hero.primary_attr === type
        }

        else 
        {
            return hero.localized_name.toLowerCase().includes(q.toLowerCase())
        }
    })

    // Getting the hero list
    const heroLists = filteredHeroes.map(function(hero)
    {
        return(
            <HeroCard 
                key={hero.id}
                {...hero}
            />
        )
    })

    // Fetch heroes data from an API or local file
    useEffect(function()
    {
        console.log("Getting executed")
        async function fetchHeroes()
        {
            try
            {
                const response = await fetch("https://api.opendota.com/api/heroes");

                if (response.ok)
                {
                    const data = await response.json();
                    setHeroes(data);
                }
                
            }
            catch (error)
            {
                
                console.error("Failed to fetch heroes:", error);
            }
        }

        fetchHeroes()
    },[])

    // adding active class to the button based on type
    useEffect(function()
    {
        const buttons = document.querySelectorAll(".buttons button");
        buttons.forEach(function(button)
        {
            if (button.value === type)
            {
                button.classList.add("active")
            }

            else 
            {
                button.classList.remove("active")
            }
        })
    }, [searchParams])

    return(
        <div className="heroes">
            
            <input 
                className="search"
                placeholder="Search heroes"
                type = "search"
                name = "q"
                value = {q}
                onChange = {(event) => handleChange(event)}
            />
            <div className="buttons">
                <button value="agi" onClick={(e) => handleClick(e.target.value)}>Agility</button>
                <button value="str" onClick={(e) => handleClick(e.target.value)}>Strength</button>
                <button value="int" onClick={(e) => handleClick(e.target.value)}>Intelligence</button>
                <button value="all" onClick={(e) => handleClick(e.target.value)}>Universal</button>
            </div>
            <div className="hero-list">
                {heroLists}
            </div>
        </div>
    )
    
}