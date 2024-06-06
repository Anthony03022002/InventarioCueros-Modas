import axios from "axios";

const generarPagoMiraApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoMira/generarPagoMira/'
})
export const getAllPagosMira = () => generarPagoAtuntaquiApi.get('/')

export const getPagoMira = (id) => generarPagoAtuntaquiApi.get(`/${id}/`);

export const createPagosMira = (pagos) => generarPagoAtuntaquiApi.post('/', pagos);

export const deletePagosMira = (id) => generarPagoAtuntaquiApi.delete(`/${id}`)

export const updatePagosMira = (id, pagos) => generarPagoAtuntaquiApi.put(`/${id}/`, pagos)