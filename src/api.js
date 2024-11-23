// src/api.js
import axios from 'axios';

const apiURL = 'https://67295f836d5fa4901b6cf342.mockapi.io/api/v1/ID';

export const getBooks = () => axios.get(apiURL);
export const getBook = (id) => axios.get(`${apiURL}/${id}`);
export const addBook = (book) => axios.post(apiURL, book);
export const updateBook = (id, book) => axios.put(`${apiURL}/${id}`, book);
export const deleteBook = (id) => axios.delete(`${apiURL}/${id}`);