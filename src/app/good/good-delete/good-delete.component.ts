import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Good } from '../good.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-good-delete',
  templateUrl: './good-delete.component.html',
  styleUrls: ['./good-delete.component.css']
})
export class GoodDeleteComponent implements OnInit {

  public good:Good;
  private dialogConfig;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute,
    private location : Location ,
    private dialog: MatDialog, private errorService: ErrorHandlerService) { }

    ngOnInit() {
      this.getGoodsDetails();
    }

    private getGoodsDetails = () =>{
      let goodsID: string = this.activeRoute.snapshot.params['goodsID'];
      let apiUrl: string = `api/GoodsDetails/${goodsID}`;

      this.repository.getData(apiUrl)
      .subscribe(res => {
        this.good = res as Good;
      },
      (error) =>{
        this.errorService.handleError(error);
      })
    }
    public onCancel = () => {
      this.location.back();
    }

    public deleteGoods = () => {
      const deleteUrl: string = `api/GoodsDetails/${this.good.goodsID}`;
      this.repository.delete(deleteUrl)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
      })
    )
  }
}
