import axios from 'axios'

const clientesOtavaloApi = axios.create({
    baseURL: 'http://localhost:9000/clientesOtavalo/clientesOtavalo/'
})

export const getAllClientesOtavalo = () => clientesOtavaloApi.get('/');

export const getClienteOtavalo = (id) => clientesOtavaloApi.get(`/${id}/`);

export const createClientesOtavalo = (clientes) => clientesOtavaloApi.post('/', clientes);

export const deleteClientesOtavalo = (id) => clientesOtavaloApi.delete(`/${id}`)

export const updateClientesOtavalo= (id, clientes) => clientesOtavaloApi.put(`/${id}/`, clientes)