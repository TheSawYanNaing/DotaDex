import { PiCoinsLight } from "react-icons/pi";
import { useItemContext } from "./ItemContextProvider";

import {nanoid} from "nanoid"

export default function Item({name})
{
    const items = useItemContext()

    const item = items[name]

    console.log(item.components)

    return(
        <div className="item">
            <img src={`https://cdn.steamstatic.com${item.img}`} alt={item.dname}/>
            <div className="item-info">
                <h3>{item.dname}</h3>
                <p className="cost">
                    <PiCoinsLight
                        color="yellow"
                    />
                    <span>{item.cost}</span>
                </p>
                {
                    item.abilities && 
                    item.abilities.map(function(ability)
                    {
                        return(
                            <section key={nanoid()}>
                                <h4>{ability.type}</h4>
                                <p>
                                        <span className="effect-name">{ability.title}: </span>
                                        {ability.description}
                                </p>
                            </section>
                        )
                    })
                }

                {
                    item.attrib && 
                    item.attrib.map(function(attribute)
                    {
                        return(
                            <p key={nanoid()}>
                                {attribute.key.replaceAll("_", " ")}:&nbsp;
                                <span>
                                    {attribute.display? attribute.display.replaceAll("_", " ").replaceAll("{value}", attribute.value) : attribute.value}
                                </span>
                            </p>
                        )
                    })
                }
                {
                    item.mc && 
                    <p>Mana Cost: <span>{item.mc}</span></p>
                }
                {
                    item.hc &&
                    <p>Health Cost: <span>{item.hc}</span></p>
                }
                {item.components && <h6>Item Components</h6>}
                {
                    item.components && 
                    item.components.map(function(component)
                    {
                        if (component)
                        {
                            return(
                                <img key={nanoid()} src={`https://cdn.steamstatic.com${items[component].img}`} alt={component} />
                            )
                        }
                        
                    })
                }
                <p className="lore">{item.lore}</p>
            </div>
        </div>
    )
}