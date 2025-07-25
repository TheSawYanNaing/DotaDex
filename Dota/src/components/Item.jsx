import { PiCoinsLight } from "react-icons/pi";
import { useItemContext } from "./ItemContextProvider";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react";
import {nanoid} from "nanoid"
import { useEffect, useState } from "react";

export default function Item({name})
{

    const [open, setOpen] = useState(false)
    const {refs, floatingStyles} = useFloating({
        open,
        onOpenChange : setOpen,
        middleware: [offset(8), flip(), shift()],
        placement: "top",
        whileElementsMounted : autoUpdate
    })


    const items = useItemContext()

    const item = items[name]

    // update tooltip on scroll to maintain position
    useEffect(function()
    {   
        function closeToolTip()
        {
            setOpen(false)
        }

        if (!open)
        {
            return 
        }

        window.addEventListener("scroll",closeToolTip)

        return window.removeEventListener("scroll", closeToolTip)
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
                onClick={() => setOpen(!open)}
                className={open? "open" : ""}
            />
            {open && 
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