import request from '@/utils/request';

export async function getTotal() {
  return request('/api/msp/sales/total');
}

export async function getMonths() {
  return request('/api/msp/sales/months');
}

export async function getTops() {
  return request('/api/msp/sales/tops');
}
