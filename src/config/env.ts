import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { AllEntities } from 'src/core-modules/all-entities'

class EnvConfig {
   private readonly envConfig: { [key:string]: string}

   constructor() {
     dotenv.config()
     this.envConfig = process.env
   }

   get PORT(): number {
      return +this.envConfig['PORT'] || 3002
   }

   get JWT_SECRETE():string {
       return this.envConfig['JWT_TOKEN '] || 'cin-space-the-best'
   }

   get BUCKET_NAME():string{
       return this.envConfig['BUCKET_NAME'] 
   }

   get BUCKET_REGION():string{
      return this.envConfig['BUCKET_REGION'] || 'ap-southeast-2'
  }

  get ACCESS_KEY():string{
   return this.envConfig['ACCESS_KEY'] 
  }

  get SECRETE_KEY():string{
   return this.envConfig['SECRETE_KEY'] 
  }

  get CLIENT_ID():string{
    return this.envConfig['CLIENT_ID']
  }

  get CLIENT_SECRETE():string{
   return this.envConfig['CLIENT_SECRETE']
 }

 get CALLBACK_URL():string{
   return this.envConfig['CALLBACK_URL']
 }


   get DB_CONFIGURATION(): TypeOrmModuleOptions {
     return {
        type: 'postgres',
        host: this.envConfig['DB_HOST'],
        port: +this.envConfig['DB_PORT'],
        username: this.envConfig['DB_USERNAME'],
        password: this.envConfig['DB_PASSWORD'],
        database: this.envConfig['DB_NAME'],
        entities: AllEntities,
        retryAttempts: 5,
        synchronize: true
     }
   }
}

export const ENV = new EnvConfig();
