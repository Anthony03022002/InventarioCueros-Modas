import axios from 'axios'

const productoClienteAngelApi = axios.create({
    baseURL: 'http://localhost:8000/productoClienteAngel/productoClienteAngel'
})

export const getAllproductoClienteAngel = () => productoClienteAngelApi.get('/');

export const getProductoAngel = (id) => productoClienteAngelApi.get(`/${id}/`);

export const creatproductoClienteAngel = (producto) => productoClienteAngelApi.post('/', producto);

export const deleteProductoClienteAngel = (id) => productoClienteAngelApi.delete(`/${id}`)

export const updateProductoClienteAngel= (id, producto) => productoClienteAngelApi.put(`/${id}/`, producto)