import React, { useEffect } from "react";
import { ConvoPropTypes } from "../../propTypes";
import { getConvoList } from "../apiService";

function Hamburger({
  conversation,
  setConversation,
  conversationList,
  setConversationList,
}: ConvoPropTypes) {
  useEffect(() => {
    getConvoList()
      .then((data: number[]) => {
        setConversationList(data);
      })
      .catch((e) => console.log(e));
  }, [conversation]);

  function handleClick(listNum: number) {
    setConversation(listNum);
  }

  return (
    <div className="Hamburger">
      <h1 className="hamMenuHeader">Select a conversation</h1>
      <ul className="hamList">
        <li className="hamListItem">
          <button
            id="newConvo"
            className="ConvoButton"
            onClick={() => handleClick(conversationList.length + 1)}
          >
            Start New Conversation?
          </button>
        </li>
        {conversationList !== undefined ? (
          conversationList.map((item) => {
            return (
              <li className="hamListItem" key={item}>
                <button
                  className={
                    item == conversation
                      ? "ConvoButton currentConvo"
                      : "ConvoButton"
                  }
                  onClick={() => handleClick(item)}
                >
                  Chat {item}
                </button>
              </li>
            );
          })
        ) : (
          <h3> You have no current conversations.</h3>
        )}
      </ul>
    </div>
  );
}

export default Hamburger;
