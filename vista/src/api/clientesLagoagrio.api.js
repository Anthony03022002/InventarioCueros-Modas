import axios from 'axios'

const clientesLagoagrioApi = axios.create({
    baseURL: 'http://localhost:9000/clientesLagoagrio/clientesLagoagrio/'
})

export const getAllClientesLagoagrio = () => clientesLagoagrioApi.get('/');

export const getClienteLagoagrio = (id) => clientesLagoagrioApi.get(`/${id}/`);

export const createClientesLagoagrio = (clientes) => clientesLagoagrioApi.post('/', clientes);

export const deleteClientesLagoagrio = (id) => clientesLagoagrioApi.delete(`/${id}`)

export const updateClientesLagoagrio= (id, clientes) => clientesLagoagrioApi.put(`/${id}/`, clientes)