import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from '../../services/about-us.service';
import { Observable } from 'rxjs';
import { ISiteInfoDto } from '../../common/interfaces/about-us/site-info.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  $siteInfo: Observable<ISiteInfoDto> | undefined;
  newsletterForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private aboutUsService: AboutUsService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getSiteInfo();
  }

  getSiteInfo() {
    this.$siteInfo = this.aboutUsService.getSiteInfo();
  }

  formInit() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  onAddSubscription() {
    if (this.newsletterForm.value.email === '' || this.newsletterForm.invalid)
      return;

    console.log('Newsletter Email Sent!');
    this.newsletterForm.reset();
  }
}
