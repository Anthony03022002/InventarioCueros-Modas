import axios from 'axios'

const devolucionesApi = axios.create({
    baseURL: 'http://localhost:8000/devoluciones/devoluciones/'
})

export const getAlldevoluciones = () => devolucionesApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

export const createdevoluciones= (producto) => devolucionesApi.post('/', producto);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)