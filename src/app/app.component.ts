import { Component, ViewChild } from '@angular/core'
import { OnsNavigator, Params } from 'angular2-onsenui'

import { ApiService } from './shared'

import '../style/app.scss'

@Component({
  selector: 'ons-page',
  template: `
    <ons-toolbar>
      <div class="left"><ons-back-button>Back</ons-back-button></div>
      <div class="center">Page2</div>
    </ons-toolbar>
    <div class="content">
      <div style="text-align: center; margin: 10px">
        <ons-button (click)="push()">push</ons-button>
        <ons-button (click)="pop()">pop</ons-button>
        <p>page2</p>
      </div>
    </div>
  `
})
export class PageComponent {
  constructor(private _navigator: OnsNavigator, private _params: Params) {
    console.log('parameters:', _params.data);
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {animation: 'slide', data: {aaa: 'bbb'}});
  }

  pop() {
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
export class DefaultPageComponent {
  msg = 'Click to push:'

  constructor(private _navigator: OnsNavigator) {
  }

  push() {
    this._navigator.element.pushPage(PageComponent, {data: {hoge: "fuga"}});
  }
}

@Component({
  selector: 'my-app', // <my-app></my-app>
  template: require('./app.component.html'),
  styles: [ require('./app.component.scss') ],
})
export class AppComponent {
  page = DefaultPageComponent
}
