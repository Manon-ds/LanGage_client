import React, { useState } from "react";
import { splitReply } from "../util.js";
import { getWordTranslation } from "../apiService.js";
import Popup from "reactjs-popup";

interface MessageProps {
    message: {_id: string,
      role: string,
      content: string,
      conversationID: number,
      reply: null | string,
      timestamp: number,
      __v: number},
    handleUserMessageClick :  (message: string | null) => void
}

function Messages({ message, handleUserMessageClick }: MessageProps) {
  const [selectedText, setSelectedText]= useState<string>('');
  const [textTranslation, setTextTranslation] = useState<string>('');
  const messageContent: string = splitReply(message.content)[0];


  function handleWordClick(word: string) {
    const cleanedWord: string = word.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "");
    setSelectedText(cleanedWord);
    getWordTranslation(word)
      .then((translation: string) => {
        const cleanedTranslation: string = translation.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "");
        setTextTranslation(cleanedTranslation);
        return textTranslation;
      })
      .catch((error) => {
        console.error("Error fetching word translation:", error);
      });
  }

  function handleTutorMessageClick(messageToTranslate : string) {
    setSelectedText(messageToTranslate);
    getWordTranslation(messageToTranslate)
      .then((translation: string) => {
        setTextTranslation(translation);
      })
      .catch((error) => {
        console.error("Error fetching message translation:", error);
      });
  }

  return (
    <div className="Messages" >
      <div
        className={message.role === "user" ? "userM message" : "tutorM message"}
      >
        <p className="messageContent" data-testid = 'message'>
          {messageContent.split(" ").map((word, index) => (
            <span
              data-testid = 'word'
              className="word"
              key={index}
              onClick={() => handleWordClick(word)}
            >
              {word}{" "}
            </span>
          ))}
        </p>
        {message.role === "user" ? (
          <div className="messageFunctions userF">
            <button
            data-testid = 'feedbackBtn'
              className="functionDesc"
              onClick={() => handleUserMessageClick(message.reply)}
            >
              Feedback
            </button>
          </div>
        ) : (
          <div
            className="messageFunctions tutorF"
            onClick={() => handleTutorMessageClick(messageContent)}
          >
            <button data-testid = 'translateBtn' className="functionDesc">Translate message</button>
          </div>
        )}
      </div>

      <Popup open={selectedText !== ''} onClose={() => setSelectedText('')}>
        <div className="translationPopUp popUpMenu">
          <h2 data-testid = 'popup' className="translationTitle">
            {selectedText !== '' && selectedText.length > 10
              ? "Translation"
              : "Translation of " + selectedText}
          </h2>
          <p className="translatedText">{textTranslation}</p>
          <div className="closeButtonContainer">
            <button
              data-testid = 'popupClose'
              className="closeButton"
              onClick={() => setSelectedText('')}
            >
              Close
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Messages;
