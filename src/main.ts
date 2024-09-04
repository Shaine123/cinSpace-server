import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetUpSwagger } from 'src/config/swagger';
import { ENV } from 'src/config/env';
import * as session from 'express-session'
import * as passport from 'passport'
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.use(cors({
     origin: 'http://localhost:5173'
  }))
  SetUpSwagger('swagger',app)
  app.use(session({
     secret: 'dadada1ada',
     saveUninitialized: false,
     resave: false,
     cookie: {
       maxAge: 6000
     }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(ENV.PORT);
}
bootstrap();
