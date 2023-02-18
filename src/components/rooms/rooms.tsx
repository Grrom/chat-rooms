import Music from "../../types/chat_room";
import Room from "./room";
import "./rooms.scss";

import { useBottomMessageUpdate } from "../../global-state/bottom-message-provider";
import { useRoom, useRoomUpdate } from "../../global-state/room-provider";
import MyConstants from "../../MyConstants";

interface _props {
  setBg: (bg: string) => void;
}

export default function Rooms({ setBg }: _props) {
  const setBottomMessage = useBottomMessageUpdate();

  const room = useRoom();
  const setRoom = useRoomUpdate();

  function changeRoom(newRoom: Music) {
    setRoom(newRoom);
    setBottomMessage(
      `You are now in ${newRoom.name} room, please refrain from talking about anything unrelated to ${newRoom.name}`
    );
    setBg(newRoom?.background);
  }

  return (
    <div id="rooms">
      {MyConstants.chatRooms.map((value) => (
        <Room
          room={value}
          changeRoom={changeRoom}
          key={value.name}
          isSelected={room === value}
        />
      ))}
    </div>
  );
}
