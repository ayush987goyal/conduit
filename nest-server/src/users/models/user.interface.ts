import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly bio: string;
  readonly image: string;
  readonly favorites: any[];
  readonly following: User[];
  readonly setPassword: (password: string) => void;
  readonly validatePassword: (password: string) => boolean;
  readonly makeJWT: () => string;
  readonly getAuthJson: () => any;
  readonly getProfileJson: () => any;
}
