import { GoodDetailsComponent } from './../good-details/good-details.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Good } from '../good.module';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-good-list',
  templateUrl: './good-list.component.html',
  styleUrls: ['./good-list.component.css']
})
export class GoodListComponent implements OnInit,AfterViewInit {
  public displayedColumns = ['goodsID', 'goodsName', 'goodsNo', 'goodsBrand','goodsModel','goodsSerailNumber', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Good>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  goodsID: number;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router,
    public dialog: MatDialog) { }
  ngOnInit() {
    this.getAllGoods();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getAllGoods = () => {
    this.repoService.getData('api/GoodsDetails')
    .subscribe(res => {
      this.dataSource.data = res as Good[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public redirectToDetails = (goodsID: string) => {
    let url: string = `good/details/${goodsID}`;
    this.router.navigate([url]);

  }
  public redirectToUpdate = (goodsID) => {
    const updateUrl: string = `/good/update/${goodsID}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDelete = (goodsID: string) => {
    const deleteUrl: string = `/good/delete/${goodsID}`;
    this.router.navigate([deleteUrl]);
  }
}
