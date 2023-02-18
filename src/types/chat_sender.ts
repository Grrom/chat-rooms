import { nullableString } from "./types";

export default class ChatSender {
  name: nullableString;
  badges?: Array<string>;

  constructor(name: nullableString, badges?: Array<string>) {
    this.name = name;
    this.badges = badges;
  }
}
