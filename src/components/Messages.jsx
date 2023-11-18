import React, { useState } from "react";
import { splitReply } from "../util.js";
import { getWordTranslation } from "../apiService.js";
import Popup from "reactjs-popup";


function Messages({ message, handleUserMessageClick }) {
  const [selectedText, setSelectedText] = useState(null);
  const [textTranslation, setTextTranslation] = useState(null);
  const messageContent = splitReply(message.content)[0];

  function handleWordClick(word) {
    const cleanedWord = word.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "");
    setSelectedText(cleanedWord);
    getWordTranslation(word)
      .then((translation) => {
        const cleanedTranslation = translation.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "");
        setTextTranslation(cleanedTranslation);
      })
      .catch((error) => {
        console.error("Error fetching word translation:", error);
      });
  }

  function handleTutorMessageClick(messageToTranslate) {
    setSelectedText(messageToTranslate);
    getWordTranslation(messageToTranslate)
      .then((translation) => {
        setTextTranslation(translation);
      })
      .catch((error) => {
        console.error("Error fetching message translation:", error);
      });
  }

  return (
    <div className="Messages">
      <div
        className={message.role === "user" ? "userM message" : "tutorM message"}
      >
        <p className="messageContent">
          {messageContent.split(" ").map((word, index) => (
            <span
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
            <button className="functionDesc">Translate message</button>
          </div>
        )}
      </div>

      <Popup open={selectedText !== null} onClose={() => setSelectedText(null)}>
        <div className="translationPopUp popUpMenu">
          <h2 className="translationTitle">
            {selectedText !== null && selectedText.length > 10
              ? "Translation"
              : "Translation of " + selectedText}
          </h2>
          <p className="translatedText">{textTranslation}</p>
          <div className="closeButtonContainer">
            <button
              className="closeButton"
              onClick={() => setSelectedText(null)}
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
