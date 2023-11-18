/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import Nav from "../components/Nav";

describe(Nav, () => {
  it("Should render Langage logo", () => {
    const { getByTestId } = render(
      <Nav conversation={1} conversationList={[1, 2, 3, 4]} />
    );
    const logo = getByTestId("logo");
    expect(logo).toBeTruthy();
  });

  it('should render hamburger menu', () => {
    const { getByTestId } = render(
      <Nav conversation={1} conversationList={[1, 2, 3, 4]} />
    );
    const hamburger = getByTestId('hamburger');
    expect(hamburger).toBeTruthy();
  })


});
