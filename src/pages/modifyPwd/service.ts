import request from '@/utils/request';
import { ModifyData } from './data';

export async function modifyPwd(params: ModifyData) {
  return request('/svc/user/changePwd', {
    method: 'POST',
    data: params,
  });
}
