import axios from "axios";

const generarPagoAngelApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoAngel/generarPagoAngel/'
})
export const getAllPagosAngel = () => generarPagoAngelApi.get('/')

export const getPagoAngel = (id) => generarPagoAngelApi.get(`/${id}/`);

export const createPagosAngel = (pagos) => generarPagoAngelApi.post('/', pagos);

export const deletePagosAngel = (id) => generarPagoAngelApi.delete(`/${id}`)

export const updatePagosAngel = (id, pagos) => generarPagoAngelApi.put(`/${id}/`, pagos)