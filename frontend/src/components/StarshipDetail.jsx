import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getResident, getStarship } from './starwarsService';
import load from '../assets/images/load.png';
import staeshipimg from '../assets/images/starships/default.png';
import './StarshipDetail.css';

const StarshipDetail = () => {
    const { id } = useParams()
    const [starship, setStarship] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [pilots, setPilots] = useState([])
    useEffect(()=> {
        const fetchStarship = async () => {
            try{
                const starshipResponse = await getStarship(id);
                const starshipData = starshipResponse.data;
                setStarship(starshipData);
                const pilotsData = await Promise.all(
                    starshipData.pilots.map(async (pilotUrl) => {
                        const pilotId = pilotUrl.split('/')[5];
                        const pilotResponse = await getResident(pilotId);
                        const pilotData = pilotResponse.data;
                        pilotData.id = pilotId;
                        return pilotData;
                    })
                );
                setPilots(pilotsData);
                setLoaded(true);
            }
            catch (error) {
                console.error('Error fetching starship details:', error);
            }
        }
        fetchStarship();
    } , [id]);

    if(!loaded) {
        return (
            <div className="load">
                <img src={load} alt="Loading" />
            </div>
        );
    }

    return (
        <div>
            <div className="big-container">
                <div className="starship-info">
                    <img
                        className="starship"
                        src={`${process.env.PUBLIC_URL}/images/starships/${id}.png`}
                        onError={(e) => { e.target.src = staeshipimg; }}
                        alt={starship.name}
                    />
                </div>
                <div className="text">
                    <h1>{starship.name}</h1>
                    <p><strong>Model:</strong> {starship.model}</p>
                    <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                    <p><strong>Cost in credits:</strong> {starship.cost_in_credits}</p>
                    <p><strong>Length:</strong> {starship.length}</p>
                    <p><strong>Max atmosphering speed:</strong> {starship.max_atmosphering_speed}</p>
                    <p><strong>Crew:</strong> {starship.crew}</p>
                    <p><strong>Passengers:</strong> {starship.passengers}</p>
                    <p><strong>Cargo capacity:</strong> {starship.cargo_capacity}</p>
                    <p><strong>Consumables:</strong> {starship.consumables}</p>
                    <p><strong>Hyperdrive rating:</strong> {starship.hyperdrive_rating}</p>
                    <p><strong>MGLT:</strong> {starship.MGLT}</p>
                    <p><strong>Starship class:</strong> {starship.starship_class}</p>
                </div>
            </div>
                <div className="medium-container">
                    <div className="text">
                    <h2>Pilots</h2>
                        <ul>
                            {pilots.length > 0 ? (
                            pilots.map((resident) => (
                                <li key={resident.id}>
                                <Link to={`/people/${resident.id}`}>{resident.name}</Link>
                                </li>
                            ))
                            ) : (
                            <p>There are no pilots on this planet.</p>
                            )}
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default StarshipDetail