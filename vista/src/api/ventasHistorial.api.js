import axios from 'axios'

const ventasHistorialApi = axios.create({
    baseURL: 'http://localhost:8000/ventasHistorial/ventasHistorial/'
})

export const getAllVentasHistorial = () => ventasHistorialApi.get('/');

export const createVentasHistorial= (codigo) => ventasHistorialApi.post('/', codigo);

export const deleteVentasHistorial = (id) => ventasHistorialApi.delete(`/${id}`)
