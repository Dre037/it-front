import { Observable } from "rxjs"

export interface CommonService<T> {
    create: (payload: T) => Observable<any>
    list: () => Observable<T[]>
    detail: (id: any) => Observable<T>
    remove: (id: any) => Observable<any>
}
