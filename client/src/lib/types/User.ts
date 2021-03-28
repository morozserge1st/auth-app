export type User = {
  id?: string,
  email: string,
  password: string,
  fullName: string,
}

export type LoginUser = Pick<User, 'email' | 'password'>;