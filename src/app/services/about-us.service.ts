import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { IFaqDto } from '../common/interfaces/faqs.interface';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private dataService: DataService) {}

  getFaqs(): Observable<IFaqDto[]> {
    return this.dataService.get('faqs.json');
  }
}
