import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../all-entities';
import { Repository } from 'typeorm';
import { HashService } from 'src/shared/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly hasheService:HashService
  ){}

 async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hasheService.hash(createUserDto.password)
    return this.userRepository.save({...createUserDto, password: hashedPassword});
  }

 async findAll() {
    const user = await this.userRepository.find()
     
    if(!user){
       throw new BadRequestException({
         error: 'User is not found'
       })
    }
    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.find({
      where:{
        id: id
      }
   })
   return user;
  }

  async findOneEmail(email:string){
    const user = await this.userRepository.find({
      where:{
        email: email
      }
   })
   return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const userExist = await this.userRepository.findBy({id})
   
    Object.assign(userExist,updateUserDto) 

    this.userRepository.save(userExist)

    return userExist ;
  }

  async remove(id: string) {
    const userExist = await this.userRepository.findBy({id})
    await this.userRepository.remove(userExist)
    return userExist
  }
}
