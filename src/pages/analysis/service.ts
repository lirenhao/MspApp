import request from '@/utils/request';

export async function getTotal() {
  return request('/svc/msp/sales/total');
}

export async function getMonths() {
  return request('/svc/msp/sales/months');
}

export async function getTops() {
  return request('/svc/msp/sales/tops');
}
