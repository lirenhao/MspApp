import request from '@/utils/request';
import { ModifyData } from './data';

export async function modifyPwd(params: ModifyData) {
  return request('/change_pwd', {
    method: 'POST',
    data: params,
  });
}
