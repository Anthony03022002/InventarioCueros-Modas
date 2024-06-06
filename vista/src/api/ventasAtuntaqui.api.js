import axios from 'axios'

const ventasAtuntaquiApi = axios.create({
    baseURL: 'http://localhost:8000/ventasAtuntaqui/ventasAtuntaqui'
})

export const getAllVentasAtuntaqui = () => ventasAtuntaquiApi.get('/');

export const getVentaAtuntaqui = (id) => ventasAtuntaquiApi.get(`/${id}/`);

export const creatVentasAtuntaqui = (cliente) => ventasAtuntaquiApi.post('/', cliente);

export const deleteVentasAtuntaqui = (id) => ventasAtuntaquiApi.delete(`/${id}`)

export const updateVentasAtuntaqui = (id, cliente) => ventasAtuntaquiApi.put(`/${id}/`, cliente)