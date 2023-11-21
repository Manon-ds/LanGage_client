// TODO: Refactor SVG into paths to use in img elements.
import RobotPointSVG from "../assets/pointing-robot.svg";
import RobotThinkSVG from "../assets/thinking-robot.svg";
import RobotBookSVG from "../assets/book-robot.svg";
import RobotHappySVG from "../assets/happy-robot.svg";
import RobotLetterSVG from "../assets/letter-robot.svg";
import { useState, useEffect } from "react";
import React from "react";
import { FeedbackTypes } from "../../propTypes";

function FeedbackPanel({
  conversation,
  messages,
  feedback,
  loading,
  conversationList,
}: FeedbackTypes) {
  const [mascot, setMascot] = useState<string>(RobotHappySVG);

  useEffect(() => {
    if (conversation === conversationList.length + 1 && messages.length === 0) {
      setMascot(RobotBookSVG);
    } else if (feedback[0].length === 0) {
      setMascot(RobotLetterSVG);
    } else if (feedback[0].length !== 0) {
      setMascot(RobotPointSVG);
    } else {
      setMascot(RobotHappySVG);
    }
  }, [feedback, conversation, messages]);

  return (
    <div className="FeedbackPanel">
      <div className="feedbackBox">
        <h1 data-testid="feedBackH1" className="feedbackHeader">
          Feedback board
        </h1>
        <ul data-testid="testfeedBackUL" className="feedbackList">
          {feedback[0].length === 0 ? (
            <li data-testid="emptyLI">
              {messages.length === 0 ? "" : "Keep up the good work!"}
            </li>
          ) : (
            feedback.map((str) => {
              return <li key={feedback.indexOf(str)}>{str}</li>;
            })
          )}
        </ul>
      </div>
      {/* // TODO add data-testid to the image, */}
      <div className="tutor">
        {loading ? (
          <img
            src={RobotThinkSVG}
            className="tutorImg"
            data-testid="loadingRobotTutor"
          />
        ) : (
          <img src={mascot} className="tutorImg" data-testid="robotTutor" />
        )}
      </div>
    </div>
  );
}

export default FeedbackPanel;
