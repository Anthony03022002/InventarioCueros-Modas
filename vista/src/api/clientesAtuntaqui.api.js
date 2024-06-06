import axios from 'axios'

const clientesAtuntaquiApi = axios.create({
    baseURL: 'http://localhost:8000/clientesAtuntaqui/clientesAtuntaqui/'
})

export const getAllClientesAtuntaqui = () => clientesAtuntaquiApi.get('/');

export const getClienteAtuntaqui = (id) => clientesAtuntaquiApi.get(`/${id}/`);

export const createClientesAtuntaqui = (clientes) => clientesAtuntaquiApi.post('/', clientes);

export const deleteClientesAtuntaqui = (id) => clientesAtuntaquiApi.delete(`/${id}`)

export const updateClientesAtuntaqui= (id, clientes) => clientesAtuntaquiApi.put(`/${id}/`, clientes)