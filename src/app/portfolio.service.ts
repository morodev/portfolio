import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private _portfolio: BehaviorSubject<any | null> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient)
  {
  }


  /**
   * Get portfolio
   */
  getPortfolio(): Observable<any>
  {
    return this._httpClient.get<any>(environment.server + '/api').pipe(
      tap((portfolio) => {
        this._portfolio.next(portfolio);
      })
    );
  }
}
