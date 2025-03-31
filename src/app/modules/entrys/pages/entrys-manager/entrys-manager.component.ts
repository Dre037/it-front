import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, filter, map, mergeMap, switchMap, take } from 'rxjs';
import { Entrys } from '@entrys/shared/interfaces/entrys';
import { EntrysApiService } from '@entrys/shared/services/entrys-api.service';
import { MatDialog } from '@angular/material/dialog';
import { EntrysFormComponent } from '@entrys/components/entrys-form/entrys-form.component';
import { CommonManager } from '@core/common/common-manager';
import { select, Store } from '@ngrx/store';
import { CategoryState } from '@category/shared/store/category.reducer';
import { selectCategories } from '@category/shared/store/category.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '@category/shared/interfaces/category';
import { ArcElement, Chart, DoughnutController, Legend, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-entrys-manager',
  templateUrl: './entrys-manager.component.html',
  styleUrls: ['./entrys-manager.component.scss']
})
export class EntrysManagerComponent extends CommonManager<EntrysApiService, Entrys> implements OnInit {
  @ViewChild('chart', { static: false }) canvas: ElementRef<HTMLCanvasElement>
  @ViewChild('chartContainer', { static: false }) container: ElementRef<HTMLDivElement>
  public initialState!: Entrys[]

  protected chart: Chart<'doughnut'>

  constructor(
    private store: Store<{ categoryState: CategoryState }>,
    private entrysApiService: EntrysApiService,
    matDialog: MatDialog,
    matSnackbar: MatSnackBar,
    private translate: TranslateService
  ) { 
    super(entrysApiService, matDialog, matSnackbar, translate)
    Chart.register(
      ArcElement,
      Tooltip,
      Legend,
      Title,
      DoughnutController
    )
  }

  ngOnInit(): void {
    this.load()

    const classObserve = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName == 'class') {
          this.chart.destroy()
          this.createChart()
        }
      })
    })

    classObserve.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    const resizeObserver = new ResizeObserver(() => {
      if (this.chart) {
        this.chart.destroy()
        this.createChart()
      }
    })

    resizeObserver.observe(document.body)
  }

  public override load(): void {
    this.entrysApiService.list().pipe(
      mergeMap(items => this.store.pipe(select(selectCategories), map(categories => {
        return items.map(m => ({
          ...m,
          category: categories.find(f => f.id == m.idCategoria)?.name
        }))
      }))),
      take(1)
    ).subscribe(items => {
      this.initialState = items
      this.itemsSubj.next(items)
      if (this.chart) this.chart.destroy()
      this.createChart()
    })
  }

  public open() {
    this.openDialog(EntrysFormComponent, true)
  }

  public removeEntry(entry: Entrys) {
    this.remove(entry.id)
  }

  public filterByFields(event: { description: string, categories: Category[] }) {
    const items = this.initialState
    if (event.description) {
      return this.itemsSubj.next(items.filter(f => f.description.startsWith(event.description)))
    }

    if (event.categories.length == 0) {
      return this.itemsSubj.next(this.initialState)
    }

    const filtered = items.filter(f => event.categories.map(m => m.id).includes(f.idCategoria))
    this.itemsSubj.next(filtered)    
  }

  protected createChart() {
    const items = this.itemsSubj.getValue()
    const canvas = this.canvas.nativeElement

    const stringForColorHex = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let color = "#";
      for (let i = 0; i < 3; i++) {
        let val = (hash >> (i * 8)) & 0xFF;
        color += ("00" + val.toString(16)).slice(-2)
      }
      return color
    }

    const dataset = items.map(m => ({
      category: m.category,
      value: m.value
    })).reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = 0;
      acc[item.category] += item.value
      return acc
    }, {})

    const keys = Object.keys(dataset)
    const values = Object.values(dataset) as number[]

    this.chart = new Chart<"doughnut", number[], string>(canvas.getContext('2d'), {
      data: {      
        labels: [
          ...keys
        ],
        datasets: [{
          data: [...values],
          backgroundColor: keys.map(m => stringForColorHex(m)),
          hoverOffset: 4
        }],
      },
      type: 'doughnut',
      options: {
        layout: {
          autoPadding: false,
          padding: 8
        },
        plugins: {
          title: {
            display: true,
            padding: 16,
            text: this.translate.instant('ENTRYS.CATEGORY_X_VALUE'),
            fullSize: true,
            color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#3b3b3b',
          },
          legend: {
            fullSize: true,
            display: true,
            labels: {
              color: document.body.classList.contains('dark-theme') ? '#ffffff' : '#3b3b3b',
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ''

                if (label) {
                  label += ": "
                }

                if (context.parsed != null) {
                  label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed)
                }

                return label
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        },
        responsive: true,
        circumference: 360,
        radius: (window.innerWidth * 0.25) * 0.5,
        offset: 32,
        rotation: 90,
        spacing: 0,
      }
    })
  }
}
