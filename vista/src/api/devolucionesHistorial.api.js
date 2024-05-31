import axios from 'axios'

const devolucionesHistorialApi = axios.create({
    baseURL: 'http://localhost:8000/devolucionesHistorial/devolucionesHistorial/'
})

export const getAllDevolucionesHistorial = () => devolucionesHistorialApi.get('/');

export const createDevolucionesHistorial= (codigo) => devolucionesHistorialApi.post('/', codigo);

export const deleteDevolucionesHistorial = (id) => devolucionesHistorialApi.delete(`/${id}`)
