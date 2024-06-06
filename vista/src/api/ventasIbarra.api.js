import axios from 'axios'

const ventasIbarraApi = axios.create({
    baseURL: 'http://localhost:8000/ventasIbarra/ventasIbarra'
})

export const getAllVentasIbarra = () => ventasIbarraApi.get('/');

export const getVentaIbarra = (id) => ventasIbarraApi.get(`/${id}/`);

export const creatVentasIbarra = (cliente) => ventasIbarraApi.post('/', cliente);

export const deleteVentasIbarra = (id) => ventasIbarraApi.delete(`/${id}`)

export const updateVentasIbarra = (id, cliente) => ventasIbarraApi.put(`/${id}/`, cliente)