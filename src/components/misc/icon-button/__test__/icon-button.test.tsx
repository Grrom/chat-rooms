import { render } from "@testing-library/react";
import { IconButton } from "../icon-button";

test("Icon Button", () => {
  render(
    <IconButton
      className="testing-lang"
      onClick={() => console.log("testing lang")}
      isLoading={false}
      icon="testing"
    />
  );
});
