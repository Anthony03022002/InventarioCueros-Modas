import axios from 'axios'

const ventasLagoagrioApi = axios.create({
    baseURL: 'http://localhost:8000/ventasLagoagrio/ventasLagoagrio'
})

export const getAllVentasLagoagrio = () => ventasLagoagrioApi.get('/');

export const getVentaLagoagrio = (id) => ventasLagoagrioApi.get(`/${id}/`);

export const creatVentasLagoagrio = (cliente) => ventasLagoagrioApi.post('/', cliente);

export const deleteVentasLagoagrio = (id) => ventasLagoagrioApi.delete(`/${id}`)

export const updateVentasLagoagrio = (id, cliente) => ventasLagoagrioApi.put(`/${id}/`, cliente)