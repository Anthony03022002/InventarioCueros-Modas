import axios from 'axios'

const clientesBolivarApi = axios.create({
    baseURL: 'http://localhost:9000/clientesBolivar/clientesBolivar/'
})

export const getAllClientesBolivar  = () => clientesBolivarApi.get('/');

export const getClienteBolivar  = (id) => clientesBolivarApi.get(`/${id}/`);

export const createClientesBolivar  = (clientes) => clientesBolivarApi.post('/', clientes);

export const deleteClientesBolivar  = (id) => clientesBolivarApi.delete(`/${id}`)

export const updateClientesBolivar = (id, clientes) => clientesBolivarApi.put(`/${id}/`, clientes)