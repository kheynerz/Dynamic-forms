import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-tab',
  templateUrl: './code-tab.component.html',
  styleUrls: ['./code-tab.component.css']
})
export class CodeTabComponent implements OnInit {
  data: string = "asdasd"
  constructor() { }

  ngOnInit(): void {
  }

  public setData(jsonData: string){
    this.data = jsonData;
  }

}
