import axios from 'axios'

const ventasOtavaloApi = axios.create({
    baseURL: 'http://localhost:9000/ventasOtavalo/ventasOtavalo'
})

export const getAllVentasOtavalo = () => ventasOtavaloApi.get('/');

export const getVentaOtavalo = (id) => ventasOtavaloApi.get(`/${id}/`);

export const creatVentasOtavalo = (cliente) => ventasOtavaloApi.post('/', cliente);

export const deleteVentasOtavalo = (id) => ventasOtavaloApi.delete(`/${id}`)

export const updateVentasOtavalo = (id, cliente) => ventasOtavaloApi.put(`/${id}/`, cliente)