import request from '@/utils/request';

export async function getMerInfo() {
  return request('/svc/msp/mer');
}
