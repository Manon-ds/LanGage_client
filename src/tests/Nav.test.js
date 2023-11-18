/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import Nav from "../components/Nav";

describe(Nav, () => {
  it("Should render Langage logo", () => {
    const { getByTestId } = render(
      <Nav conversation={1} conversationList={[1, 2, 3, 4]} />
    );
    const logo = getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render hamburger menu", () => {
    const { getByTestId } = render(
      <Nav conversation={1} conversationList={[1, 2, 3, 4]} />
    );
    const hamburger = getByTestId("hamburger");
    expect(hamburger).toBeInTheDocument();
  });

  it("should open popup menu on click", () => {
    const { getByTestId } = render(
      <Nav conversation={2} conversationList={[1]} />
    );
    const hamburger = getByTestId("hamburger");
    fireEvent.click(hamburger);
    const popMenu = getByTestId("popMenu");
    expect(popMenu).toBeInTheDocument();
  });

  it.skip("should render a new converstion when 'Start new conversation' clicked", () => {
    const { getByTestId, getByText } = render(
      <Nav conversation={1} conversationList={[1, 2, 3]} />
    );

    const hamburger = getByTestId("hamburger");
    fireEvent.click(hamburger);

    const newConvoButton = getByText('Start New Conversation?');
    expect(newConvoButton).toBeInTheDocument();

    fireEvent.click(newConvoButton);

    const newChat = getByText("Chat 1");
    expect(newChat).toBeTruthy();



  })
});
