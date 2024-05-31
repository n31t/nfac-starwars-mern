import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlanet, getPlanetListCounter } from './starwarsService';
import load from '../assets/images/load.png';
import planetimg from '../assets/images/default.png';
import './Planets.css';

const Planets = () => {
    const { id } = useParams()
    const [planets, setPlanets] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const counterResponse = await getPlanetListCounter();
                const counterData = counterResponse.data;
                const realCounter = counterData.count;
                setCounter(realCounter);

                const fetchPlanetData = async (planetId) => {
                    const planetResponse = await getPlanet(planetId);
                    const planetData = planetResponse.data;
                    planetData.id = planetId;
                    return planetData;
                };

                const planetsData = await Promise.all(
                    Array.from({ length: realCounter }, (_, i) => fetchPlanetData(i + 1))
                );
                // const planetsData = await Promise.all(
                //     Array.from({ length: realCounter }, (_, i) => {
                //         const planetId = i + 1;
                //         console.log(planetId);
                //         console.log(realCounter);
                //         const planetResponse = await getPlanet(planetId);
                //         const planetData = planetResponse.data;
                //         planetData.id = planetId;
                //         return planetData;
                //     })
                // );
                setPlanets(planetsData);
                setLoaded(true);
            }
            catch (error) {
                console.error('Error fetching planets:', error);
            }

        }

        

        fetchPlanets();
    } , [id]);

    if(!loaded) {
        return (
            <div className="load">
                <img src={load} alt="Loading" />
            </div>
        );
    }

    return (
        <div className="pplanet-container">
            {planets.map((planet) => (
            <ul key={planet.id}>
                    <li>
                        <div className="ssingle-planet">
                            <img
                                className="pplanet"
                                src={`${process.env.PUBLIC_URL}/images/${planet.id}.png`}
                                onError={(e) => { e.target.src = planetimg; }}
                                alt={planet.name}
                            />
                            <Link to={`/planets/${planet.id}`} className="pplanet-link" >{planet.name} </Link>
                        </div>
                    </li>
            </ul>
            ))}
        </div>
    );
}

export default Planets;