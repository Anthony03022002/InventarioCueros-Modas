import axios from "axios";

const generarPagoCayambeApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoCayambe/generarPagoCayambe/'
})
export const getAllPagosCayambe = () => generarPagoCayambeApi.get('/')

export const getPagoCayambe = (id) => generarPagoCayambeApi.get(`/${id}/`);

export const createPagosCayambe = (pagos) => generarPagoCayambeApi.post('/', pagos);

export const deletePagosCayambe = (id) => generarPagoCayambeApi.delete(`/${id}`)

export const updatePagosCayambe = (id, pagos) => generarPagoCayambeApi.put(`/${id}/`, pagos)