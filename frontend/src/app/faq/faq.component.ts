import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  role: any;

  constructor() {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

}
