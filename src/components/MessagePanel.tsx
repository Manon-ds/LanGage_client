// import { ReactComponent as LogoL } from "../assets/Logo L.svg";
import { useState, useEffect, useRef, ChangeEvent } from "react";
import Messages from "./Messages.jsx";
import Form from "./Form.jsx";
import { gptReply, postUserMessage } from "../apiService.js";
import { splitReply } from "../util.js";


interface MessagePanelProps {
  messages: {
    _id: string,
    role: string,
    content: string,
    conversationID: number,
    reply: null | string,
    timestamp: number,
    __v: number
  }[];
  setMessages: React.Dispatch<React.SetStateAction<{
    _id: string,
    role: string,
    content: string,
    conversationID: number,
    reply: null | string,
    timestamp: number,
    __v: number
  }[]>>;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
  conversation: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleUserMessageClick: () => void;
}

function MessagePanel({
  messages,
  setMessages,
  setFeedback,
  conversation,
  loading,
  setLoading,
  handleUserMessageClick,
}: MessagePanelProps) {

  const [input, setInput] = useState("");
  const messageEl = useRef<HTMLDivElement | null>(null);

  // apprently Listener for synchronous DOMNodeInserted event is being deprecated? Working but this will need adjustment...
  useEffect(() => {
    if (messageEl !== null && messageEl.current !== null) {
      messageEl.current.addEventListener("DOMNodeInserted", (event: Event) => {
        const { currentTarget: target } = event;
        if(target instanceof HTMLElement){
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      });
    }
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  async function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    try {
      event.preventDefault();
      const inputWithProperties = {
        role: "user",
        content: input,
        conversationID: conversation,
      };
      console.log('input ', inputWithProperties)
      setInput("");
      setLoading(true);

      const newMessage: {
        _id: string,
        role: string,
        content: string,
        conversationID: number,
        reply: null | string,
        timestamp: number,
        __v: number } = await postUserMessage(inputWithProperties);
        console.log('new message ', newMessage)


      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const response = await gptReply(newMessage);
      if (response.content.includes("(")) {
        const feedback = splitReply(response.content)[1];
        setFeedback(feedback);
      }
      setMessages((prevMessages) => [...prevMessages, response]);

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="MessagePanel">
      <div className="messages-container" ref={messageEl}>
        {messages?.map((message) => {
          console.log('message error', messages)
          return (
            <Messages data-testid = 'message'
              key ={message._id}
              message={message}
              // setFeedback={setFeedback}
              handleUserMessageClick={handleUserMessageClick}
            />
          );
        })}
      </div>
      <Form handleSubmit={handleSubmit} handleChange={handleChange} loading={loading} input={input} />

    </div>
  );
}

export default MessagePanel;
