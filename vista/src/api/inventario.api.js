import axios from 'axios'

const inventarioApi = axios.create({
    baseURL: 'http://localhost:8000/inventario/inventario/'
})

export const getAllInventario = () => inventarioApi.get('/');

export const getInventario = (id) => inventarioApi.get(`/${id}/`);

export const createInventario= (producto) => inventarioApi.post('/', producto);

export const deleteInventario = (id) => inventarioApi.delete(`/${id}`)

export const updateInventario= (id, producto) => inventarioApi.put(`/${id}/`, producto)