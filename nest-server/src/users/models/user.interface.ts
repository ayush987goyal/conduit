import { Document } from 'mongoose';
import { UserAuthDto } from './user-auth.dto';
import { UserProfileDto } from './user-profile.dto';

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
  readonly getAuthJson: () => UserAuthDto;
  readonly getProfileJson: () => UserProfileDto;
}
