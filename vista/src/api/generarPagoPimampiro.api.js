import axios from "axios";

const generarPagoPimampiroApi = axios.create({
    baseURL: 'http://localhost:9000/generarPagoPimampiro/generarPagoPimampiro/'
})
export const getAllPagosPimampiro = () => generarPagoPimampiroApi.get('/')

export const getPagoPimampiro = (id) => generarPagoPimampiroApi.get(`/${id}/`);

export const createPagosPimampiro = (pagos) => generarPagoPimampiroApi.post('/', pagos);

export const deletePagosPimampiro = (id) => generarPagoPimampiroApi.delete(`/${id}`)

export const updatePagosPimampiro = (id, pagos) => generarPagoPimampiroApi.put(`/${id}/`, pagos)