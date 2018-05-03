import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { PropositionModel } from '../../models/proposition';

@Component({
  selector: 'app-see-pl',
  templateUrl: './see-pl.component.html',
  styleUrls: ['./see-pl.component.css']
})
export class SeePlComponent implements OnInit {

  numberPLs: number;
  pages: Array<number> = [1];
  itemsPerPage = 10;

  proposition: any = [
    {
      proposition_id: null,
      proposition_type: '',
      proposition_type_initials: '',
      number: null,
      year: null,
      abstract: '',
      processing: '',
      situation: '',
      url_full: ''
    }
  ];

  constructor(
    private requester: RequestsService,
  ) { }
    

  ngOnInit() {
    this.propositions(1);
  }

  propositions(offset: number) {
    let req: any;
    this.pages = [1];
    this.numberPLs = 1;
    this.proposition = [];
    req =  this.requester.getProposition((offset - 1) * this.itemsPerPage);
    this.handlePropositionsResponse(req, offset);
    return req;
  }

  handlePropositionsResponse(request, offset) {
    this.requester.getProposition((offset - 1) * this.itemsPerPage).subscribe( response => {
      this.proposition = response['results'];
      this.numberPLs = response['count'];
      for (let i = 2; i <= Math.ceil(this.numberPLs / this.itemsPerPage); i++) {
        this.pages.push(i);
      }
      console.log(this.proposition);
      console.log(this.numberPLs);
    });
  }

}

