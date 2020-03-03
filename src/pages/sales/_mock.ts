import { Request, Response } from 'express';
import moment from 'moment';

function getSalesMonth(req: Request, res: Response) {
  const { month = moment(new Date()).format('YYYYMM') } = req.query;
  const year = moment(month, 'YYYYMM').format('YYYY');
  res.json({
    month,
    mers: 358, // Merchant onboarding
    point: 1180357, // Touch point
    revenue: 930216, // MDR Revenue
    trans: 10213667, // Transation
    average: 12924, // Average past months
    target: 247234, // Target
    recent: 12924, // Recent
    pasts: [
      {
        month: `Jan ${year}`,
        total: 5241
      },
      {
        month: `Feb ${year}`,
        total: 8342
      },
      {
        month: `Mar ${year}`,
        total: 10003
      },
      {
        month: `Apr ${year}`,
        total: 12924
      },
      {
        month: `May ${year}`,
        total: 0
      },
      {
        month: `Jun ${year}`,
        total: 0
      },
      {
        month: `Jul ${year}`,
        total: 0
      },
      {
        month: `Aug ${year}`,
        total: 0
      },
      {
        month: `Sep ${year}`,
        total: 0
      },
      {
        month: `Oct ${year}`,
        total: 0
      },
      {
        month: `Nov ${year}`,
        total: 0
      },
      {
        month: `Dec ${year}`,
        total: 0
      },
    ],
  });
}

function getSalesTops(req: Request, res: Response) {
  res.json({
    trans: [
      {
        name: 'Damiao',
        nick: 'DMO',
        total: 21324
      },
      {
        name: 'BBQ box',
        nick: 'BBI',
        total: 19222
      },
      {
        name: 'Koufu',
        nick: 'KF1',
        total: 15122
      },
      {
        name: 'KFC',
        nick: 'KFC',
        total: 8235
      },
      {
        name: 'Mcd',
        nick: 'MCD',
        total: 5776
      },
    ],
    revenue: [
      {
        name: 'Damiao',
        nick: 'DMO',
        total: 1324
      },
      {
        name: 'BBQ box',
        nick: 'BBI',
        total: 222
      },
      {
        name: 'Koufu',
        nick: 'KF1',
        total: 122
      },
      {
        name: 'KFC',
        nick: 'KFC',
        total: 85
      },
      {
        name: 'Mcd',
        nick: 'MCD',
        total: 76
      },
    ],
    income: {
      revenue: 1305507,
      cost: 208453,
      grossProfit: 1097054,
      otherIncome: 2130,
      otherExenes: 51195,
      ebit: 232648,
      interestAndTax: 38244,
      netProfit: 19440,
    },
  })
}

export default {
  'GET /api/sales/month': getSalesMonth,
  'GET /api/sales/tops': getSalesTops,
};
