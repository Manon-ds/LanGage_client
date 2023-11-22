//TODO Organise components into their own folders with CSS included. Remove list of imports from App.js

//TODO Look into setting state functions. Do we need a callback function? It doesn't seem like it.
import "./App.css";
import "./components/Nav.css";
import "./components/MessagePanel.css";
import "./components/FeedbackPanel.css";
import "./components/Messages.css";
import "./components/Hamburger.css";
import "./components/popups.css";
import Nav from "./components/Nav";
import FeedbackPanel from "./components/FeedbackPanel.jsx";
import MessagePanel from "./components/MessagePanel";
import { getPrevMessages } from "./apiService.js";
import { useState, useEffect } from "react";
import { splitReply } from "./util.js";

interface Message {
    _id: string,
    role: string,
    content: string,
    conversationID: number,
    reply: null | string,
    timestamp: number,
    __v: number
  }

function App() {
  const [conversation, setConversation] = useState<number>(1);
  const [messages, setMessages] = useState<Message[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [conversationList, setConversationList] = useState<number[]>([]);

  useEffect(() => {
    getPrevMessages(conversation)
      .then((data: Message[]) => {
        if (!data) {
          setMessages([]);
        } else {
          setMessages(data);
        }
      })
      .catch((e) => console.log(e));
  }, [conversation]);

  function handleUserMessageClick(message: string | null) {
    if (message && message.includes("(")) {
      const feedback: string = splitReply(message)[1];
      setFeedback(feedback);
    } else {
      setFeedback("");
    }
  }

  return (
    <div className="App">
      <nav>
        <Nav
          conversation={conversation}
          setConversation={setConversation}
          conversationList={conversationList}
          setConversationList={setConversationList}
        />
      </nav>
      <main>
        <FeedbackPanel
          messages={messages}
          loading={loading}
          conversation={conversation}
          conversationList={conversationList}
          feedback={feedback ? feedback : [""]}
        />
        <MessagePanel
          loading={loading}
          setLoading={setLoading}
          messages={messages}
          setMessages={setMessages}
          setFeedback={setFeedback}
          conversation={conversation}
          handleUserMessageClick={handleUserMessageClick}
        />
      </main>
    </div>
  );
}

export default App;
