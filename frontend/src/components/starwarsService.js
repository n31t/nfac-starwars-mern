import axios from 'axios';

const BASE_URL = "http://localhost:3939/api"

export const getPlanet = async (id) => {
    const response = await axios.get(`${BASE_URL}/planets/${id}/`);
    return response;
  };

export const getResident = async (id) => {
    const response = await axios.get(`${BASE_URL}/people/${id}/`);
    return response;
  };

export const getStarship = async (id) => {
    const response = await axios.get(`${BASE_URL}/starships/${id}/`);
    return response;
  }

export const getPlanetListCounter = async () => {
    const response = await axios.get(`${BASE_URL}/planets/`);
    return response;
}