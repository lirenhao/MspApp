import request from '@/utils/request';
import { InitData } from './data';

export async function sendCode() {
  return request('/svc/user/fa', {
    method: 'POST',
  });
}

export async function initPwd(params: InitData) {
  return request('/svc/user/init', {
    method: 'POST',
    data: params,
  });
}
