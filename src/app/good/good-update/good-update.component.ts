import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Good } from '../good.module';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Location } from '@angular/common';


export interface GoodsForUpdate {
  goodsName: number;
  goodsNo: string;
  goodsBrand: string;
  goodsModel: string;
  goodsSerailNumber: string;
}
@Component({
  selector: 'app-good-update',
  templateUrl: './good-update.component.html',
  styleUrls: ['./good-update.component.css']
})
export class GoodUpdateComponent implements OnInit {

  public goodForm: FormGroup;
  public good:Good;
  private dialogConfig;
  constructor( private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute,
    private location : Location ,
    private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.goodForm = new FormGroup({
      goodsName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsNo: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsBrand: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsModel: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      goodsSerailNumber: new FormControl('', [Validators.required, Validators.maxLength(60)]),

    });
    this.getGoodsById();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }

  }
  private getGoodsById = () =>{
    let goodsID: string = this.activeRoute.snapshot.params['goodsID'];
    let goodByIdUrl: string = `api/GoodsDetails/${goodsID}`;

    this.repository.getData(goodByIdUrl)
    .subscribe(res => {
      this.good = res as Good;
      this.goodForm.patchValue(this.good);
    },
    (error) =>{
      this.errorService.dialogConfig = { ...this.dialogConfig };
      this.errorService.handleError(error);
    })
  }

  public validateControl = (controlName: string) => {
    return (this.goodForm.controls[controlName].invalid && this.goodForm.controls[controlName].touched)
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.goodForm.controls[controlName].hasError(errorName);
  }
  // public validateControl = (controlName: string) => {
  //   if (this.goodForm.controls[controlName].invalid && this.goodForm.controls[controlName].touched)
  //     return true;
  //   return false;
  // }
  // public hasError = (controlName: string, errorName: string)  => {
  //   if (this.goodForm.controls[controlName].hasError(errorName))
  //     return true;
  //   return false;
  // }


  public onCancel = () => {
    this.location.back();
  }

  public updateGoods = (goodFormValue) => {
    if (this.goodForm.valid) {
      this.executeGoodsUpdate(goodFormValue);
    }
  }
  private executeGoodsUpdate = (goodFormValue) => {
    this.good.goodsName = goodFormValue.goodsName;
    this.good.goodsNo = goodFormValue.goodsNo;
    this.good.goodsBrand = goodFormValue.goodsBrand;
    this.good.goodsModel = goodFormValue.goodsModel;
    this.good.goodsSerailNumber = goodFormValue.goodsSerailNumber;
    let apiUrl = `api/GoodsDetails/${this.good.goodsID}`;

    this.repository.update(apiUrl,this.good)
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
