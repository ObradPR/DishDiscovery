import { ISocialMediaDto } from '../about-us/social-media.interface';
import { ILocationDto } from './location.interface';

export interface IUserDto {
  user_id: number;
  username: string;
  email: string;
  full_name: string;
  birthdate: string;
  gender: string;
  location: ILocationDto;
  profile_picture: string;
  followers: number;
  following: number;
  recipes_count: number;
  social_media_accounts: ISocialMediaDto;
  created_at: string;
  last_login: string;
}
