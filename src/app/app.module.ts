import { APP_INITIALIZER, Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ConceptModule } from './layouts/concept/concept.module';
import { CoreModule } from './core/core.module';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from './store/global.reducer';
import { EffectsModule } from '@ngrx/effects';
import { fetchCategories } from './modules/category/shared/store/category.actions';
import { CategoryModule } from './modules/category/category.module';
import { registerLocaleData } from '@angular/common';

import localePt from '@angular/common/locales/pt'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

registerLocaleData(localePt)

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@Injectable()
export class AppHammerConfig extends HammerGestureConfig {
  override overrides: { [key: string]: Object; } = {
    pinch: { enabled: false },
    rotate: { enabled: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    ConceptModule,
    CategoryModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        const lang = translate.currentLang
        return lang
      },
      deps: [TranslateService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store, translate: TranslateService) => () => {
        translate.setDefaultLang('pt-BR')
        store.dispatch(fetchCategories())
      },
      deps: [Store, TranslateService],
      multi: true
    }, 
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AppHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
