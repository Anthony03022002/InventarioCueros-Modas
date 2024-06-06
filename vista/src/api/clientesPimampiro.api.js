import axios from 'axios'

const clientesPimampiroApi = axios.create({
    baseURL: 'http://localhost:8000/clientesPimampiro/clientesPimampiro/'
})

export const getAllClientesPimampiro = () => clientesPimampiroApi.get('/');

export const getClientePimampiro = (id) => clientesPimampiroApi.get(`/${id}/`);

export const createClientesPimampiro = (clientes) => clientesPimampiroApi.post('/', clientes);

export const deleteClientesPimampiro = (id) => clientesPimampiroApi.delete(`/${id}`)

export const updateClientesPimampiro= (id, clientes) => clientesPimampiroApi.put(`/${id}/`, clientes)