import innate from "./../assets/inate.png"

export default function Ability({ability})
{   

   if (!ability || ability.behavior === "Hidden")
   {
        return null;
   }

   return(
        <div className="ability">
            {ability.is_innate && <img className="innate-icon" src={innate} alt="Innate Ability" />}
            {!ability.is_innate && <img className="ability-icon" src={`https://cdn.dota2.com${ability.img}`} alt={ability.dname} />}
            <div className="ability-info">
                {ability.is_innate && <h3>Innate Ability</h3>}
                <h3>{ability.dname}</h3>
                <p>Behavior: <span>{Array.isArray(ability.behavior)? ability.behavior.join(" /") : ability.behavior}</span></p>
                {ability.bkbpierce && <p>Pierce Spell Immunity: <span>{ability.bkbpierce}</span></p>}
                {ability.dmg_type && <p>Damage Type: <span>{ability.dmg_type}</span></p>}
                <p className="description">{ability.desc}</p>
                {
                    ability.attrib.map(function(attribute, index)
                    {
                        return(
                            <p key={index}>
                                {attribute.header} <span>{Array.isArray(attribute.value)? attribute.value.join("\\ ") : attribute.value}</span>
                            </p>
                        )
                    })
                }
                <p>Mana Cost: <span>{Array.isArray(ability.mc)? ability.mc.join("\\ ") : ability.mc}</span></p>
                <p>CoolDown: <span>{Array.isArray(ability.cd)? ability.cd.join("\\ ") : ability.cd}</span></p>
                {ability.lore && <p className="lore">{ability.lore}</p>}
            </div>
        </div>
   )
}