import { Request, Response } from 'express';

function getFakeCaptcha(_: Request, res: Response) {
  return res.json('captcha-xxx');
}

export default {
  'POST /svc/login': (req: Request, res: Response) => {
    const { password, username } = req.body;
    if (password === '111111' && username === '123456789012345') {
      res.send({
        status: 'ok',
        token: 'token',
      });
      return;
    }
    res.send({
      status: 'error',
    });
  },
  'GET  /svc/login/captcha': getFakeCaptcha,
};
