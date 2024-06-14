import axios from "axios";

const generarPagoIbarraApi = axios.create({
    baseURL: 'http://localhost:9000/generarPagoIbarra/generarPagoIbarra/'
})
export const getAllPagosIbarra = () => generarPagoIbarraApi.get('/')

export const getPagoIbarra = (id) => generarPagoIbarraApi.get(`/${id}/`);

export const createPagosIbarra = (pagos) => generarPagoIbarraApi.post('/', pagos);

export const deletePagosIbarra = (id) => generarPagoIbarraApi.delete(`/${id}`)

export const updatePagosIbarra = (id, pagos) => generarPagoIbarraApi.put(`/${id}/`, pagos)