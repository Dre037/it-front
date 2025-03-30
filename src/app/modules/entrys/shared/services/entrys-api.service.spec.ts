import { TestBed } from '@angular/core/testing';
import { EntrysApiService } from './entrys-api.service';
import { HttpApiService } from '@core/services/http-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Entrys } from '../interfaces/entrys';
import { of } from 'rxjs';

describe('EntrysApiService', () => {
  let service: EntrysApiService;
  let httpTestingController: HttpTestingController;
  let httpApiServiceMock = {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: HttpApiService, useValue: httpApiServiceMock }
      ]
    });
    service = TestBed.inject(EntrysApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should call post with parameters', () => {
      const mockEntrys: Partial<Entrys> = { idCategoria: 'A', description: 'Gasto com turismo', date: '30/03/2025', value: 100 }
      const response: Entrys = { id: 'A1', idCategoria: 'A', description: 'Gasto com turismo', date: '30/03/2025', value: 100 };

      httpApiServiceMock.post.mockReturnValue(of(response))

      service.create(mockEntrys).subscribe((Entrys) => {
        expect(Entrys).toEqual(response)
      })

      expect(httpApiServiceMock.post).toHaveBeenCalledWith(
        'api/v1/lancamento',
        { ...mockEntrys }
      )
    })
  })

  describe('list', () => {
    it('should call get and return list of entrys', () => {
      const mockEntrys: Entrys[] = [
        { id: 'A1', idCategoria: 'A', description: 'Gasto com turismo', date: '30/03/2025', value: 100 },
        { id: 'A2', idCategoria: 'A', description: 'Gasto com paisagismo', date: '30/03/2025', value: 50 },
      ]

      httpApiServiceMock.get.mockReturnValue(of(mockEntrys))

      service.list().subscribe((entrys) => {
        expect(entrys).toEqual(mockEntrys)
      })

      expect(httpApiServiceMock.get).toHaveBeenCalledWith('api/v1/lancamento')
    })
  })

  describe('detail', () => {
    it('should call get and return detail of unique entrys', () => {
      const mockEntrys: Entrys = { id: 'A1', idCategoria: 'A', description: 'Gasto com turismo', date: '30/03/2025', value: 100 }

      httpApiServiceMock.get.mockReturnValue(of(mockEntrys))

      service.detail(mockEntrys.id).subscribe((Entrys) => {
        expect(Entrys).toEqual(mockEntrys)
      })

      expect(httpApiServiceMock.get).toHaveBeenCalledWith(`api/v1/lancamento/${mockEntrys.id}`)
    })
  })

  describe('remove', () => {
    it('should call delete with correct id', () => {
      const entrysId = 'A'

      httpApiServiceMock.delete.mockReturnValue(of(null))
      
      service.remove(entrysId).subscribe((response) => {
        expect(response).toBeNull()
      })

      expect(httpApiServiceMock.delete).toHaveBeenCalledWith(`api/v1/lancamento/${entrysId}`)
    })
  })
});
