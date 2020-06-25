import { MonthData, TopData } from './data';

const monthData: MonthData[] = [];
for (let i = 0; i < 12; i += 1) {
  monthData.push({
    month: i + 1,
    sales: Math.floor(Math.random() * 1000) + 200,
  });
}

const topData: TopData[] = [];
for (let i = 0; i < 7; i += 1) {
  topData.push({
    merNo: '123456789012345',
    merName: 'Merchant Name',
    sales: 323234,
  });
}

export default {
  'GET  /svc/msp/sales/total': {
    year: '2020',
    count: '8846',
    trans: '126560',
    settle: '126560',
  },
  'GET  /svc/msp/sales/month': {
    monthData,
  },
  'GET  /svc/msp/sales/top': {
    topData,
  },
};
