import axios from 'axios'

const devolucionesApi = axios.create({
    baseURL: 'http://localhost:8000/devoluciones/devoluciones/'
})

export const getAlldevoluciones = () => devolucionesApi.get('/');

export const getDevolucion = (id) => devolucionesApi.get(`/${id}/`);

export const createdevoluciones= (producto) => devolucionesApi.post('/', producto);

export const deleteDevoluciones = (id) => devolucionesApi.delete(`/${id}`)

export const updateDevoluciones = (id, producto) => devolucionesApi.put(`/${id}/`, producto)