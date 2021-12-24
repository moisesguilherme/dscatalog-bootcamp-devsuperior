import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://bootcamp-devsuperior-dscatalog.herokuapp.com',
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";