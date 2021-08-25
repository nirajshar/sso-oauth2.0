import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApplicationService } from 'src/application/application.service';
import { UserService } from 'src/user/user.service';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly applicationService: ApplicationService,
  ) {}

  async login(req, res) {
    const { serviceURL } = req.query;

    const applications = await this.applicationService.getListOfApplications();

    if (applications.statusCode !== 200) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Applications not found',
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (serviceURL != null) {
      const url = new URL(serviceURL);
      if (applications.applications.includes(url.origin)) {
        throw new HttpException(
          {
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Service URL not recognized',
            error: 'Forbidden',
          },
          HttpStatus.FORBIDDEN,
        );
      }
    }

    if (req.session.user != null && serviceURL == null) {
      // return res.redirect('/');
    }

    if (req.session.user != null && serviceURL != null) {
      const url = new URL(serviceURL);
      const intrmid = await uuid().replace(/-/gi, '');
      // storeApplicationInCache(url.origin, req.session.user, intrmid);
      return res.redirect(`${serviceURL}?ssoToken=${intrmid}`);
    }

    // return res.render('login', {
    //   title: 'SSO-Server | Login',
    // });
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
