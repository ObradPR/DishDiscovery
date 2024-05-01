import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISiteInfoDto } from '../../common/interfaces/about-us/site-info.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from '../../services/about-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  siteInfo$: Observable<ISiteInfoDto> | undefined;
  contactForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private aboutUsService: AboutUsService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getSiteInfo();
  }

  getSiteInfo() {
    this.siteInfo$ = this.aboutUsService.getSiteInfo();
  }

  formInit() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  onSubmitContact() {
    if (this.contactForm.invalid) return;

    console.log('Contact message sent!');
    this.contactForm.reset();
  }
}
