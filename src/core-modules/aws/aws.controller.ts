import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AwsService } from './aws.service';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Aws S3')
@Controller('aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File){
    return this.awsService.uploadFile(file)
  }

 

  @Get('retrieve')
  getFile() {
    return this.awsService.getFile();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwDto: UpdateAwDto) {
    return this.awsService.update(+id, updateAwDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awsService.remove(+id);
  }
}
