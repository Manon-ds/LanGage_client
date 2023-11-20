import React, { useState } from "react";
import { ReactComponent as Logo } from "../assets/Logo no slogan.svg";
import { ConvoPropTypes } from "../../propTypes"
import Hamburger from "./Hamburger";
import Popup from "reactjs-popup";

function Nav({
  conversation,
  setConversation,
  conversationList,
  setConversationList,
}: ConvoPropTypes) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="Nav">
      <div className="logoContainer">
        <Logo data-testid="logo" className="logo" />
      </div>

      <Popup
        className="popUpComponent"
        trigger={
          <button data-testid="hamburger" className="hamburgerButton">
            <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>
        }
        onOpen={handleOpen}
        onClose={handleClose}
        position="bottom center"
      >
        {isMenuOpen && (
          <div data-testid="popMenu" className="popUpMenu">
            <Hamburger
              conversation={conversation}
              setConversation={setConversation}
              conversationList={conversationList}
              setConversationList={setConversationList}
            />
            <div className="closeButtonContainer">
              <button className="closeButton" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default Nav;
