import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../all-entities";
import { UsersService } from "../users/users.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
  
  private readonly userService:UsersService
  serializeUser(user: User, done: (err: Error, user: any) => void) {
    done(null, user.id); // Only storing the user ID in the session
  }

  async deserializeUser(userId: string, done: (err: Error, user: any) => void) {
    const user = await this.userService.findOne(userId); // Ensure findById method is implemented
    done(null, user);
  }
}