import {CanDeactivate} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ConfirmLeaveComponent} from '../components/confirm-leave/confirm-leave.component';
import {FormComponent} from '../interfaces/component/form-component.interface';

@Injectable()
export class UnsavedChangesGuardService implements CanDeactivate<FormComponent> {

  constructor(private modalService: BsModalService) {}

  canDeactivate(component: FormComponent) {
    if (component.form.dirty && !component.submitted) {
      const subject = new Subject<boolean>();

      const modal = this.modalService.show(ConfirmLeaveComponent, {'class': 'modal-dialog-primary'});
      modal.content.leave$ = subject;

      return subject.asObservable();
    }

    return true;
  }
}
