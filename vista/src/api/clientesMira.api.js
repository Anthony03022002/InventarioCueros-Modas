import axios from 'axios'

const clientesMiraApi = axios.create({
    baseURL: 'http://localhost:9000/clientesMira/clientesMira/'
})

export const getAllClientesMira = () => clientesMiraApi.get('/');

export const getClienteMira = (id) => clientesMiraApi.get(`/${id}/`);

export const createClientesMira = (clientes) => clientesMiraApi.post('/', clientes);

export const deleteClientesMira = (id) => clientesMiraApi.delete(`/${id}`)

export const updateClientesMira= (id, clientes) => clientesMiraApi.put(`/${id}/`, clientes)