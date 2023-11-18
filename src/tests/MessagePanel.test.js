/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import MessagePanel from "../components/MessagePanel";

describe(MessagePanel, () => {
  it('Should render a send button', () => {
    const { getByClassName } = render(
      <MessagePanel />
    );
    const sendButton = getByClassName('send-button');
    expect(sendButton).toBeInTheDocument();
  })

})