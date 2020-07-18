import { Request, Response } from 'express';
import { parse } from 'url';

const getUser = (req: Request, res: Response) => {
  res.status(401).end();
}

export default {
  'GET /svc/user': {
    userId: '123456789012345@admin',
    merName: '测试商户',
    status: '00',
  },
  'GET /svc/msp/mer/subs': [
    {
      merNo: '123456789012345',
      merName: '测试商户-1'
    },
    {
      merNo: '123456789012346',
      merName: '测试商户-2'
    }
  ],
  'GET /svc/msp/mer/termNos': (req: Request, res: Response) => {
    const merNo = parse(req.url, true).query.merNo;
    res.send([
      merNo
    ]);
  },
  'POST /svc/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /svc/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /svc/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /svc/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /svc/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
