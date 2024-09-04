import { Injectable } from "@nestjs/common";
import * as bcrpyt from 'bcryptjs'

@Injectable()
export class HashService{
    static readonly SALT_ROUNDS = 5 

    async check(plain:string, hashed:string):Promise<boolean>{
       return await bcrpyt.compare(plain,hashed)
    }

    async hash(plain:string):Promise<string>{
       return await bcrpyt.hash(plain,HashService.SALT_ROUNDS)
    }
}