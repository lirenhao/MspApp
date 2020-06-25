import request from '@/utils/request';

export async function getMerSubs() {
  return request('/svc/msp/mer/subs');
}

export async function querySettle(params?: any) {
  return request('/svc/msp/settle', {
    params,
  });
}

export async function downloadSettle(params?: any) {
  return request('/svc/msp/settle/download', {
    params,
    parseResponse: false,
  });
}

export async function getSubTrans(params: any) {
  return request('/svc/msp/settle/trans', {
    params
  });
}
