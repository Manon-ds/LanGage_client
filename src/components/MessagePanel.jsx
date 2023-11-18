import { ReactComponent as LogoL } from "../assets/Logo L.svg";
import { useState, useEffect, useRef } from "react";
import Messages from "./Messages.jsx";
import { gptReply, postUserMessage } from "../apiService.js";
import { splitReply } from "../util.js";

function MessagePanel({
  messages,
  setMessages,
  setFeedback,
  conversation,
  loading,
  setLoading,
  handleUserMessageClick,
}) {
  const [input, setInput] = useState("");

  const messageEl = useRef(null);

  // apprently Listener for synchronous DOMNodeInserted event is being deprecated? Working but this will need adjustment...
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  function handleChange(event) {
    setInput(event.target.value);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const inputWithProperties = {
        role: "user",
        content: input,
        conversationID: conversation,
      };
      setInput("");
      setLoading(true);
        const newMessage = await postUserMessage(inputWithProperties);
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
        {messages.map((message) => {
          return (
            <Messages
              key={message._id}
              message={message}
              setFeedback={setFeedback}
              handleUserMessageClick={handleUserMessageClick}
            />
          );
        })}
      </div>
      <form className="userInput" onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputField"
          className="inputField"
          value={input}
          onChange={handleChange}
          required
          placeholder={loading ? "Please wait..." : "Type here..."}
          disabled={loading}
        />

        <button type="submit" className="send-button">
          <LogoL title="Send" className="buttonImg" />
        </button>
      </form>
    </div>
  );
}

export default MessagePanel;
