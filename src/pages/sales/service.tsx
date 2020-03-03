import request from '@/utils/request';

export async function getSalesMonth(month: string) {
  return request(month ? `/api/sales/month?month=${month}` : '/api/sales/month');
}

export async function getSalesTops() {
  return request('/api/sales/tops');
}
