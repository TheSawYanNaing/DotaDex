import lores from "../helpers/hero_lore.json"
import heroes from "../helpers/heroes.json"
import heroAbilities from "../helpers/hero_abilities.json"
import allAbilities from "../helpers/abilities.json"

// attribute icons
import agility from "./../assets/agility.webp"
import intelligence from "./../assets/intel.webp"
import strength from "./../assets/strengthh.webp"
import universal from "./../assets/universal.webp"

// icons
import armor from "./../assets/armor.png"
import attackRange from "./../assets/attack_range.png"
import attackRate from "./../assets/attact_rate.png"
import damage from "./../assets/damage.png"
import magicDef from "./../assets/magic_def.png"
import moveSpeed from "./../assets/movespeed.png"
import projectile from "./../assets/projectile.png"
import turnRate from "./../assets/turn_rate.png"
import vision from "./../assets/vision.png"

import Ability from "./Ability"

export default function HeroInfo({id})
{

    // Getting abilities for the hero
    const selfAbilities = [...heroAbilities[heroes[id].name].abilities]

    // Getting innate ability 
    const innateAbility = selfAbilities.filter(function(ability)
    {
        return allAbilities[ability].is_innate
    })

    // Remove innate ability from the list of abilities
    selfAbilities.splice(selfAbilities.indexOf(innateAbility[0]), 1)

    // Creating ability components
    const selfAbilitiesComponents = selfAbilities.map(function(ability, index)
    {
        return(
            <Ability 
                key = {index}
                ability = {allAbilities[ability]}
            />
        )
    })
   

    let imageUrl;
    let damageMin;
    let damageMax;
    // Calculating image url for attribute icons
    if (heroes[id].primary_attr === "agi") 
    {
        imageUrl = agility;
        damageMin = heroes[id].base_attack_min + heroes[id].base_agi;
        damageMax = heroes[id].base_attack_max + heroes[id].base_agi;
    }

    else if (heroes[id].primary_attr === "int")
    {
        imageUrl = intelligence;
        damageMin = heroes[id].base_attack_min + heroes[id].base_int;
        damageMax = heroes[id].base_attack_max + heroes[id].base_int;
    }

    else if (heroes[id].primary_attr === "str")
    {
        imageUrl = strength;
        damageMin = heroes[id].base_attack_min + heroes[id].base_str;
        damageMax = heroes[id].base_attack_max + heroes[id].base_str;
    }

    else 
    {
        imageUrl = universal;
        damageMin = heroes[id].base_attack_min + Math.floor((heroes[id].base_str + heroes[id].base_agi + heroes[id].base_int) * 0.45);
        damageMax = heroes[id].base_attack_max + Math.floor((heroes[id].base_str + heroes[id].base_agi + heroes[id].base_int) * 0.45);
    }

    return(
        <>
            <div className="hero-lore-stats">
                <div className="hero-name-type">
                    <h2>{heroes[id].localized_name}</h2>
                    <img src={imageUrl} alt={heroes[id].primary_attr} />
                </div>
                <p className="hero-lore">
                    {lores[heroes[id].name.replace("npc_dota_hero_", "")] || "No lore available for this hero."}
                </p>
                <div className="hero-stats">
                    <div className="hero-info">
                        <h3>Attributes</h3>
                        <div>
                            <div className="hp-mp">
                                <img src={`https://cdn.steamstatic.com${heroes[id].img}`} alt={heroes[id].localized_name} />
                                <p className="health">
                                    <span>{heroes[id].base_health + heroes[id].base_str * 22}</span>
                                    <span className="regen">+{(heroes[id].base_health_regen + heroes[id].base_str * 0.1).toFixed(1)}</span>
                                </p>
                                <p className="mana">
                                    <span>{heroes[id].base_mana + heroes[id].base_int * 12}</span>
                                    <span className="regen">+{(heroes[id].base_mana_regen + heroes[id].base_int * 0.05).toFixed(1)}</span>
                                </p>
                            </div>
                            <div className="attributes">
                                <div>
                                    <img src={agility} alt="Agility" />
                                    <p>{heroes[id].base_agi} <span className="gain">+{heroes[id].agi_gain}</span></p>
                                </div>
                                <div>
                                    <img src={strength} alt="strength" />
                                    <p>{heroes[id].base_str} <span className="gain">+{heroes[id].str_gain}</span></p>
                                </div>
                                <div>
                                    <img src={intelligence} alt="Intelligence" />
                                    <p>{heroes[id].base_int} <span className="gain">+{heroes[id].int_gain}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="stats-info">
                        <h3>Stats</h3>
                        <div>
                            <div>
                                <h4>ATTACK</h4>
                                <div className="stats">
                                    <img src={damage} alt="Damage" />
                                    <p>{damageMin} - {damageMax}</p>
                                </div>
                                <div className="stats">
                                    <img src={attackRange} alt="Attack Range" />
                                    <p>{heroes[id].attack_range}</p>
                                </div>
                                <div className="stats">
                                    <img src={attackRate} alt="Attack Rate" />
                                    <p>{heroes[id].attack_rate}</p>
                                </div>
                                <div className="stats">
                                    <img src={projectile} alt="Projectile Speed" />
                                    <p>{heroes[id].projectile_speed}</p>
                                </div>
                            </div>
                            <div>
                                <h4>DEFENSE</h4>
                                <div className="stats">
                                    <img src={armor} alt="Armor" />
                                    <p>{heroes[id].base_armor + Number((heroes[id].base_agi / 6).toFixed(1))}</p>
                                </div>
                                <div className="stats">
                                    <img src={magicDef} alt="Magic Resistance" />
                                    <p>{heroes[id].base_mr}%</p>  
                                </div>
                            </div>
                            <div>
                                <h4>MOBILITY</h4>
                                <div className="stats">
                                    <img src={moveSpeed} alt="Movement Speed" />
                                    <p>{heroes[id].move_speed}</p>
                                </div>
                                <div className="stats">
                                    <img src={turnRate} alt="Turn Rate" />
                                    <p>{heroes[id].turn_rate || 0.6}</p>
                                </div>
                                <div className="stats">
                                    <img src={vision} alt="Vision Range" />
                                    <p>{heroes[id].day_vision} / {heroes[id].night_vision}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Abilities</h2>
            <div className="abilities-container">
               
               <Ability 
                    ability = {allAbilities[innateAbility[0]]}
               />
               {selfAbilitiesComponents}
            </div>
        </>
        
    )
}