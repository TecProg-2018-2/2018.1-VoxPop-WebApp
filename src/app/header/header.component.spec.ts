import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CookieService } from 'ngx-cookie-service';

class MockCookieService { 
  token = '1234';

  get(){
    return this.token;
  }
  
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let service: MockCookieService;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    service = new MockCookieService();

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        CookieService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null', () => {
    component.logout();
    service.token = '';
    var token = service.get();
    expect(token).toBeNull;
  });

});
