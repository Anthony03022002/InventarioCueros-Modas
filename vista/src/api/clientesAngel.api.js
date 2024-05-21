import axios from 'axios'

const clientesAngelApi = axios.create({
    baseURL: 'http://localhost:8000/clientesAngel/clientesAngel/'
})

export const getAllClientesAngel = () => clientesAngelApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

export const createClienteAngel = (clientes) => clientesAngelApi.post('/', clientes);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)