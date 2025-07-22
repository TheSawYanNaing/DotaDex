export default function ItemCard({id, img, dname, cost})
{
    return (
        <div className="hero-card">
            <img src={`https://cdn.steamstatic.com${img}`} alt={dname} />
            <h2>{dname}</h2>
            <p>Cost: {cost}</p>
        </div>
    );
}