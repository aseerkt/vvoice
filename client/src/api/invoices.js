import axios from 'axios';

export function addInvoiceRequest(data) {
  return axios.post('/invoices/new', data);
}
