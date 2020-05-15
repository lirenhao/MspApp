import request from '@/utils/request';

export async function querySettle(params?: any) {
  return request('/api/msp/settle', {
    params,
  });
}
