import { Timestamp } from "@firebase/firestore";

export default class Chat {
  senderId: string;
  message: string;
  dateSent: Timestamp;
  isVerified: boolean;

  constructor(
    senderId: string,
    message: string,
    dateSent: Timestamp,
    isVerified: boolean
  ) {
    this.senderId = senderId;
    this.message = message;
    this.dateSent = dateSent;
    this.isVerified = isVerified;
  }
}
