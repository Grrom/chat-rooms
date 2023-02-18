import React, { useState } from "react";
import { useContext } from "react";
import MyConstants from "../MyConstants";
import ChatRoom from "../types/chat_room";
import { providerProps } from "../types/interfaces";

export const RoomContext = React.createContext<ChatRoom>(
  MyConstants.chatRooms[0]
);
export const RoomContextUpdate = React.createContext((value: ChatRoom) => {});

export function useRoom() {
  return useContext(RoomContext);
}

export function useRoomUpdate() {
  return useContext(RoomContextUpdate);
}

export default function RoomProvider({ children }: providerProps) {
  const [room, setRoom] = useState<ChatRoom>(MyConstants.chatRooms[0]);
  function updateRoom(value: ChatRoom) {
    setRoom(() => value);
  }
  return (
    <RoomContext.Provider value={room}>
      <RoomContextUpdate.Provider value={updateRoom}>
        {children}
      </RoomContextUpdate.Provider>
    </RoomContext.Provider>
  );
}
