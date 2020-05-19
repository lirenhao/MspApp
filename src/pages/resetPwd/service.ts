import request from '@/utils/request';
import { ResetData } from './data';

export async function resetPwd(params: ResetData) {
  return request('/api/change_pwd', {
    method: 'POST',
    data: params,
  });
}
