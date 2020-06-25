import request from '@/utils/request';

export async function fetchLogout() {
  return request('/logout');
}

