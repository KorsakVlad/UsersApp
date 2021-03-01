import {Component, OnInit} from '@angular/core';
import {PageNameService} from '../../shared/services/page-name.service';
import {PageName} from '../../shared/enums/page-name.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private pageNameService: PageNameService) { }

  ngOnInit(): void {
    this.pageNameService.update(PageName.Home);
  }

}
