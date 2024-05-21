import axios from 'axios'

const clientesLagoagrioApi = axios.create({
    baseURL: 'http://localhost:8000/clientesLagoagrio/clientesLagoagrio/'
})

export const getAllClientesLagoagrio = () => clientesLagoagrioApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

// export const createCliente = (clientes) => clienteApi.post('/', clientes);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)