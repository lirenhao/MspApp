import request from '@/utils/request';
import { LoginData } from './data.d';

export async function login(params: LoginData) {
  return request('/svc/login', {
    method: 'POST',
    data: params,
  });
}

export async function getCaptcha(mobile: string) {
  return request(`/svc/login/captcha?mobile=${mobile}`);
}
