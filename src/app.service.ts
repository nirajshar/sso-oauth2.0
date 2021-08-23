import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public sessID = [];

  getHello() {
    return {
      msg: 'SSO Portal',
    };
  }

  async createCookie(req, res) {
    const accessToken = req.sessionID;
    res.cookie('accessToken', accessToken, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return {
      sessionID: req.sessionID,
    };
  }
}
