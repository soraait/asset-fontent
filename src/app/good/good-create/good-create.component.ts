import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

export interface GoodsForCreation {
  goodsName: string;
  goodsNo: string;
  goodsBrand: string;
  goodsModel: string;
  goodsSerailNumber: string;
}

@Component({
  selector: 'app-good-create',
  templateUrl: './good-create.component.html',
  styleUrls: ['./good-create.component.css']
})
export class GoodCreateComponent implements OnInit {

  public goodForm: FormGroup;
  private dialogConfig;
  constructor( private location : Location , private repository : RepositoryService,private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.goodForm = new FormGroup({
      goodsName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsNo: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsBrand: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsModel: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsSerailNumber: new FormControl('', [Validators.required, Validators.maxLength(60)]),

    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.goodForm.controls[controlName].hasError(errorName);
  }
  public onCancel = () => {
    this.location.back();
  }

  public createGoods = (goodFormValue) => {
    if (this.goodForm.valid) {
      this.executeGoodsCreation(goodFormValue);
    }
  }
  private executeGoodsCreation = (goodFormValue) => {
    let good: GoodsForCreation = {
      goodsName:goodFormValue.goodsName,
      goodsNo:goodFormValue.goodsNo,
      goodsBrand:goodFormValue.goodsBrand,
      goodsModel:goodFormValue.goodsModel,
      goodsSerailNumber:goodFormValue.goodsSerailNumber
    }

    let apiUrl = 'api/GoodsDetails';
    this.repository.create(apiUrl, good)
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
