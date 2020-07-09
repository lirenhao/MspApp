import { Request, Response } from 'express';

function emailCode(_: Request, res: Response) {
  return res.send(Boolean(Math.round(Math.random())));
}

export default {
  'GET /svc/msp/emailCode/send': emailCode,
};
