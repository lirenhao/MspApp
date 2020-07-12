import request from '@/utils/request';

export async function getPolicy() {
  return request('/svc/msp/policy?id=login');
}

export async function postPolicy() {
  return request('/svc/user/policy', {
    method: 'POST',
  });
}
