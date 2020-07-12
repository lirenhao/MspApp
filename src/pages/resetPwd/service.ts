import request from '@/utils/request';
import { ResetData } from './data';

export async function sendCode() {
  return request('/svc/user/fa', {
    method: 'POST',
  });
}

export async function resetPwd(params: ResetData) {
  return request('/svc/user/resetPwd', {
    method: 'POST',
    data: params,
  });
}
