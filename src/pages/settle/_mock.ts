import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [
  {
    settlementDate: '20160531',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
  {
    settlementDate: '20160530',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
  {
    settlementDate: '20160529',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
  {
    settlementDate: '20160528',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
  {
    settlementDate: '20160527',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
  {
    settlementDate: '20160526',
    settlementNumber: 0,
    totalCharge: 0,
    creait: 0,
    submissionAmount: 0,
    discountAmount: 0,
    feesAndIncentives: 0,
    chargeBacks: 0,
    adjustments: 0,
    subs: [],
  },
];

function getSettle(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.settlementDate) {
    dataSource = dataSource.filter(data => data.settlementDate.includes(params.settlementDate || ''));
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/settle': getSettle,
};
