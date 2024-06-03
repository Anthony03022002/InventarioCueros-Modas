import axios from 'axios'

const clientesAngelApi = axios.create({
    baseURL: 'http://localhost:8000/clientesAngel/clientesAngel/'
})

export const getAllClientesAngel = () => clientesAngelApi.get('/');

export const getClienteAngel = (id) => clientesAngelApi.get(`/${id}/`);

export const createClientesAngel = (clientes) => clientesAngelApi.post('/', clientes);

export const deleteClientesAngel = (id) => clientesAngelApi.delete(`/${id}`)

export const updateClientesAngel= (id, clientes) => clientesAngelApi.put(`/${id}/`, clientes)