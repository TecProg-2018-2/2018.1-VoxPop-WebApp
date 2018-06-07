import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';
import { TokenService } from '../token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-see-politician',
  templateUrl: './see-politician-detail.component.html',
  styleUrls: ['./see-politician-detail.component.css']
})
export class SeePoliticianDetailedComponent implements OnInit {
  tokenValue = '';
  sub: any;
  id = 0;
  parlimentarian: any = {
    name: '',
    gender: '',
    partido: '',
    federal_unit: '',
    photo: '',
    birth_date: '',
    education: '',
    email: ''
  };
  gender = '';

  constructor(
    private route: ActivatedRoute,
    private requester: RequestsService,
    private token: TokenService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.tokenValue = this.cookieService.get('token');
    this.token.checkToken(this.tokenValue);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.checkParliamentarianFollowed();
    this.requester.getParlimentarianSpecific(this.id).subscribe( response => {
    this.parlimentarian = response['body'];
    if (this.parlimentarian['gender'] === 'M') {
      this.gender = 'Masculino';
    } else if (this.parlimentarian['gender'] === 'F') {
      this.gender = 'Feminino';
    } else {
      this.gender = 'N/A';
    }
    }, error => {
    this.parlimentarian = {
      name : 'DEPUTADO NÃO ENCONTRADO',
      gender : 'N/A',
      federal_unit: 'N/A',
      photo: 'N/A'
    };
    });
  }

  followParliamentarian() {
    let status;
    this.requester.postFollow(this.parlimentarian.id).subscribe(response => {
      status = response.status;
      this.renderUnfollowButton();
    });
    return true;

  }

  unfollowParliamentarian() {
    let status;
    this.requester.deleteFollow(this.parlimentarian.id).subscribe(response => {
      status = response.status;
      this.renderFollowButton();
    });
    return true;

  }

  renderUnfollowButton() {
    document.getElementById('unfollow').style.display = 'block';
    document.getElementById('follow').style.display = 'none';
    return true;
  }

  renderFollowButton() {
    document.getElementById('unfollow').style.display = 'none';
    document.getElementById('follow').style.display = 'block';
    return true;
  }

  derrenderBothButtons() {
    document.getElementById('follow').style.display = 'none';
    document.getElementById('unfollow').style.display = 'none';
    return true;
  }

  checkParliamentarianFollowed() {
    this.requester.getFollow(this.id).subscribe( response => {
      if (response['status'] === 200) {
        this.renderUnfollowButton();
      } else {
        this.derrenderBothButtons();
        alert('Político não encontrado');
      }
    }, error => {
      if (error['status'] === 404) {
        this.renderFollowButton();
      } else {
        this.derrenderBothButtons();
        // alert('Erro inesperado, favor recarregar a página novamente em alguns minutos');
      }
    });
    return true;
  }
}