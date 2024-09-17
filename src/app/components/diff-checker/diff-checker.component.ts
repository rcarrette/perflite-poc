import { Component, OnInit } from '@angular/core';
import { SideBySideDiffComponent } from 'ngx-diff';

@Component({
  selector: 'app-diff-checker',
  templateUrl: './diff-checker.component.html',
  styleUrls: ['./diff-checker.component.scss']
})
export class DiffCheckerComponent implements OnInit {

  leftText: string = "test old";
  rightText: string = "test new";

  constructor() { }

  ngOnInit() {}

}
