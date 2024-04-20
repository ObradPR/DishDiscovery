import { Component, OnInit } from '@angular/core';
import { ITestimonialDto } from '../../../common/interfaces/about-us/testimonial.interface';
import { Observable } from 'rxjs';
import { AboutUsService } from '../../../services/about-us.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
})
export class TestimonialsComponent implements OnInit {
  testimonials$: Observable<ITestimonialDto[]> | undefined;

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials() {
    this.testimonials$ = this.aboutUsService.getTestimonials();
  }
}
