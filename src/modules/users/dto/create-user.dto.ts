export class CreateUserDto {
  name: string;
  login: string;
  password: string;
  role: 'ADMIN' | 'USER';
}
