import request from '@/utils/request';

export async function getUser(): Promise<any> {
  return request('/api/msp/user');
}

export async function getLogout(): Promise<any> {
  return request('/api/logout');
}
