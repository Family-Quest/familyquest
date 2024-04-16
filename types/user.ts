export interface UserForm {
  email: string
  password: string
}

export type UserPasswordForm = Pick<UserForm, 'password'>
