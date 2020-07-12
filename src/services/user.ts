import request from '@/utils/request';

export async function getUser(): Promise<any> {
  return request('/svc/user');
}

export async function getLogout(): Promise<any> {
  return request('/logout');
}
