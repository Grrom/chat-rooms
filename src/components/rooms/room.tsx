import ChatRoom from "../../types/chat_room";

interface _props {
  room: ChatRoom;
  changeRoom: (selected: ChatRoom) => void;
  isSelected: boolean;
}
export default function Room({ room, changeRoom, isSelected }: _props) {
  return (
    <div
      className={`room ${isSelected && "active"}`}
      onClick={async () => {
        if (!isSelected) {
          changeRoom(room);
        }
      }}
    >
      {room.name}
    </div>
  );
}
