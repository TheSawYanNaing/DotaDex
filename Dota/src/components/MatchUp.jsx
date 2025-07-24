import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHeroContext } from "./HeroContextProvider";
import { Fragment } from "react";

export default function MatchUp()
{   
    function handleClick(id)
    {
        navigate(`/hero/${id}`)
    }
    const {id} = useParams()

    const [matchup, setMatchup] = useState([])

    const heroes = useHeroContext()

    const navigate = useNavigate()

    useState(function()
    {
        // Fetching data for hero of id
        async function getMatchup()
        {
            try 
            {
                const response = await fetch(`https://api.opendota.com/api/heroes/${id}/matchups`)

                if (response.ok)
                {
                    const data = await response.json()

                    setMatchup(data)
                }
            }

            catch(error)
            {
                console.log("Error")
            }
        }

        getMatchup()
    }, [])

    if (matchup.length === 0)
    {
        return;
    }

    const matchUpList = matchup.map(function(match)
    {
        return(

            <Fragment key={match.hero_id}>
                <div className="matchup-banner">
                    <img src={`https://cdn.steamstatic.com${heroes[match.hero_id].img}`} alt={heroes[match.hero_id].localized_name} />
                    <span className="hero-name" onClick={() => handleClick(match.hero_id)}>{heroes[match.hero_id].localized_name}</span>
                </div>
                <p>{match.games_played}</p>
                <p>{match.wins}</p>
                <p className="winrate">{(match.wins / match.games_played * 100).toFixed(2)}%</p>
            </Fragment>
            
        )
    })

    return(
        <div className="matchup-container">
            <h4>Hero</h4>
            <h4>Total Games</h4>
            <h4>Wins</h4>
            <h4>Win Rate</h4>
            {matchUpList}
        </div>
    )
}