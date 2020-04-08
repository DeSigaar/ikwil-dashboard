interface iNewUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  admin?: boolean;
}
interface iLogin {
  email: string;
  password: string;
  admin?: boolean;
}
