import { CustomDecorator, SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'roles'
export const Roles = (...roles:string[]):CustomDecorator => {
   return SetMetadata(ROLES_KEY,roles)
}