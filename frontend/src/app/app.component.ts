import {Component, Type, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "./service/user-service/user.service";
import {Router} from "@angular/router";

// Modale logout
@Component({
  selector: 'ngbd-modal-logout',
  templateUrl:'./modals/modal-logout.html',
})
export class NgbdModaLogout {
  constructor(public modal: NgbActiveModal, private _user:UserService, private _router:Router) {}
  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
    this.modal.dismiss();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data: any;
  MODALS: {[name: string]: Type<any>} = {
    modalLogout: NgbdModaLogout,
  };
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;
  role: any;
  collapsed = true;

  constructor(private _modalService: NgbModal, private _user:UserService, private _router:Router) {
    if (!!localStorage.getItem("role"))
      this.role = localStorage.getItem("role");
  }

  ngOnInit(): void {
    this._user.userLogged()
      .subscribe(
        res => {
          if (res.success) {
            this.data = res.data;
            localStorage.setItem("role", this.data.ruolo);
          }
        }, error => this._router.navigate(['/login'])
      )
  }

  // non apre il modale ma fa diretto logout
  open(name: string) {
    this._modalService.open((this.MODALS[name]));
  }

}
