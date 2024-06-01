import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {

  termsCondition:any="";
  constructor(public api    :HttpService) { }

  ngOnInit(): void {
    this.getTermsCondition();
  }
  getTermsCondition() {
    this.api.get('FETCH_TERMS_ND_CONDITION').subscribe(res => { //Get Product details
      this.termsCondition = res.response[0].content;
    });
  }

}
