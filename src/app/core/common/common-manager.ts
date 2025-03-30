import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, filter, Observable, switchMap, take } from "rxjs";
import { DialogRemoveComponent } from "@core/components/dialog-remove/dialog-remove.component";
import { CommonService } from "@core/interfaces/common-service";
import { TranslateService } from "@ngx-translate/core";

export class CommonManager<S extends CommonService<T>, T> {

    public itemsSubj = new BehaviorSubject<T[]>([])
    public items$ = this.itemsSubj.asObservable()

    constructor(
        private service: S, 
        private matDialog: MatDialog, 
        private matSnackbar: MatSnackBar,
        private translateService: TranslateService) {

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
            },
            autoFocus: false
        })

        dialog.afterClosed().pipe(
            filter(f => f && true),
            switchMap(payload => this.service.create(payload)),
            take(1)
        ).subscribe({
            next:() => {
                this.load()
                this.sendMessage(this.translateService.instant('GEN.ADD_SUCCESS'), 'success')
            },
            error: (err) => {
                this.sendMessage(this.translateService.instant('GEN.ERROR_ONADD'), 'failure')
            },
        })
    }

    public remove(id: any) {
        const dialog = this.matDialog.open(DialogRemoveComponent, {
            position: {
                top: '24px'
            },
            autoFocus: false
        })

        dialog.afterClosed().pipe(
            filter(f => f && true),
            switchMap(() => this.service.remove(id)),
            take(1)
        ).subscribe({
            next: () => {
                this.load()
                this.sendMessage(this.translateService.instant('GEN.REMOVE_SUCCESS'), 'success')
            },
            error: (err) => {
                this.sendMessage(this.translateService.instant('GEN.ERROR_ONREMOVE'), 'failure')
            }
        })
    }

    protected sendMessage(message: string, panelClass: string) {
        this.matSnackbar.open(message, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass
        })
    }
}