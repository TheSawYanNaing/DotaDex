import HeroInfo from "./HeroInfo"
import { useParams } from "react-router-dom"
import { NavLink, Outlet } from "react-router-dom"

export default function HeroLayout()
{
    const { id } = useParams()
    

    return(
        <>
            <HeroInfo
                id={id} 
            />
            <nav className="hero-navigation">
                <ul>
                    <li>
                        <NavLink to={`/hero/${id}/items`}>Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/hero/${id}/matches`}>Matches</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )

}