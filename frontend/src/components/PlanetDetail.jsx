import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlanet, getResident } from './starwarsService';
import load from '../assets/images/load.png';
import './PlanetDetail.css';

const PlanetDetail = () => {
    const { id } = useParams()
    const [planet, setPlanet] = useState(null)
    const [residents, setResidents] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const fetchPlanet = async () => {
          try {
            const response = await getPlanet(id);
            const planetData = response.data;
            setPlanet(planetData);
            const residentsData = await Promise.all(
              planetData.residents.map(async (residentUrl) => {
                const residentId = residentUrl.split('/')[5];
                const residentResponse = await getResident(residentId);
                const residentData = residentResponse.data;
                return residentData;
              })
            );
            setResidents(residentsData);
            console.log(planetData)
            setLoaded(true);
          } catch (error) {
            console.error('Error fetching planet details:', error);
          }
        };
        fetchPlanet();
      }, [id]);

    if (!loaded) {
        return (
          <div className="load">
            <img src={load} alt="Loading" />
          </div>
        );
      }
    return (
    <div>
    <div className="big-container">
      <div className="planet-info">
        <img
          className="planet"
          src={`assets/images/${id}.png`}
          onError={(e) => { e.target.src = 'assets/images/default.png'; }}
          alt={planet.name}
        />
      </div>
      <div className="text">
        <h1>{planet.name}</h1>
        <p><strong>Climate:</strong> {planet.climate}</p>
        <p><strong>Population:</strong> {planet.population}</p>
        <p><strong>Orbital Period:</strong> {planet.orbital_period} days</p>
        <p><strong>Rotation Period:</strong> {planet.rotation_period} days</p>
        <p><strong>Diameter:</strong> {planet.diameter} m</p>
        <p><strong>Gravity:</strong> {planet.gravity}</p>
        <p><strong>Surface Water:</strong> {planet.surface_water}%</p>
        <p><strong>Terrain:</strong> {planet.terrain}</p>
      </div>
      </div>
      <div className="medium-container">
        <div className="text">
          <h2>Residents</h2>
          <ul>
            {residents.length > 0 ? (
              residents.map((resident) => (
                <li key={resident.id}>
                  <Link to={`/people/${resident.id}`}>{resident.name}</Link>
                </li>
              ))
            ) : (
              <p>There are no residents on this planet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
    );
}

export default PlanetDetail;