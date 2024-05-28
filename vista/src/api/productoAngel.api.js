import axios from 'axios'

const productoClienteAngelApi = axios.create({
    baseURL: 'http://localhost:8000/productoClienteAngel/productoClienteAngel'
})

export const getAllproductoClienteAngel = () => productoClienteAngelApi.get('/');

// export const getFacturas = (id) => facturaApi.get(`/${id}/`);

export const creatproductoClienteAngel = (producto) => productoClienteAngelApi.post('/', producto);

// export const deleteCliente = (id) => clienteApi.delete(`/${id}`)

// export const updateCliente= (id, clientes) => clienteApi.put(`/${id}/`, clientes)