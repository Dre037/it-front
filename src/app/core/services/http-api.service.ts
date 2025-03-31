import { HttpClient, HttpErrorResponse, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {

  constructor(
    private http: HttpClient
  ) { }

  get<T>(endpoint: string, qs?: any): Observable<T> {
    const params = qs ? new HttpParams({
      fromString: JSON.stringify(qs)
    }) : {}

    return this.doRequest<T>('GET', endpoint, null, params)
  }

  post<T, P>(endpoint: string, payload: P): Observable<T> {
    return this.doRequest<T>('POST', endpoint, payload)
  }

  put<T, P>(endpoint: string, payload: P): Observable<T> {
    return this.doRequest<T>('PUT', endpoint, payload)
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.doRequest<T>('DELETE', endpoint, null)
  }

  private doRequest<T>(method: string, path: string, payload: any, httpOptions?: any): Observable<any> {
    const params = [httpOptions]

    if (payload) {
      params.push({body: payload})
    }

    const config = Object.assign({}, ...params)
    const httpConfig = Object.assign(config, { headers: {} })
    const url = this.parseUri(path)

    return this.http.request(method, url, httpConfig).pipe(retry(2), catchError(error => this.handleError(error)))
  }

  protected parseUri(uri: string) {
    return `${environment.API_BASE_URL}/${uri}`
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(error.message))
  }
}
