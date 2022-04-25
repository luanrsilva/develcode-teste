import {Component, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "./models/user.model";
import {UserService} from "./services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'develcode-front';

  public userForm!: FormGroup;
  users: UserModel[] = [];
  modalTitle = "Novo Usuário";
  userToRemove!: UserModel;

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
      birthDate: ['', [Validators.required]]
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
      this.buildForm();
      this.getUsers();
    }, err => {
      console.log(err)
      this.toastrService.error(err.error.message);
    });
  }

  private getUsers() {
    this.userService.getUsers().subscribe((res) => {
      const response = JSON.parse(JSON.stringify(res));
      this.users = response.data;
    }, err => {
      this.toastrService.error(err.error.message);
    });
  }

  hasUsers() {
    return this.users.length > 0;
  }

  private buildUser(): UserModel {

    const user = this.userForm.getRawValue();

    return user;
  }

  openEdit(content: any, user: UserModel) {
    this.fetchUser(user);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result) {
        this.updateUser(user.id);
      }
    }, (reason) => {
      this.modalTitle = "Novo Usuário";
      this.buildForm();
      console.log(reason);
    });
  }

  fetchUser(user: UserModel) {
    this.modalTitle = "Editar Usuário";
    this.userForm.get('code')?.setValue(user.code);
    this.userForm.get('name')?.setValue(user.name);
    this.userForm.get('birthDate')?.setValue(user.birthDate);
  }

  private updateUser(id: string) {
    const user = this.buildUser();

    this.userService.updateUser(user, id).subscribe((res) => {
      const response = JSON.parse(JSON.stringify(res));
      this.toastrService.success(response.message);
      this.getUsers();
    }, err => {
      this.toastrService.error(err.error.message);
    });
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      const response = JSON.parse(JSON.stringify(res));
      this.toastrService.success(response.message);
      this.getUsers();
    }, err => {
      this.toastrService.error(err.error.message);
    });
  }

  openDelete(content: any, user: UserModel) {
    this.userToRemove = user;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result) {
        this.delete(user.id);
      }
    }, (reason) => {
      console.log(reason);
    });
  }

}
