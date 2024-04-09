import { ISiteStatisticDto } from './site-statistic.interface';
import { ISocialMediaDto } from './social-media.interface';
import { ITestimonialDto } from './testimonial.interface';

export interface IAboutUsDto {
  social_media: ISocialMediaDto;
  contact_info: {
    email: string;
    phone: string;
  };
  statistics: ISiteStatisticDto;
  testimonials: ITestimonialDto[];
}
