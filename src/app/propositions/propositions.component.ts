import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service'
import { Router } from '@angular/router';
import { PropositionModel } from '../../models/proposition'
import { VoteModel } from '../../models/vote'
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.css']
})
export class PropositionsComponent implements OnInit {

  tokenValue = '';
  idValue = 0;

  proposition: any = {
    proposition_id: 0,
    proposition_type: '',
    proposition_type_initials: '',
    number: 0,
    year: 0,
    abstract: '',
    processing: '',
    situation: '',
    url_full: ''
  }

  constructor(
    private router:Router,
    private requester:RequestsService,
    private cookieService:CookieService,
    private token:TokenService
  ) { }

  ngOnInit() {
    this.tokenValue = this.cookieService.get('token');
    this.token.checkToken(this.tokenValue);
    this.idValue = +this.cookieService.get('id');
    this.requester.getProjects().subscribe( response =>{
      this.proposition = response['body'];
      console.log(response['body']);
    });
  }

  answerPL(opinion: string){
    var response;
    var request;
    var status;

     var vote : VoteModel = {
       user: this.idValue,
       proposition_id: this.proposition.id,
       vote: opinion
    }

    response = this.requester.postVote(vote);
    request.subscribe( response=>{
      status = response.status;

      if(this.requester.didSucceed(status)){
        console.log("Sucesso");
      }
      else{
        console.log("Tá errado ai ó");
      }
    });
  }
}
