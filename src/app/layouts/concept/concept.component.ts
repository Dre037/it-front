import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConceptLayout implements OnInit, OnDestroy {

  public links = [
    { icon: 'category', title: 'MENU.CATEGORY', route: '/category' },
    { icon: 'receipt_long', title: 'MENU.ENTRYS', route: '/entrys'}
  ]

  public currentUrl!: string

  private unsubscribe$ = new Subject<void>()

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('theme') == 'light') this.setupLight()
    else this.setupDark()

    this.activatedRoute.url.pipe(takeUntil(this.unsubscribe$)).subscribe(url => {
      this.currentUrl = `/${url[0]?.path}`
    })
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next()
      this.unsubscribe$.complete()
  }

  public setupLight() {
    document.body.classList.remove('dark-theme')
    localStorage.setItem('theme', 'light')
  }
  
  public setupDark() {
    document.body.classList.add('dark-theme')
    localStorage.setItem('theme', 'dark')
  }
}
