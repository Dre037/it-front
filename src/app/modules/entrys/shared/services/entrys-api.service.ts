import { Injectable } from '@angular/core';
import { HttpApiService } from 'src/app/core/services/http-api.service';
import { Entrys } from '../interfaces/entrys';

@Injectable({
  providedIn: 'root'
})
export class EntrysApiService {

  constructor(
    private httpApiService: HttpApiService
  ) { }

  create = (payload: Partial<Entrys>) => this.httpApiService.post<Entrys, Partial<Entrys>>(`api/v1/lancamento`, payload)
  list = () => this.httpApiService.get<Entrys[]>(`api/v1/lancamento`)
  detail = (id: string) => this.httpApiService.get<Entrys>(`api/v1/lancamento/${id}`)
  remove = (id: string) => this.httpApiService.delete(`api/v1/lancamento/${id}`)
}
