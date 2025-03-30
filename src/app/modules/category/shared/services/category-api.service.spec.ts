import { TestBed } from '@angular/core/testing';

import { CategoryApiService } from './category-api.service';
import { HttpApiService } from '@core/services/http-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Category } from '../interfaces/category';
import { of } from 'rxjs';

describe('CategoryApiService', () => {
  let service: CategoryApiService;
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
    service = TestBed.inject(CategoryApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should call post with parameters', () => {
      const mockCategory: Partial<Category> = { name: 'Turismo' }
      const response: Category = { id: 'A', name: 'Turismo' };

      httpApiServiceMock.post.mockReturnValue(of(response))

      service.create(mockCategory).subscribe((category) => {
        expect(category).toEqual(response)
      })

      expect(httpApiServiceMock.post).toHaveBeenCalledWith(
        'api/v1/categoria',
        { name: mockCategory.name }
      )
    })
  })

  describe('list', () => {
    it('should call get and return list of categories', () => {
      const mockCategories: Category[] = [
        { id: 'A', name: 'Turismo' },
        { id: 'B', name: 'Paisagismo' }
      ]

      httpApiServiceMock.get.mockReturnValue(of(mockCategories))

      service.list().subscribe((categories) => {
        expect(categories).toEqual(mockCategories)
      })

      expect(httpApiServiceMock.get).toHaveBeenCalledWith('api/v1/categoria')
    })
  })

  describe('detail', () => {
    it('should call get and return detail of unique category', () => {
      const mockCategory: Category = { id: 'A', name: 'Turismo' }

      httpApiServiceMock.get.mockReturnValue(of(mockCategory))

      service.detail(mockCategory.id).subscribe((category) => {
        expect(category).toEqual(mockCategory)
      })

      expect(httpApiServiceMock.get).toHaveBeenCalledWith(`api/v1/categoria/${mockCategory.id}`)
    })
  })

  describe('remove', () => {
    it('should call delete with correct id', () => {
      const categoryId = 'A'

      httpApiServiceMock.delete.mockReturnValue(of(null))
      
      service.remove(categoryId).subscribe((response) => {
        expect(response).toBeNull()
      })

      expect(httpApiServiceMock.delete).toHaveBeenCalledWith(`api/v1/categoria/${categoryId}`)
    })
  })
});
