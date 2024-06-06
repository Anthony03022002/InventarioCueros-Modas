import axios from "axios";

const generarPagoAtuntaquiApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoAtuntaqui/generarPagoAtuntaqui/'
})
export const getAllPagosAtuntaqui = () => generarPagoAtuntaquiApi.get('/')

export const getPagoAtuntaqui = (id) => generarPagoAtuntaquiApi.get(`/${id}/`);

export const createPagosAtuntaqui = (pagos) => generarPagoAtuntaquiApi.post('/', pagos);

export const deletePagosAtuntaqui = (id) => generarPagoAtuntaquiApi.delete(`/${id}`)

export const updatePagosAtuntaqui = (id, pagos) => generarPagoAtuntaquiApi.put(`/${id}/`, pagos)