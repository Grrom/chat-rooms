import { useLayoutEffect, useState } from "react";
import { useBottomMessage } from "../../global-state/bottom-message-provider";
import Helpers from "../../helpers/helpers";
import "./bottom-indicator.scss";

export default function BottomIndicator() {
  const message = useBottomMessage();
  const [isMarquee, setIsMarquee] = useState(false);

  useLayoutEffect(() => {
    async function updateSize() {
      let indicator = Helpers.getById("bottom-indicator");
      let message = Helpers.getById("message");
      setIsMarquee(
        message!.getBoundingClientRect().width >
          indicator!.getBoundingClientRect().width
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <span id="bottom-indicator">
      <div className={isMarquee ? "marquee" : ""}>
        <span id="message">{message}</span>
      </div>
    </span>
  );
}
