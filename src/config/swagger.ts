import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SetUpSwagger = (
   path: string ,
   app: INestApplication
):void => {
   const config = new DocumentBuilder()
   .setTitle('API CinSpace')
   .setDescription('Documentation of CinSpace Api')
   .setVersion('1.1.1')
   .addBearerAuth()
   .addTag('cats')
   .build()

   const document = SwaggerModule.createDocument(app,config)
   SwaggerModule.setup(path, app, document, {
     swaggerOptions: {
        persistentAuthorization:true
     }
   })
}