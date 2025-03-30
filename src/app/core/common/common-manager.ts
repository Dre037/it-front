import { Component, ComponentDecorator, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, filter, Observable, switchMap, take } from "rxjs";
import { DialogRemoveComponent } from "../components/dialog-remove/dialog-remove.component";

interface CommonService {
    create: (payload: any) => Observable<any>
    list: () => Observable<any>
    detail: (id: any) => Observable<any>
    remove: (id: any) => Observable<any>
}

export class CommonManager<S extends CommonService, T> {

    public itemsSubj = new BehaviorSubject<T[]>([])
    public items$ = this.itemsSubj.asObservable()

    constructor(private service: S, private matDialog: MatDialog) {

    }

    public load() {
        this.service.list().pipe(
            take(1)
        ).subscribe(list => {
            this.itemsSubj.next(list)
        })
    }

    public openDialog(component: any) {
        const dialog = this.matDialog.open(component, {
            position: {
                top: '24px'
            }
        })

        dialog.afterClosed().pipe(
            filter(f => f && true),
            switchMap(payload => this.service.create(payload)),
            take(1)
        ).subscribe(() => {
            this.load()
        })
    }

    public remove(id: any) {
        const dialog = this.matDialog.open(DialogRemoveComponent, {
            position: {
                top: '24px'
            },
            data: this.service.detail(id)
        })

        dialog.afterClosed().pipe(
            filter(f => f && true),
            switchMap(() => this.service.remove(id)),
            take(1)
        ).subscribe(() => {
            this.load()
        })
    }
}