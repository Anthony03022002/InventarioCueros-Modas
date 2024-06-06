import axios from 'axios'

const ventasMiraApi = axios.create({
    baseURL: 'http://localhost:8000/ventasMira/ventasMira'
})

export const getAllVentasMira = () => ventasMiraApi.get('/');

export const getVentaMira = (id) => ventasMiraApi.get(`/${id}/`);

export const creatVentasMira = (cliente) => ventasMiraApi.post('/', cliente);

export const deleteVentasMira = (id) => ventasMiraApi.delete(`/${id}`)

export const updateVentasMira = (id, cliente) => ventasMiraApi.put(`/${id}/`, cliente)