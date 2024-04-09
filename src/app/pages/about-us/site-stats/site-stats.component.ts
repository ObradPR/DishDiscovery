import { Component, OnInit } from '@angular/core';
import { ISiteStatisticDto } from '../../../common/interfaces/about-us/site-statistic.interface';
import { Observable } from 'rxjs';
import { AboutUsService } from '../../../services/about-us.service';

@Component({
  selector: 'app-site-stats',
  templateUrl: './site-stats.component.html',
  styleUrl: './site-stats.component.css',
})
export class SiteStatsComponent implements OnInit {
  $stats: Observable<ISiteStatisticDto> | undefined;

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.getSiteStats();
  }

  getSiteStats() {
    this.$stats = this.aboutUsService.getSiteStatistic();
  }
}
