import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent, DefaultPageComponent, PageComponent } from './app.component';

import { ApiService } from './shared';
// import { routing } from './app.routing';

import { OnsenModule, OnsNavigator, CUSTOM_ELEMENTS_SCHEMA } from 'angular2-onsenui/src/angular2-onsenui';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    OnsenModule,
    // routing
  ],
  declarations: [
    AppComponent, DefaultPageComponent, PageComponent
  ],
  entryComponents: [DefaultPageComponent, PageComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,
    OnsNavigator
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
