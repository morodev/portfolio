import {Component, OnInit} from '@angular/core';
import {merge, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {PortfolioService} from "./portfolio.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'portfolio';
  portfolioLoaded: any;
  titleHover: string = '';
  subTitleHover: string = '';
  pathImage: string = '';

  constructor(private _portfolioService: PortfolioService,
              public _datePipe: DatePipe) {
  }

  ngOnInit() {
      this._portfolioService.getPortfolio().subscribe(res => {
        if (res && res.results && res.results.length > 0) {
          this.portfolioLoaded = res.results[0];
          this.pathImage = this.portfolioLoaded.picture.large;
          this.titleHover = 'Hi, my name is';
          this.subTitleHover = this.portfolioLoaded.name.first + ' ' + this.portfolioLoaded.name.last;
        }
      });
  }

  setPortfolioData(typeHover: string): void {
    if (typeHover === 'face') {
      this.titleHover = 'Hi, my name is';
      this.subTitleHover = this.portfolioLoaded.name.first + ' ' + this.portfolioLoaded.name.last;
    }

    if (typeHover === 'mail_outline') {
      this.titleHover = 'My email address is';
      this.subTitleHover = this.portfolioLoaded.email
    }

    if (typeHover === 'event_note') {
      this.titleHover = 'My birthday is';
      let date = this._datePipe.transform(this.portfolioLoaded.dob.date, 'yyyy-MM-dd');
      this.subTitleHover =  (date) ? date.toString() : '';
    }

    if (typeHover === 'map') {
      this.titleHover = 'My address is';
      this.subTitleHover = this.portfolioLoaded.location.street.number + ' ' + this.portfolioLoaded.location.street.name;
    }

    if (typeHover === 'call') {
      this.titleHover = 'My phone number is';
      this.subTitleHover = this.portfolioLoaded.phone
    }

    if (typeHover === 'lock') {
      this.titleHover = 'My password is';
      this.subTitleHover = this.portfolioLoaded.login.password
    }
  }
}
