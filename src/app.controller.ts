import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('default')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @ApiOperation({
     description:'This is the first route'
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
