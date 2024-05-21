import axios from 'axios'

const clientesIbarraApi = axios.create({
    baseURL: 'http://localhost:8000/clientesIbarra/clientesIbarra/'
})

export const getAllClientesIbarra = () => clientesIbarraApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

// export const createCliente = (clientes) => clienteApi.post('/', clientes);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)