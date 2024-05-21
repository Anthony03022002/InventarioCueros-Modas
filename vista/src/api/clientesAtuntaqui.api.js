import axios from 'axios'

const clientesAtuntaquiApi = axios.create({
    baseURL: 'http://localhost:8000/clientesAtuntaqui/clientesAtuntaqui/'
})

export const getAllClientesAtuntaqui = () => clientesAtuntaquiApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

// export const createCliente = (clientes) => clienteApi.post('/', clientes);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)