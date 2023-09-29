import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  params!:any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.queryParams.subscribe((params: Params) => {
        this.params = JSON.parse(params['pokemon']);
      });

  }

}
