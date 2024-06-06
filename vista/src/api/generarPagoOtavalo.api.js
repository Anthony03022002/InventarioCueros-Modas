import axios from "axios";

const generarPagoOtavaloApi = axios.create({
    baseURL: 'http://localhost:8000/generarPagoOtavalo/generarPagoOtavalo/'
})
export const getAllPagosOtavalo = () => generarPagoOtavaloApi.get('/')

export const getPagoOtavalo = (id) => generarPagoOtavaloApi.get(`/${id}/`);

export const createPagosOtavalo = (pagos) => generarPagoOtavaloApi.post('/', pagos);

export const deletePagosOtavalo = (id) => generarPagoOtavaloApi.delete(`/${id}`)

export const updatePagosOtavalo = (id, pagos) => generarPagoOtavaloApi.put(`/${id}/`, pagos)