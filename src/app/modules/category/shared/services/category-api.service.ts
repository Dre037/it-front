import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(
    private httpApiService: HttpApiService
  ) { }

  create = ({name}: Partial<Category>) => this.httpApiService.post<Category, Partial<Category>>(`api/v1/categoria`, {name})
  list = () => this.httpApiService.get<Category[]>(`api/v1/categoria`)
  detail = (id: string) => this.httpApiService.get<Category>(`api/v1/categoria/${id}`)
  remove = (id: string) => this.httpApiService.delete(`api/v1/categoria/${id}`)
}
