import { AuthInterface } from 'src/shared/interfaces/auth.interface';
import { tags } from 'typia';

export interface SignupInterface extends AuthInterface {
  name: string & tags.MinLength<1> & tags.MaxLength<100>;
}
export interface LoginInterface extends AuthInterface {
  deviceId: string & tags.MinLength<1> & tags.MaxLength<100>;
}

interface TokenArrayInterface {
  [x: string]: string;
}

export interface AuthRedisInterface {
  accessToken: TokenArrayInterface[];
  refreshToken: TokenArrayInterface[];
}
