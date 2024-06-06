import axios from 'axios'

const clientesCayambeApi = axios.create({
    baseURL: 'http://localhost:8000/clientesCayambe/clientesCayambe/'
})

export const getAllClientesCayambe = () => clientesCayambeApi.get('/');

export const getClienteCayambe = (id) => clientesCayambeApi.get(`/${id}/`);

export const createClientesCayambe = (clientes) => clientesCayambeApi.post('/', clientes);

export const deleteClientesCayambe = (id) => clientesCayambeApi.delete(`/${id}`)

export const updateClientesCayambe= (id, clientes) => clientesCayambeApi.put(`/${id}/`, clientes)