export default class LofiRoomsUser {
  name: string;
  email: string;
  id: string;
  isVerified: boolean;
  badges?: Array<string>;

  constructor(
    name: string,
    email: string,
    id: string,
    isVerified: boolean,
    badges?: Array<string>
  ) {
    this.name = name !== null ? name : email.substr(0, email.indexOf("@"));
    this.email = email;
    this.id = id;
    this.isVerified = isVerified;
    this.badges = badges;
  }
}
