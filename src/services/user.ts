import request from '@/utils/request';

export async function getMerInfo(): Promise<any> {
  return request('/api/user/merInfo');
}
