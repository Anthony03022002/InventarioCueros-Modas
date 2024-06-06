import axios from "axios";

const generarPagoBolivarApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoBolivar/generarPagoBolivar/'
})
export const getAllPagosBolivar = () => generarPagoBolivarApi.get('/')

export const getPagoBolivar = (id) => generarPagoBolivarApi.get(`/${id}/`);

export const createPagosBolivar = (pagos) => generarPagoBolivarApi.post('/', pagos);

export const deletePagosBolivar = (id) => generarPagoBolivarApi.delete(`/${id}`)

export const updatePagosBolivar = (id, pagos) => generarPagoBolivarApi.put(`/${id}/`, pagos)