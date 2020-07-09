import request from '@/utils/request';
import { ResetData } from './data';

export async function resetPwd(params: ResetData) {
  return request('/change_pwd', {
    method: 'POST',
    data: params,
  });
}

export async function sendCode() {
  return request('/svc/msp/emailCode/send');
}
