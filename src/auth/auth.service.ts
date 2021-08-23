import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  


  async login(req) {
    const { serviceURL } = req.query;    
  }

  async doLogin() {
    return {
      msg: 'POST LOGIN with CREDENTIALS',
    };
  }

  async verifyToken() {
    return {
      msg: 'GET VERIFY TOKEN Validation',
    };
  }
}
