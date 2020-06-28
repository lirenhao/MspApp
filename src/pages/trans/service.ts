import request from '@/utils/request';

export async function queryTrans(params?: any) {
  return request('/svc/msp/trans', {
    params,
  });
}

export async function downloadTrans(params?: any) {
  return request('/svc/msp/trans/download', {
    params,
    parseResponse: false,
  });
}

export async function getMerSubs() {
  return request('/svc/msp/mer/subs');
}

export async function getTermNos(merNo: string) {
  return request(`/svc/msp/mer/termNos?merNo=${merNo}`);
}
