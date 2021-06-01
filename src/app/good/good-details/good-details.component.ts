import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { RepositoryService } from 'src/app/shared/repository.service';
import { Good } from '../good.module';

@Component({
  selector: 'app-good-details',
  templateUrl: './good-details.component.html',
  styleUrls: ['./good-details.component.css']
})
export class GoodDetailsComponent implements OnInit {

  public good:Good;
  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService,) { }

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
        this.errorHandler.handleError(error);
      })
    }
  }
