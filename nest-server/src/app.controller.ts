import { Get, Controller, Res } from '@nestjs/common';
import { resolve } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res) {
    res.sendFile(resolve(__dirname, '../public/index.html'));
  }
}
