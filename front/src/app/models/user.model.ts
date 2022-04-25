export class UserModel {
  id: string;
  code: number;
  name: string;
  birthDate: string;
  photo: Blob;

  constructor(id: string, code: number, name: string, birthDate: string, photo: Blob) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.birthDate = birthDate;
    this.photo = photo;
  }

}
