import request from '@/utils/request';
import { LoginData } from './data.d';

export async function login(params: LoginData) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function getCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function logout() {
  return request('/api/logout');
}
