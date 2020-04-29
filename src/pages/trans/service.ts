import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryTrans(params?: TableListParams) {
  return request('/api/msp/trans', {
    params,
  });
}
