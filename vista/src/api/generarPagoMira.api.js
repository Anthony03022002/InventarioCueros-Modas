import axios from "axios";

const generarPagoMiraApi = axios.create({
    baseURL: 'http://localhost:9000/generarPagoMira/generarPagoMira/'
})
export const getAllPagosMira = () => generarPagoMiraApi.get('/')

export const getPagoMira = (id) => generarPagoMiraApi.get(`/${id}/`);

export const createPagosMira = (pagos) => generarPagoMiraApi.post('/', pagos);

export const deletePagosMira = (id) => generarPagoMiraApi.delete(`/${id}`)

export const updatePagosMira = (id, pagos) => generarPagoMiraApi.put(`/${id}/`, pagos)