import { Component } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-leave',
  templateUrl: './confirm-leave.component.html',
  styleUrls: ['./confirm-leave.component.scss']
})
export class ConfirmLeaveComponent {

  leave$: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  leavePage(value: boolean) {
    this.bsModalRef.hide();
    this.leave$.next(value);
    this.leave$.complete();
  }
}
