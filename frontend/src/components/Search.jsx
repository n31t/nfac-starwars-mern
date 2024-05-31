import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchPeople, searchPlanets, searchStarships } from './starwarsService';
import load from '../assets/images/load.png';
import planetimg from '../assets/images/default.png';
import personimg from '../assets/images/residents/default.png';
import starshipimg from '../assets/images/starships/default.png';
import './Search.css';

const Search = () => {
    const [planets , setPlanets] = useState([])
    const [people , setPeople] = useState([])
    const [starships , setStarships] = useState([])
    const [query, setQuery] = useState('')
    const [loaded, setLoaded] = useState(true)

    useEffect(() => {
        if (query !== '') {
            const fetchAll = async () => {
                try {
                    setLoaded(false);
                    const response = await searchPlanets(query);
                    const planetsData = response.data.results;
                    setPlanets(planetsData);
                    
                    const response2 = await searchPeople(query);
                    const peopleData = response2.data.results;
                    setPeople(peopleData);

                    const response3 = await searchStarships(query);
                    const starshipsData = response3.data.results;
                    setStarships(starshipsData);
                    setLoaded(true);

                }
                catch (error) {
                    console.error('Error fetching search results:', error);
                }
            }
            fetchAll();
        }
    } , [query]);

    return (
        <div>
            <div className="input-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="search-results">
                <h2>Planets</h2>
                <div className="search-container">
                    {planets.map((planet) => (
                        <Link key={planet.name} to={`/planets/${planet.url.split('/')[5]}`} class="a-link">
                            <div className="single-planet">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${planet.url.split('/')[5]}.png`}
                                    onError={(e) => { e.target.src = planetimg; }}
                                    alt={planet.name}
                                />
                                <p>{planet.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <h2>People</h2>
                <div className="search-container">
                    {people.map((person) => (
                        <Link key={person.name} to={`/people/${person.url.split('/')[5]}`} class="a-link">
                            <div className="single-planet">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/residents/${person.url.split('/')[5]}.png`}
                                    onError={(e) => { e.target.src = personimg; }}
                                    alt={person.name}
                                />
                                <p>{person.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <h2>Starships</h2>
                <div className="search-container">
                    {starships.map((starship) => (
                        <Link key={starship.name} to={`/starships/${starship.url.split('/')[5]}`} class="a-link">
                            <div className="single-planet">
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/starships/${starship.url.split('/')[5]}.png`}
                                    onError={(e) => { e.target.src = starshipimg; }}
                                    alt={starship.name}
                                />
                                <p>{starship.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {!loaded && (
                <div className="load">
                    <img src={load} alt="Loading" />
                </div>
            )}
        </div>
    )
}

export default Search