import axios from 'axios'

const ventasCayambeApi = axios.create({
    baseURL: 'http://localhost:8000/ventasCayambe/ventasCayambe'
})

export const getAllVentasCayambe = () => ventasCayambeApi.get('/');

export const getVentaCayambe = (id) => ventasCayambeApi.get(`/${id}/`);

export const creatVentasCayambe = (cliente) => ventasCayambeApi.post('/', cliente);

export const deleteVentasCayambe = (id) => ventasCayambeApi.delete(`/${id}`)

export const updateVentasCayambe = (id, cliente) => ventasCayambeApi.put(`/${id}/`, cliente)