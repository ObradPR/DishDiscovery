import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { IFaqDto } from '../../../common/interfaces/faqs.interface';
import { AboutUsService } from '../../../services/about-us.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css',
})
export class FaqsComponent implements OnInit {
  faqs$: Observable<IFaqDto[]> | undefined;
  openedQuestionIndex: number | undefined = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private aboutUsService: AboutUsService
  ) {}

  ngOnInit(): void {
    this.getFaqs();

    setTimeout(() => {
      this.animateContent();
    }, 200);
  }

  getFaqs() {
    this.faqs$ = this.aboutUsService.getFaqs();
  }

  onOpenQuestion(questionIndex: number) {
    const questions =
      this.elementRef.nativeElement.querySelectorAll('.question-row');
    const answers =
      this.elementRef.nativeElement.querySelectorAll('.answer-block');

    questions.forEach((el: HTMLElement, i: number) => {
      this.renderer.removeClass(el, 'question-active');

      this.changeQAStyle(answers[i], 'max-height', 0);
    });

    if (questionIndex === this.openedQuestionIndex) {
      this.openedQuestionIndex = undefined;
      return;
    }

    this.changeQAStyle(
      answers[questionIndex],
      'max-height',
      answers[questionIndex].scrollHeight + 'px'
    );

    this.renderer.addClass(questions[questionIndex], 'question-active');

    this.openedQuestionIndex = questionIndex;
  }

  changeQAStyle(el: HTMLElement, style: string, value: string | number) {
    this.renderer.setStyle(el, style, value);
  }

  animateContent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-scale-in');

          observer.unobserve(entry.target);
        }
      });
    });

    // Set hidden elements
    this.elementRef.nativeElement
      .querySelectorAll('.hidden-el')
      .forEach((el: HTMLElement) => {
        observer.observe(el);
      });
  }
}
