import { Request, Response } from 'express';

function getFakeCaptcha(_, res: Response) {
  return res.json('captcha-xxx');
}

export default {
  'POST /api/login': (req: Request, res: Response) => {
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
  'GET  /api/login/captcha': getFakeCaptcha,
};
