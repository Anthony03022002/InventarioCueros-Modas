import axios from 'axios'

const stockHistoriaApi = axios.create({
    baseURL: 'http://localhost:9000/stockHistoria/stockHistoria/'
})

export const getAllStockHistoria = () => stockHistoriaApi.get('/');

export const createStockHistoria= (codigo) => stockHistoriaApi.post('/', codigo);

export const deleteStockHistoria = (id) => stockHistoriaApi.delete(`/${id}`)
