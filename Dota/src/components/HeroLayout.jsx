import HeroInfo from "./HeroInfo"
import { useParams, useLocation } from "react-router-dom"
import { NavLink, Outlet } from "react-router-dom"

export default function HeroLayout()
{
    const { id } = useParams()
    const { pathname } = useLocation()

    return(
        <>
            <HeroInfo
                id={id} 
            />
            <nav className="hero-navigation">
                <ul>
                    <li>
                        <NavLink className={() => 
                            {
                                if (pathname == `/hero/${id}` || pathname ==`/hero/${id}/items`)
                                {
                                    return "active"
                                }
                            }
                        } end to={`/hero/${id}/items`}>Items</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/hero/${id}/matchup`}>Match Up</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )

}