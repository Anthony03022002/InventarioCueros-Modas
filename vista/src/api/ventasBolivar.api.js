import axios from 'axios'

const ventasBolivarApi = axios.create({
    baseURL: 'http://localhost:9000/ventasBolivar/ventasBolivar'
})

export const getAllVentasBolivar = () => ventasBolivarApi.get('/');

export const getVentaBolivar = (id) => ventasBolivarApi.get(`/${id}/`);

export const creatVentasBolivar = (cliente) => ventasBolivarApi.post('/', cliente);

export const deleteVentasBolivar = (id) => ventasBolivarApi.delete(`/${id}`)

export const updateVentasBolivar = (id, cliente) => ventasBolivarApi.put(`/${id}/`, cliente)