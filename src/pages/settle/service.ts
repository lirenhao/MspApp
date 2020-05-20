import request from '@/utils/request';

export async function querySettle(params?: any) {
  return request('/api/msp/settle', {
    params,
  });
}

export async function downloadSettle(params?: any) {
  return request('/api/msp/settle/download', {
    params,
    parseResponse: false,
  });
}
