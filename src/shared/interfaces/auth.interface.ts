import { tags } from 'typia';

export interface AuthInterface {
  email: string & tags.MinLength<1> & tags.MaxLength<100>;
  password: string & tags.MinLength<6> & tags.MaxLength<100>;
}
