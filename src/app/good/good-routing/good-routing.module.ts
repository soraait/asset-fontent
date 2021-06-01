import { GoodDetailsComponent } from './../good-details/good-details.component';
import { GoodListComponent } from './../good-list/good-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GoodCreateComponent } from '../good-create/good-create.component';
import { GoodUpdateComponent } from '../good-update/good-update.component';
import { GoodDeleteComponent } from '../good-delete/good-delete.component';


const routes: Routes = [
  { path: 'goods', component:GoodListComponent },
  { path: 'details/:goodsID', component: GoodDetailsComponent},
  { path: 'create', component: GoodCreateComponent },
  { path: 'update/:goodsID', component: GoodUpdateComponent },
  { path: 'delete/:goodsID', component: GoodDeleteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class GoodRoutingModule { }
