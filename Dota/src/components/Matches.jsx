import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Matches()
{   
    const {id} = useParams()

    const matchRef = useRef()

    const [matches, setMatches] = useState([])

    useEffect(function()
    {
        // Getting matches related to hero of id
        async function getMatches()
        {
            try 
            {
                const response = await fetch(`https://api.opendota.com/api/heroes/${id}/matches`)

                if (response.ok)
                {
                    const data = await response.json()

                    setMatches(data)
                }
            }

            catch(error)
            {
                console.log(error)
            }
        }

        getMatches()
    }, [])

    // For smooth scrolling
    useEffect(function()
    {
        if (matchRef.current)
        {
            matchRef.current.scrollIntoView({behavior : "smooth"})
        }
    }, [matches])

    if (matches.length === 0)
    {
        return null
    }

    const matchComponents = matches.map(function(match)
    {
        // Calculating date
        const date = new Date(match.start_time * 1000)

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return(
            <div className="match" key={match.match_id}>
                <div>
                    <h5>Match Id</h5>
                    <span className="id">{match.match_id}</span>
                </div>
                <div>
                    <h5>Account Id</h5>
                    <span className="id">{match.account_id}</span>
                </div>
                {
                    (match.radiant_win && match.radiant) ||(!match.radiant_win && !match.radiant)?
                    <div className="win">
                        <h5>Result</h5>
                        <span>Won Match</span>
                    </div>:
                    <div className="lose">
                        <h5>Result</h5>
                        <span>Lost Match</span>
                    </div>
                }
                <div>
                    <h5>Date</h5>
                    <span>{`${day}/${month}/${year}`}</span>
                </div>
                <div>
                    <h5>League</h5>
                    <span>{match.league_name}</span>
                </div>
                <div>
                    <h5>K</h5>
                    <span className="kill">{match.kills}</span>
                </div>
                <div>
                    <h5>D</h5>
                    <span className="death">{match.deaths}</span>
                </div>
                <div>
                    <h5>A</h5>
                    <span className="assist">{match.assists}</span>
                </div>
            </div>
        )
    })

    return(
        <div className="matches" ref={matchRef}>
            {matchComponents}
        </div>
    )
}