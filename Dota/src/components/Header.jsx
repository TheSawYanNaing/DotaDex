import useTheme from "../custom/useTheme";
import { Link } from "react-router-dom";

// Icons
import { SiDota2 } from "react-icons/si";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

export default function Header()
{
    const [theme, toggle] = useTheme("theme", "dark")

    return(
        <header className="header">
            <div className="navigation">
                <div className="banner">
                    <SiDota2 />
                    <h1>DotaDex</h1>
                </div>
                <nav>
                    <ul>
                        <li><Link to="heroes">Heroes</Link></li>
                        <li><Link to="items">Items</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="theme" onClick={toggle}>
                {
                    theme === "light"? <CiDark /> : <CiLight />
                }
            </div>
        </header>
    )
}