import axios from 'axios'

const ventasPimampiroApi = axios.create({
    baseURL: 'http://localhost:9000/ventasPimampiro/ventasPimampiro'
})

export const getAllVentasPimampiro = () => ventasPimampiroApi.get('/');

export const getVentaPimampiro = (id) => ventasPimampiroApi.get(`/${id}/`);

export const creatVentasPimampiro = (cliente) => ventasPimampiroApi.post('/', cliente);

export const deleteVentasPimampiro = (id) => ventasPimampiroApi.delete(`/${id}`)

export const updateVentasPimampiro = (id, cliente) => ventasPimampiroApi.put(`/${id}/`, cliente)