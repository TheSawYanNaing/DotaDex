import { PiCoinsLight } from "react-icons/pi";
import { useItemContext } from "./ItemContextProvider";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import {nanoid} from "nanoid"
import { useEffect } from "react";

export default function Item({name, opens, setOpens})
{

    const {refs, floatingStyles} = useFloating({
        opens,
        onOpenChange : setOpens,
        middleware: [offset(8), flip(), shift()],
        placement: "top",
        whileElementsMounted : autoUpdate
    })


    const items = useItemContext()

    const item = items[name]

    // update tooltip on scroll to maintain position
    useEffect(function()
    {   
        // Close all
        function close()
        {
            setOpens(function(prev)
            {
                const updated = {}

                for (const key in prev)
                {
                    updated[key] = false
                }

                return updated
            })
        }
        window.addEventListener("click", close)

        return () => window.removeEventListener("click", close)
    })

    if (!item)
    {
        return null
    }

    return(
        <div className="item">
            <img 
                src={`https://cdn.steamstatic.com${item.img}`} 
                alt={item.dname}
                ref = {refs.setReference}
                onClick={function(e)
                {
                    e.stopPropagation()
                    setOpens(function(prev)
                    {
                        const updated = {}
                        for (const key in prev)
                        {
                            updated[key] = key === name
                        }

                        return updated
                    })
                }
                }
                className={open? "open" : ""}
            />
            {opens[name] && 
            <div className="item-info" ref={refs.setFloating} style={floatingStyles}>
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
            }
        </div>
    )
}