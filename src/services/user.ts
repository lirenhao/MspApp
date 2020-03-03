import request from '@/utils/request';

export async function getMerInfo(): Promise<any> {
  return request('/api/user/merInfo');
}


export async function getLogout(): Promise<any> {
  return request('/api/user/logout');
}
