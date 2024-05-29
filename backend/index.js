import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import { logRequest } from './logger.js';

mongoose
.connect('mongodb+srv://amiradilov202:87054632675@mongo-n.dyktmr0.mongodb.net/logs?retryWrites=true&w=majority&appName=mongo-n')
.then (()=> console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err))

const app = express();
const port = 3939;
const api = 'https://swapi.dev/api';

//TODO Code refactoring
app.use(express.json());

app.get('/api/healthcheck', (req, res) => {
    res.send('API is working');
})

app.get('/api/planets', (req, res) => {
    logRequest('Someone requested planets', `${api}/api/planets`);

    axios.get(`${api}/planets`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.get('/api/planets/:id', (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({
            message: 'Invalid id'
        })
        return;
    }
    logRequest(`Someone requested planet with id ${id}`, `${api}/api/planets/${id}`);
    axios.get(`${api}/planets/${id}`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.get('/api/people', (req, res) => {
    logRequest('Someone requested people', `${api}/api/people`);

    axios.get(`${api}/people`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.get('/api/people/:id', (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({
            message: 'Invalid id'
        })
        return;
    }
    logRequest(`Someone requested person with id ${id}`, `${api}/api/people/${id}`);
    axios.get(`${api}/people/${id}`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.get('/api/starships/:id', (req, res) => {
    const id = req.params.id;
    if(isNaN(id)){
        res.status(400).json({
            message: 'Invalid id'
        })
        return;
    }
    logRequest(`Someone requested starship with id ${id}`, `${api}/api/starships/${id}`);
    axios.get(`${api}/starships/${id}`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.get('/api/search/:category', (req, res) => {
    const category = req.params.category;
    const query = req.query.search;

    if (!query) {
        res.status(400).json({
            message: 'Missing query parameter'
        })
        return;
    }

    logRequest(`Someone searched for ${query} in ${category}`, `${api}/${category}/?search=${query}`);

    axios.get(`${api}/${category}/?search=${query}`)
    .then((response) => res.send(response.data))
    .catch((error) => {
        console.log(error)
        let errorMessage = 'Something went wrong';

        if(error.response){
            switch(error.response.status){
                case 404:
                    errorMessage = 'Resource not found';
                    break;
                case 500:
                    errorMessage = 'Server error';
                default:
                    errorMessage = 'Something went wrong';
            }
        }
        res.status(500).json(
            {
                message: errorMessage
            }
        )
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log ('Server is listening on port 3939')
});