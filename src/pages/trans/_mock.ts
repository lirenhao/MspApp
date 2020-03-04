import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [
  {
    tranNo: '1',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '2',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '3',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '4',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '5',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '6',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '7',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '8',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '9',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '10',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '11',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
  {
    tranNo: '12',
    merNo: '123456789012345',
    termNo: '12345678',
    cardStatus: '00',
    cardNo: '1233*********6789',
    tranAmt: 100,
    tranType: '01',
    tranStatus: '00',
    tranDate: '20200129',
    tranTime: '184530',
  },
];

function getTrans(req: Request, res: Response, u: string) {
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

  if (params.termNo) {
    dataSource = dataSource.filter(data => data.termNo.includes(params.termNo || ''));
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
  'GET /api/trans': getTrans,
};
