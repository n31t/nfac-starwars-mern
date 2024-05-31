import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlanet, getResident, getStarship } from './starwarsService';
import load from '../assets/images/load.png';
import residentimg from '../assets/images/residents/default.png';
import './PersonDetail.css';


const PersonDetail = () => {
    const { id } = useParams()
    const [person, setPerson] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [starships, setStarships] = useState([])

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const personResponse = await getResident(id);
                const personData = personResponse.data;
                personData.homeworldId = personData.homeworld.split('/')[5];
                personData.homeworldName = await getPlanet(personData.homeworldId).then((response) => response.data.name);
                setPerson(personData);

                const starshipsData = await Promise.all(
                    personData.starships.map(async (starshipUrl) => {
                        const starshipId = starshipUrl.split('/')[5];
                        const starshipResponse = await getStarship(starshipId);
                        const starshipData = starshipResponse.data;
                        starshipData.id = starshipId;
                        return starshipData;
                    })
                );
                setStarships(starshipsData);
                setLoaded(true);
                }
                catch (error) {
                    console.error('Error fetching person details:', error);
                }
            };
            fetchPerson();
        }, [id]);

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
                    <div className="person-info">
                        <img
                            className="person"
                            src={`${process.env.PUBLIC_URL}/images/residents/${id}.png `}
                            onError={(e) => { e.target.src = residentimg; }}
                            alt={person.name}
                        />
                    </div>
                    <div className="text">
                        <h1>{person.name}</h1>
                        <p><strong>Height:</strong> {person.height} cm</p>
                        <p><strong>Mass:</strong> {person.mass} kg</p>
                        <p><strong>Hair Color:</strong> {person.hair_color}</p>
                        <p><strong>Skin Color:</strong> {person.skin_color}</p>
                        <p><strong>Eye Color:</strong> {person.eye_color}</p>
                        <p><strong>Birth Year:</strong> {person.birth_year}</p>
                        <p><strong>Gender:</strong> {person.gender}</p>
                        <p><strong>Homeworld:</strong> <Link to={`/planets/${person.homeworldId}`}>{person.homeworldName}</Link></p>      
                    </div>  
                </div>
                <div className="medium-container">
                    <div className="text">
                        <h2>Starships</h2>
                        <ul>
                            {starships.length > 0 ? (
                                starships.map((starship) => (
                                    <li key={starship.id}>
                                        <Link to={`/starships/${starship.id}`}>{starship.name}</Link>
                                    </li>
                                ))
                            ) : (
                                <p>There are no starships for this person.</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
}

export default PersonDetail;
