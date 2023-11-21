/* eslint-disable no-undef */
import  Messages  from "../components/Messages";
import { render, fireEvent } from "@testing-library/react";

const mockMessage = {
 tutorMsg : {content: "¡Hola! ¿Cómo estás? Soy tu tutor de español y estoy aquí para ayudarte a practicar. ¿Qué te gustaría aprender hoy?",
  conversationID: 1,
  reply :null,
  role: "assistant",
  timestamp : 1700330587570,
  __v :0,
  _id: "6558fc5bfbe2b226a3c0db98"
},
userMsg : {content: 'como estas hoy',
conversationID: 1,
reply :"¡Hola! ¿Cómo estás? Soy tu tutor de español y estoy aquí para ayudarte a practicar. ¿Qué te gustaría aprender hoy?",
role: "user",
timestamp : 1700330587570,
__v :0,
_id: "6558fc5bfbe2b226a3c0db98"
}
}

describe(Messages, () => {
  it('Message should be displayed', () => {
    const { getAllByTestId} = render(<Messages message={mockMessage.tutorMsg} />);
    expect(getAllByTestId('word')).toBeInTheDocument;
  })
  it('should show translation when translate button pressed', () => {
    const { getByTestId, getAllByTestId } = render(<Messages  message={mockMessage.tutorMsg}/>);
    fireEvent.click(getByTestId('translateBtn'));
    expect(getAllByTestId('popup')).toBeInTheDocument;
  })
  it('popup should have a close button', () => {
    const { getByTestId, getAllByTestId } = render(<Messages  message={mockMessage.tutorMsg}/>);
    fireEvent.click(getByTestId('translateBtn'));
    expect(getAllByTestId('popupClose')).toBeInTheDocument;
  })
  it('message should have a feedback button', () => {
    const { getByTestId, getAllByTestId } = render(<Messages  message={mockMessage.userMsg}/>);
    fireEvent.mouseOver(getByTestId('message'));
    expect(getAllByTestId('feedbackBtn')).toBeInTheDocument;
  })
})
