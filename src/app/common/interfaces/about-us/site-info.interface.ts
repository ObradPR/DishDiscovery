import { ISocialMediaDto } from './social-media.interface';

export interface ISiteInfoDto {
  social_media: ISocialMediaDto;
  contact_info: {
    email: string;
    phone: string;
  };
}
