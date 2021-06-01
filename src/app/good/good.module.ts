import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodListComponent } from './good-list/good-list.component';
import { GoodRoutingModule } from './good-routing/good-routing.module';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GoodDetailsComponent } from './good-details/good-details.component';
import { GoodDataComponent } from './good-details/good-data/good-data.component';
import { GoodCreateComponent } from './good-create/good-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GoodUpdateComponent } from './good-update/good-update.component';
import { GoodDeleteComponent } from './good-delete/good-delete.component';


@NgModule({
  declarations: [
    GoodListComponent,
    GoodDetailsComponent,
    GoodDataComponent,
    GoodCreateComponent,
    GoodUpdateComponent,
    GoodDeleteComponent
  ],
  imports: [
    CommonModule,
    GoodRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[GoodListComponent]
})
export class GoodModule { }


export interface Good{
  goodsID: number;
  goodsName: string;
  goodsNo: string;
  goodsBrand: string;
  goodsModel: string;
  goodsSerailNumber: string;
}
