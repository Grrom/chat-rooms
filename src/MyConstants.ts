import ChatRoom from "./types/chat_room";

export default class MyConstants {
  static readonly chatRooms: Array<ChatRoom> = [
    new ChatRoom(
      "https://i.pinimg.com/originals/81/b2/34/81b234e6d4a79f243357e9f0d928135e.png",
      "cafe"
    ),
    new ChatRoom(
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
      "beach"
    ),
    new ChatRoom(
      "https://i.pinimg.com/736x/fe/e9/38/fee9380df9084928c44eecc6a4ef59ad.jpg",
      "school"
    ),
    new ChatRoom(
      "https://i0.wp.com/zillion.media/wp-content/uploads/2022/10/your-name-anime-wallpaper.jpg?resize=708%2C398&ssl=1",
      "anime"
    ),
  ];
}
