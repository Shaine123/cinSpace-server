import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAwDto } from './dto/create-aw.dto';
import { UpdateAwDto } from './dto/update-aw.dto';
import { ENV } from 'src/config/env';
import {  GetObjectCommand, ListObjectsV2Command, ListObjectsV2CommandInput, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService {

  private readonly s3Client:S3Client

  constructor(){
     this.s3Client = new S3Client({
       region: ENV.BUCKET_REGION,
       credentials: {
          accessKeyId: ENV.ACCESS_KEY,
          secretAccessKey: ENV.SECRETE_KEY
       }
     })
  }

  async uploadFile(file: Express.Multer.File){
     const command = new PutObjectCommand({
        Bucket: ENV.BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
     })

     const uploadFile = await this.s3Client.send(command)

     return uploadFile
  }

  async getFile(prefix?:string){
     const params:ListObjectsV2CommandInput = {
       Bucket: ENV.BUCKET_NAME,
       Prefix: prefix
     }

     const data = await this.s3Client.send(new ListObjectsV2Command(params))

     if(!data){
       throw new BadRequestException()
     }

     const files =  data.Contents?.map(async (file) => {
       const key = file.Key!

       const url = await getSignedUrl(this.s3Client, new GetObjectCommand({
         Bucket: ENV.BUCKET_NAME,
         Key: key
       }))

       const type = key.split('.').pop()
       const size = file.Size
       const lastModified = file.LastModified 
       ? new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(file.LastModified)
       : null;

       
    return {
      Key: key,
      Url: url,
      Type: type,
      Size: size,
      LastModified: lastModified,
    };
     })

     return Promise.all(files || [])
  }
  findOne(id: number) {
    return `This action returns a #${id} aw`;
  }

  update(id: number, updateAwDto: UpdateAwDto) {
    return `This action updates a #${id} aw`;
  }

  remove(id: number) {
    return `This action removes a #${id} aw`;
  }
}
