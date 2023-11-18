/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import MessagePanel from "../components/MessagePanel";
import { mockMessage } from "./mockMessage";

describe.skip(MessagePanel, () => {
  it('Should render a send button', () => {
    const { getByClassName } = render(
      <MessagePanel conversation={1} messages={[mockMessage.message]} loading={false}  />
    );
    const sendButton = getByClassName('send-button');
    expect(sendButton).toBeInTheDocument();
  })

})
