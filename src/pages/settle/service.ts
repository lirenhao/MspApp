import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function querySettle(params?: TableListParams) {
  return request('/api/settle', {
    params,
  });
}
