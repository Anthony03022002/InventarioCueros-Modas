import axios from 'axios'

const facturaApi = axios.create({
    baseURL: 'http://localhost:9000/factura/factura/'
})

export const getAllFacturas = () => facturaApi.get('/');

export const getFactura = (id) => facturaApi.get(`/${id}/`);

export const createFacturas = (factura) => {
    const formData = new FormData();
    formData.append('proveedor', factura.proveedor);
    formData.append('fecha', factura.fecha);
    formData.append('file', factura.file[0]);  // Asegúrate de que 'file' sea un array

    return facturaApi.post('/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteFacturas = (id) => facturaApi.delete(`/${id}`)

export const updateFacturas= (id, clientes) => facturaApi.put(`/${id}/`, clientes)