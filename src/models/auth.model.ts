export interface User {
  id:string,
  fullName:string,
  title:string,
  username:string
}

export interface LoginRequest {
  username:string,
  password:string
}

export type LoginResult = {
  user: User
  token: string
}

export type RegisterResult = User & {
  isActive:boolean,
  birthday:string,
  CCCD:string,
  password:string,
}

export type RegisterRequest = User
