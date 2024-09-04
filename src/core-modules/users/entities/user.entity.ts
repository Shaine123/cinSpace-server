import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id:string

  @ApiProperty()
  @Column({unique: true})
  username: string
 
  @ApiProperty()
  @Column({unique:true})
  email: string

  @ApiProperty()
  @Column()
  phonenumber:string

  @ApiProperty()
  @Column()
  password: string


}
