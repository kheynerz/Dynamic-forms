import { Injectable } from '@angular/core';


import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Option } from './options';

import { HttpErrorHandler, HandleError } from '../ErrorHandler';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  httpErrorHandler = new HttpErrorHandler()
  handleError: HandleError
  constructor(private http: HttpClient,) {
    this.handleError = this.httpErrorHandler.createHandleError('OptionsService')
  }

  getOptions(url: string): Observable<Option[]>{
    return this.http.get<Option[]>(url)
      .pipe(
        catchError(this.handleError('getOptions', []))
      );
  }

}
