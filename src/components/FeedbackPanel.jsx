import { ReactComponent as RobotPoint } from "../assets/pointing-robot.svg";
import { ReactComponent as RobotBook } from "../assets/book-robot.svg";
import { ReactComponent as RobotThink } from "../assets/thinking-robot.svg";
import { ReactComponent as RobotHappy } from "../assets/happy-robot.svg";
import { ReactComponent as RobotLetter } from "../assets/letter-robot.svg";
import { useState, useEffect } from "react";
import React from "react";

function FeedbackPanel({
  feedback,
  loading,
  messages,
  conversation,
  conversationList,
}) {
  console.log("feedback:" + feedback);
  const [mascot, setMascot] = useState(RobotHappy);

  useEffect(() => {
    if (conversation === conversationList.length + 1 && messages.length === 0) {
      setMascot(() => RobotBook);
    } else if (feedback[0].length === 0) {
      setMascot(RobotLetter);
    } else if (feedback[0].length !== 0) {
      setMascot(RobotPoint);
    } else {
      setMascot(() => RobotHappy);
    }
  }, [mascot, conversation, messages]);

  return (
    <div className="FeedbackPanel">
      <div className="feedbackBox">
        <h1 data-testid="feedBackH1" className="feedbackHeader">
          Feedback board
        </h1>
        <ul data-testid="testfeedBackUL" className="feedbackList">
          {feedback[0].length === 0 ? (
            <li data-testid="emptyLI" >{messages.length === 0 ? "" : "Keep up the good work!"}</li>
          ) : (
            feedback.map((str) => {
              return <li key={feedback.indexOf(str)}>{str}</li>;
            })
          )}
        </ul>
      </div>
      <div data-testid="robotTutor" className="tutor">
        {loading ? (
          <RobotThink className="tutorImg" />
        ) : (
          React.createElement(mascot, { className: "tutorImg" })
        )}
      </div>
    </div>
  );
}

export default FeedbackPanel;
