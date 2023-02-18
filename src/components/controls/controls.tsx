import profile from "../../assets/profile.svg";
import chat from "../../assets/chat.svg";

import { IconButton } from "../misc/icon-button/icon-button";

import "./controls.scss";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useChatShownUpdate } from "../../global-state/chat-provider";
import { useRoom } from "../../global-state/room-provider";
import AlertHelper from "../../helpers/alert-helper";

export default function Controls() {
  const toggleProfile = useModalProfileUpdate();
  const profileToggled = useModalProfile();

  const toggleChat = useChatShownUpdate();

  const room = useRoom();

  return (
    <div id="controls" className={profileToggled ? "box-shadow" : ""}>
      <IconButton
        onClick={() => toggleProfile()}
        isLoading={false}
        icon={profile}
      />
      <IconButton
        onClick={() =>
          room !== undefined
            ? toggleChat()
            : AlertHelper.errorToast("Choose a room first", 600, false)
        }
        isLoading={false}
        icon={chat}
      />
    </div>
  );
}
