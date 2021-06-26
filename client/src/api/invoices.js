import axios from 'axios';

export function addInvoiceRequest(data) {
  return axios.post('/invoices', data);
}

export function getMyInvoices() {
  return axios.get('/invoices');
}

export function getOneInvoice(id) {
  return axios.get(`/invoices/${id}`);
}
