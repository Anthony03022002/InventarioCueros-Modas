import axios from 'axios'

const clientesIbarraApi = axios.create({
    baseURL: 'http://localhost:8000/clientesIbarra/clientesIbarra/'
})

export const getAllClientesIbarra = () => clientesIbarraApi.get('/');

export const getClienteIbarra = (id) => clientesIbarraApi.get(`/${id}/`);

export const createClientesIbarra = (clientes) => clientesIbarraApi.post('/', clientes);

export const deleteClientesIbarra = (id) => clientesIbarraApi.delete(`/${id}`)

export const updateClientesIbarra= (id, clientes) => clientesIbarraApi.put(`/${id}/`, clientes)