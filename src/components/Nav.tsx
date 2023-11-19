import React,{useState, ReactElement, ReactNode} from "react";
import { ReactComponent as Logo } from "../assets/Logo no slogan.svg";
import Hamburger from "./Hamburger";
import Popup from "reactjs-popup";

type NavProps = {
  conversation: number;
  setConversation: (value: number) => void;
  conversationList: number[];
  setConversationList: (value: number) => void;
};

function Nav({
  conversation,
  setConversation,
  conversationList,
  setConversationList,
}: NavProps)   {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO Combine into one function.


  const handleOpen = () => {
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  const popupContent: ReactNode = (
    <div data-testid="popMenu" className="popUpMenu">
    <Hamburger
      conversation={conversation}
      setConversation={setConversation}
      conversationList={conversationList}
      setConversationList={setConversationList}
    />
    <div className="closeButtonContainer">
      <button className="closeButton" onClick={() => close()}>
        Close
      </button>
    </div>
  </div>

  )



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
        {popupContent}
      </Popup>
    </div>
  );
}

export default Nav;
