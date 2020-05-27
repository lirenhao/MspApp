import { Request, Response } from 'express';
import { parse } from 'url';
import { SettleItem, SettleQuery } from './data.d';

const settleDataSource: SettleItem[] = [
  {
    settleDate: '20200131',
    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.03',
    settleAmt: '1.20',
    subs: [
      {
        settleDate: '20200131',
        merNo: '123456789012345',
        tranAmt: '0.41',
        fee: '0.01',
        settleAmt: '0.40',
        channel: 'Wechant',
      },
      {
        settleDate: '20200131',
        merNo: '123456789012345',
        tranAmt: '0.41',
        fee: '0.01',
        settleAmt: '0.40',
        channel: 'AliPay',
      },
      {
        settleDate: '20200131',
        merNo: '123456789012345',
        tranAmt: '0.41',
        fee: '0.01',
        settleAmt: '0.40',
        channel: 'UnionPay',
      },
    ],
  },
  {
    settleDate: '20200130',
    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.01',
    settleAmt: '1.22',
    subs: [],
  },
  {
    settleDate: '20200129',
    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.01',
    settleAmt: '1.22',
    subs: [],
  },
  {
    settleDate: '20200128',

    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.01',
    settleAmt: '1.22',
    subs: [],
  },
  {
    settleDate: '20200127',
    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.01',
    settleAmt: '1.22',
    subs: [],
  },
  {
    settleDate: '20200126',
    merNo: '123456789012345',
    tranAmt: '1.23',
    fee: '0.01',
    settleAmt: '1.22',
    subs: [],
  },
];

function getSettle(req: Request, res: Response, u: string) {
  const params = (parse(req.url, true).query as unknown) as SettleQuery & {
    size: number;
    page: number;
  };

  const dataSource = settleDataSource
    .filter(data => params.settleDate ? data.settleDate.includes(params.settleDate) : true)
    .filter(data => params.merNo ? data.merNo.includes(params.merNo) : true);

  return res.json({
    content: dataSource,
    totalElements: dataSource.length,
    totalPages: dataSource.length % params.size,
  });
}

export default {
  'GET /api/msp/settle': getSettle,
};
