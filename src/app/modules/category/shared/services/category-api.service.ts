import { Injectable } from '@angular/core';
import { HttpApiService } from '@core/services/http-api.service';
import { Category } from '@category/shared/interfaces/category';
import { CommonService } from '@core/interfaces/common-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService implements CommonService<Category> {

  constructor(
    private httpApiService: HttpApiService
  ) { }

  create = ({name}: Partial<Category>) => this.httpApiService.post<Category, Partial<Category>>(`api/v1/categoria`, {name})
  list = () => this.httpApiService.get<Category[]>(`api/v1/categoria`)
  detail = (id: string) => this.httpApiService.get<Category>(`api/v1/categoria/${id}`)
  remove = (id: string) => this.httpApiService.delete(`api/v1/categoria/${id}`)
}
