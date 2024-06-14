import axios from "axios";

const generarPagoLagoagrioApi = axios.create({
    baseURL: 'http://localhost:9000/generarPagoLagoagrio/generarPagoLagoagrio/'
})
export const getAllPagosLagoagrio = () => generarPagoLagoagrioApi.get('/')

export const getPagoLagoagrio = (id) => generarPagoLagoagrioApi.get(`/${id}/`);

export const createPagosLagoagrio = (pagos) => generarPagoLagoagrioApi.post('/', pagos);

export const deletePagosLagoagrio = (id) => generarPagoLagoagrioApi.delete(`/${id}`)

export const updatePagosLagoagrio = (id, pagos) => generarPagoLagoagrioApi.put(`/${id}/`, pagos)