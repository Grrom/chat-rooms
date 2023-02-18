import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Chat from "../types/chat";
import ChatSender from "../types/chat_sender";
import LofiRoomsUser from "../types/user";
import Helpers from "./helpers";

export default class FireBaseHelper {
  firestore = getFirestore();
  storage = getStorage();

  public fetchRooms = async (): Promise<Array<string>> => {
    const querySnapshot = await getDocs(collection(this.firestore, "rooms"));
    let datas: Array<string> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(data.name);
    });
    return datas;
  };

  public getUserImage = async (userId: string): Promise<string | null> => {
    try {
      return await getDownloadURL(
        ref(this.storage, `user_images/${userId}.png`)
      );
    } catch {
      return null;
    }
  };

  public getSenderData = async (userId: string): Promise<ChatSender | null> => {
    try {
      let user = await getDoc(doc(collection(this.firestore, "users"), userId));
      let data = user.data();
      return new ChatSender(data?.name, data?.badges);
    } catch (e) {
      return null;
    }
  };

  public async sendChat(chat: Chat, room: string) {
    try {
      await addDoc(
        collection(this.firestore, `${room}_chatroom`),
        JSON.parse(JSON.stringify(chat))
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  public async getLastChat(room: string) {
    const querySnapshot = await getDocs(
      query(
        collection(this.firestore, `${room}_chatroom`),
        orderBy("dateSent.seconds", "desc"),
        limit(20)
      )
    );
    let datas: Array<Chat> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(
        new Chat(data.senderId, data.message, data.dateSent, data.isVerified)
      );
    });
    return datas;
  }

  public listenLivechat(room: string, callback: (data: Array<Chat>) => any) {
    return onSnapshot(
      query(
        collection(this.firestore, `${room}_chatroom`),
        orderBy("dateSent.seconds", "desc"),
        limit(20)
      ),
      (data) => {
        let datas: Array<Chat> = [];
        data.docs.forEach((document) => {
          let doc = document.data();
          datas.push(
            new Chat(doc.senderId, doc.message, doc.dateSent, doc.isVerified)
          );
        });
        callback(datas);
      }
    );
  }

  public uploadImage = async (id: string, file: any): Promise<boolean> => {
    let shrunkFile;
    try {
      shrunkFile = await Helpers.resizeImage({ file: file, maxSize: 500 });
    } catch (e) {
      console.error(e);
      shrunkFile = file;
    }
    return await this.uploadFile(id, shrunkFile, "user_images", "png");
  };

  public async saveUser(user: LofiRoomsUser) {
    await setDoc(doc(this.firestore, "users", user.id), {
      name: user.name,
    });
  }

  private uploadFile = async (
    id: string,
    file: any,
    directory: string,
    type: string
  ) => {
    try {
      await uploadBytes(ref(this.storage, `${directory}/${id}.${type}`), file);
      return true;
    } catch {
      return false;
    }
  };
}
