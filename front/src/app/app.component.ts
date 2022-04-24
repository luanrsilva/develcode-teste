import {Component, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "./models/user.model";
import {UserService} from "./services/user.service";
import {ToastrService} from "ngx-toastr";

const reader = new FileReader();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'develcode-front';

  public userForm!: FormGroup;
  users: UserModel[] = [];

  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService) {

    this.buildForm();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private buildForm() {
    this.userForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      photo: ['', [Validators.required]]
    })
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result) {
        this.createUser();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  private createUser() {

    const user = this.buildUser();

    this.userService.createUser(user).subscribe((res) => {
      const response = JSON.parse(JSON.stringify(res));
      this.toastrService.success(response.message);
      this.getUsers();
    }, error => {
      this.toastrService.error(error.message);
    });
  }

  private getUsers() {
    this.userService.getUsers().subscribe((res) => {
      const response = JSON.parse(JSON.stringify(res));
      console.log(response)
      this.users = response.data;
    }, error => {
      this.toastrService.error(error.message);
    });
  }

  hasUsers() {
    return this.users.length > 0;
  }

  private buildUser(): UserModel {

    const user = this.userForm.getRawValue();

    return user;
  }
}
