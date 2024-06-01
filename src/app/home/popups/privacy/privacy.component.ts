import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  privacyPolicy:any="";
  constructor(public api    :HttpService) { }

  ngOnInit(): void {
    this.getPrivacyPolicy();
  }
  getPrivacyPolicy() {
    this.api.get('FETCH_PRIVACY_POLICY').subscribe(res => { //Get Product details
      this.privacyPolicy = res.response[0].content;
    });
  }

}
