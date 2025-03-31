import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HttpApiService } from './http-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('HttpApiService', () => {
  let service: HttpApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpApiService]
    });
    service = TestBed.inject(HttpApiService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform a GET request', () => {
    const data = { message: 'success' }
    service.get('test-endpoint').subscribe(response => {
      expect(response).toEqual(data)
    })

    const req = httpMock.expectOne(`${environment.API_BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(data)
  })

  it('should perform a POST request', () => {
    const data = { success: true };
    const payload = { name: 'Test' };

    service.post('test-endpoint', payload).subscribe(response => {
      expect(response).toEqual(data)
    })

    const req = httpMock.expectOne(`${environment.API_BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(data)
  })

  it('should perform a PUT request', () => {
    const data = { updated: true };
    const payload = { name: 'updated' };

    service.put('test-endpoint', payload).subscribe(response => {
      expect(response).toEqual(data)
    })

    const req = httpMock.expectOne(`${environment.API_BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload)
    req.flush(data)
  })

  it('should perform a DELETE request', () => {
    const data = { deleted: true }
    
    service.delete('test-endpoint').subscribe(response => {
      expect(response).toEqual(data)
    })

    const req = httpMock.expectOne(`${environment.API_BASE_URL}/test-endpoint`);
    expect(req.request.method).toBe('DELETE');
    req.flush(data)
  })

  it('should handle errors correctly', () => {
    const mockError = new HttpErrorResponse({
      error: 'Error message',
      status: 404,
      statusText: 'Not found'
    })

    service['handleError'](mockError).subscribe(({
      error: (err) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.message).toBe('Error message')
      }
    }))
  });

});
