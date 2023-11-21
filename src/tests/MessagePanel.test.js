/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import MessagePanel from "../components/MessagePanel";
// import Messages from "../components/Messages";
import Form from "../components/Form";
import userEvent from '@testing-library/user-event'


describe(MessagePanel, () => {
  it('Should render a send button', () => {
    const { getByTestId } = render(
      <MessagePanel />
    );
    const sendButton = getByTestId('submitButton');
    expect(sendButton).toBeInTheDocument();
  })
  it('Should render logo', async () => {
    const { getByTestId } = render( <MessagePanel/>);
    const logo= getByTestId('logo')
    expect(logo).toBeInTheDocument();
  })
  it('should set input value when message is typed', () => {
    const { getByTestId } = render(<MessagePanel/> );
    userEvent.type(getByTestId('input'), 'Hello,World!')
    expect(getByTestId('input')).toHaveValue('Hello,World!')
  })
  it('calls the onSubmit callback handler', () => {
    const handleSubmit = jest.fn();
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <Form handleSubmit={handleSubmit} handleChange={handleChange} input={'this is a message'} loading={false}/>
    );
    fireEvent.submit(getByTestId('form'),
    );

    expect(handleSubmit).toHaveBeenCalled();
  });

})
