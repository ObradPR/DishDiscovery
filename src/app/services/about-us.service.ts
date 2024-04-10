import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { IFaqDto } from '../common/interfaces/about-us/faq.interface';
import { IAboutUsDto } from '../common/interfaces/about-us/about-us.interface';
import { ISiteStatisticDto } from '../common/interfaces/about-us/site-statistic.interface';
import { ITestimonialDto } from '../common/interfaces/about-us/testimonial.interface';
import { ISiteInfoDto } from '../common/interfaces/about-us/site-info.interface';
import { ISocialMediaDto } from '../common/interfaces/about-us/social-media.interface';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private dataService: DataService) {}

  getFaqs(): Observable<IFaqDto[]> {
    return this.dataService.get('faqs.json');
  }

  getSiteStatistic(): Observable<ISiteStatisticDto> {
    return this.dataService
      .get<IAboutUsDto>('about-us.json')
      .pipe(map((res) => res.statistics));
  }

  getTestimonials(): Observable<ITestimonialDto[]> {
    return this.dataService
      .get<IAboutUsDto>('about-us.json')
      .pipe(map((res) => res.testimonials));
  }

  getSiteInfo(): Observable<ISiteInfoDto> {
    return this.dataService.get<IAboutUsDto>('about-us.json').pipe(
      map((res) => {
        const socialMedia: ISocialMediaDto = res.social_media;
        const contactInfo = {
          email: res.contact_info.email,
          phone: res.contact_info.phone,
        };

        return { social_media: socialMedia, contact_info: contactInfo };
      })
    );
  }
}
