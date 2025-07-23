import HeroLoreStats from "./HeroLoreStats"
import { useParams } from "react-router-dom"

export default function HeroInfo()
{
    const { id } = useParams()

    return(
        <>
            <HeroLoreStats
                id={id} 
            />
        </>
    )

}