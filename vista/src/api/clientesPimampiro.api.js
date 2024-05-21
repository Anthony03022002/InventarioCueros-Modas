import axios from 'axios'

const clientesPimampiroApi = axios.create({
    baseURL: 'http://localhost:8000/clientesPimampiro/clientesPimampiro/'
})

export const getAllClientesPimampiro = () => clientesPimampiroApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

// export const createCliente = (clientes) => clienteApi.post('/', clientes);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)