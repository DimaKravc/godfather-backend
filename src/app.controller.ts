import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Render,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { NestCsrfRequest, Csrf } from 'ncsrf';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  root(@Req() req: NestCsrfRequest) {
    return { csrfToken: req.csrfToken() };
  }

  @Post('/api/contacts/')
  @Csrf()
  async saveContacts(@Req() req: NestCsrfRequest, @Res() res) {
    const { _csrf, ...contacts } = req.body;

    try {
      await this.appService.saveContacts(contacts);

      return res.status(HttpStatus.ACCEPTED).json({ result: true });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: 'Some Error',
          },
          HttpStatus.CONFLICT,
        );
      }

      throw err;
    }
  }
}
