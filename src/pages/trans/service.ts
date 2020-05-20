import request from '@/utils/request';

export async function queryTrans(params: any) {
  return request('/api/msp/trans', {
    params,
  });
}

export async function downloadTrans(params?: any) {
  return request('/api/msp/trans/download', {
    params,
    parseResponse: false,
  });
}
