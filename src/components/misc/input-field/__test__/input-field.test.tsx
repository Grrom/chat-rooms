import { render } from "@testing-library/react";
import InputField from "../input-field";

test("Input Field", () => {
  render(<InputField type="text" label="testing-lang" />);
});
