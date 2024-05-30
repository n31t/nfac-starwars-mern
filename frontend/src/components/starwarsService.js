import axios from 'axios';

const BASE_URL = "http://localhost:3939/api"

export const getPlanet = async (id) => {
    const response = await axios.get(`${BASE_URL}/planets/${id}/`);
    return response.data.result.properties;
  };

export const getResident = async (id) => {
    const response = await axios.get(`${BASE_URL}/people/${id}/`);
    return response.data.result.properties;
  };