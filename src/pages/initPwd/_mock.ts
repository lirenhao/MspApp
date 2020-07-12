import { Request, Response } from 'express';

function emailCode(_: Request, res: Response) {
  return res.send(Boolean(Math.round(Math.random())));
}

export default {
  'POST /svc/user/fa': emailCode,
  'POST /svc/user/initPwd': [],
};
