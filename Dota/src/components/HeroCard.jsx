import heroes from "./../helpers/heroes.json"
import agility from "./../assets/agility.webp"
import intelligence from "./../assets/intel.webp"
import strength from "./../assets/strengthh.webp"
import universal from "./../assets/universal.webp"

import { useNavigate } from "react-router-dom"

export default function HeroCard({id,name, localized_name, primary_attr, attack_type, roles})
{   
    const navigate = useNavigate();

    let imgUrl;
    if (primary_attr === "agi")
    {
        imgUrl = agility;
    }

    else if (primary_attr === "int")
    {
        imgUrl = intelligence;
    }

    else if (primary_attr === "str")
    {
        imgUrl = strength;
    }

    else 
    {
        imgUrl = universal
    }

    return(
        <div className="hero-card" onClick={() => navigate(`/hero/${id}`, {state: {name}})}>
            <img src={`https://cdn.steamstatic.com${heroes[id].img}`} alt={localized_name} />
            <div className="hero-info">
                <h2>{localized_name}</h2>
                <p>{attack_type} {roles[0]}</p>
            </div>
            <img className="attr-icon" src={imgUrl} alt={primary_attr} />
        </div>
    )
}