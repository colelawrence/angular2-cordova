import {
  Component,
  ViewChild,
  Params,
  OnsNavigator,
  OnsenModule,
  NgModule, ApplicationRef,
  CUSTOM_ELEMENTS_SCHEMA
} from 'angular2-onsenui/src/angular2-onsenui';

import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { ApiService } from './shared';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="left"><ons-back-button>Back</ons-back-button></div>
      <div class="center">Page {{ currentPage }}</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push()">push</ons-button>
        <ons-button (click)="pop()">pop</ons-button>
        <p>Page {{ currentPage }}</p>
      </div>
    </div>
  `
})
export class PageComponent {
  currentPage: number

  constructor(private _navigator: OnsNavigator, private _params: Params) {
    console.log('parameters:', _params.data)
    let pageNumberFromData = _params.at("PageNumber")
    this.currentPage = typeof(pageNumberFromData) === 'number' ? pageNumberFromData : 1
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {
      animation: 'slide',
      data: { PageNumber: this.currentPage + 1 }
    })
  }

  pop() {
    console.log("Pop from: ", this.currentPage)
    this._navigator.element.popPage();
  }
}

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="center">Page</div>
    </ons-toolbar>
    <div class="content">
      <div id="message">{{msg}}</div>
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push(navi)">push</ons-button>
      </div>
    </div>
  `
})
class DefaultPageComponent {
  msg = 'Click to push:'

  constructor(private _navigator: OnsNavigator) {
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {data: {hoge: "fuga"}});
  }
}

@Component({
  selector: 'my-app',
  template: `
  <ons-navigator [page]="page"></ons-navigator>
  `
})
export class AppComponent {
  page = DefaultPageComponent
}

@NgModule({
  imports: [OnsenModule],
  declarations: [AppComponent, DefaultPageComponent, PageComponent],
  entryComponents: [DefaultPageComponent, PageComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ApiService,
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
