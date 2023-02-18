import "./App.scss";

import Rooms from "./components/rooms/rooms";
import FireBaseHelper from "./helpers/firebase-helpers";

import { initializeApp } from "firebase/app";
import BottomIndicator from "./components/bottom-indicator/bottom-indicator";
import BottomMessageProvider from "./global-state/bottom-message-provider";
import Controls from "./components/controls/controls";
import ModalProvider from "./global-state/profile-modal-provider";
import Profile from "./components/profile/profile";
import AuthenticationHelper from "./helpers/authentication-helper";
import UserProvider from "./global-state/user-provider";
import LiveChat from "./components/live-chat/live-chat";
import { useState } from "react";
import ChatShownProvider from "./global-state/chat-provider";
import RoomProvider from "./global-state/room-provider";
import MyConstants from "./MyConstants";

export const authenticationHelper = new AuthenticationHelper(
  //I DON'T USUALLY HARDCODE SECRETS LIKE THIS BUT THIS IS JUST A SAMPLE PROJECT ANYWAY
  initializeApp({
    apiKey: "AIzaSyBuvKEkmb8PLgQw_muPd7bEvi4-LhsRPz4",
    authDomain: "for-testing-and-stuff.firebaseapp.com",
    projectId: "for-testing-and-stuff",
    storageBucket: "for-testing-and-stuff.appspot.com",
    messagingSenderId: "18074203528",
    appId: "1:18074203528:web:784e6eece5cf1ce575763d",
    measurementId: "G-749MHDN60S",
  })
);

export const fireBaseHelper = new FireBaseHelper();

function App() {
  const [bg, setBg] = useState(MyConstants.chatRooms[0].background);

  return (
    <div id="app">
      <BottomMessageProvider>
        <ModalProvider>
          <UserProvider>
            <ChatShownProvider>
              <RoomProvider>
                <>
                  <Controls />
                  <Profile />
                  <div id="parent" style={{ backgroundImage: `url(${bg})` }}>
                    <Rooms setBg={(bg) => setBg(bg)} />
                    <LiveChat />
                  </div>
                </>
              </RoomProvider>
            </ChatShownProvider>
          </UserProvider>
        </ModalProvider>
        <BottomIndicator />
      </BottomMessageProvider>
    </div>
  );
}

export default App;
