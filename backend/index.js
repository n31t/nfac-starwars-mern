import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';

mongoose
.connect('mongodb+srv://amiradilov202:87054632675@mongo-n.dyktmr0.mongodb.net/?retryWrites=true&w=majority&appName=mongo-n')
.then (()=> console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err))

const app = express();
const port = 3939;
const api = 'https://swapi.dev/api';

app.use(express.json());

app.get('/api/healthcheck', (req, res) => {
    res.send('API is working');
})

app.get('/api/planets', (req, res) => {
    axios.get(`${api}/planets`)
    .then((response) => res.send(response.data))
    .catch((error) => res.status(500).send(error))
})

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log ('Server is listening on port 3939')
});