export class UserModel {
  _id: string;
  code: number;
  name: string;
  birthDate: string;
  photo: Blob;

  constructor(_id: string, code: number, name: string, birthDate: string, photo: Blob) {
    this._id = _id;
    this.code = code;
    this.name = name;
    this.birthDate = birthDate;
    this.photo = photo;
  }

}
