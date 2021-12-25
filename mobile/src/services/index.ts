import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://bootcamp-devsuperior-dscatalog.herokuapp.com',
});

export const TOKEN = "Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==";


export function getProducts() {

    const rest = api.get(`/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`);
    return rest;
}