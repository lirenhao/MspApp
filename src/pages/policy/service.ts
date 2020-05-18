import request from '@/utils/request';

export async function getPolicy() {
  return request('/api/msp/policy?id=login');
}

export async function postPolicy() {
  return request('/api/msp/policy?id=login', {
    method: 'POST',
  });
}
