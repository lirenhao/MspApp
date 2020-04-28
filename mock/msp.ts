import { Request, Response } from 'express';

const getMerInfo = (req: Request, res: Response) => {
  res.status(401).end();
}

export default {
  'GET /api/msp/mer': {
    merNo: '123456789012345',
    merName: '测试商户',
    status: '00',
  },
};
